import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';
import { MenuService } from '../menu/menu.service';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { StatusCommande } from '@prisma/client';

@Injectable()
export class CommandesService {
  constructor(
    private prisma: PrismaService,
    private menuService: MenuService,
  ) {}

  async create(createCommandeDto: CreateCommandeDto) {
    // 1. Vérifier que tous les menus existent et sont disponibles
    const menus = await Promise.all(
      createCommandeDto.items.map((item) =>
        this.menuService.findOne(item.menuId),
      ),
    );

    const menusIndisponibles = menus.filter(
      (menu) => !menu || !menu.disponible,
    );

    if (menusIndisponibles.length > 0) {
      throw new BadRequestException('Certains plats ne sont pas disponibles');
    }

    // 2. Calculer le total
    let total = 0;
    const commandeItems = createCommandeDto.items.map((item, index) => {
      const menu = menus[index];
      if (!menu) {
        throw new BadRequestException('Menu introuvable');
      }
      const prix = menu.prix * item.quantite;
      total += prix;

      return {
        menuId: item.menuId,
        quantite: item.quantite,
        prix: prix,
      };
    });

    // 3. Générer un numéro de commande unique
    const numeroCommande = await this.generateNumeroCommande();

    // 4. Créer la commande avec ses items
    const commande = await this.prisma.commande.create({
      data: {
        numeroCommande,
        clientId: createCommandeDto.clientId,
        total,
        adresse: createCommandeDto.adresse,
        telephone: createCommandeDto.telephone,
        commentaires: createCommandeDto.commentaires,
        items: {
          create: commandeItems,
        },
      },
      include: {
        items: {
          include: {
            menu: true,
          },
        },
      },
    });

    // 5. Transmettre aux services appropriés
    await this.transmettreAuxServices(commande);

    return commande;
  }

  async findAll() {
    return this.prisma.commande.findMany({
      include: {
        items: {
          include: {
            menu: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.commande.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            menu: true,
          },
        },
      },
    });
  }

  async updateStatus(id: string, status: StatusCommande) {
    const commande = await this.prisma.commande.update({
      where: { id },
      data: { status },
      include: {
        items: {
          include: {
            menu: true,
          },
        },
      },
    });

    // Notifier les changements de statut aux autres services
    await this.notifierChangementStatut(commande);

    return commande;
  }

  private async generateNumeroCommande(): Promise<string> {
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const count = await this.prisma.commande.count({
      where: {
        numeroCommande: {
          startsWith: `CMD-${today}`,
        },
      },
    });

    return `CMD-${today}-${String(count + 1).padStart(3, '0')}`;
  }

  // TRANSMISSION AUX SERVICES APPROPRIÉS
  private async transmettreAuxServices(commande: any): Promise<void> {
    console.log(`📨 Transmission de la commande ${commande.numeroCommande}:`);

    // Transmettre au service cuisine
    await this.transmettreAuServiceCuisine(commande);

    // Si adresse fournie, préparer pour le service de livraison
    if (commande.adresse) {
      await this.preparerPourServiceLivraison(commande);
    }
  }

  private async transmettreAuServiceCuisine(commande: any): Promise<void> {
    // Simulation de l'envoi au service cuisine
    console.log(
      `🍳 → Service Cuisine: Nouvelle commande ${commande.numeroCommande}`,
    );
    console.log(`   - Items: ${commande.items?.length || 0} plats`);
    console.log(`   - Total: ${commande.total}€`);

    // TODO: Implémenter l'appel réel au service cuisine
    // await this.httpService.post('http://service-cuisine:3002/commandes', commande)
  }

  private async preparerPourServiceLivraison(commande: any): Promise<void> {
    // Simulation de la préparation pour le service livraison
    console.log(
      `🚚 → Service Livraison: Préparer livraison pour ${commande.numeroCommande}`,
    );
    console.log(`   - Adresse: ${commande.adresse}`);
    console.log(`   - Téléphone: ${commande.telephone}`);

    // TODO: Implémenter l'appel réel au service livraison
    // await this.httpService.post('http://service-livraison:3003/livraisons', commande)
  }

  private async notifierChangementStatut(commande: any): Promise<void> {
    console.log(
      `📢 Changement de statut: ${commande.numeroCommande} → ${commande.status}`,
    );

    // Notifier le client du changement de statut
    // TODO: Implémenter notification client (email, SMS, websocket)

    // Notifier les autres services si nécessaire
    if (commande.status === StatusCommande.PRETE && commande.adresse) {
      console.log(`🚚 → Service Livraison: Commande prête pour livraison`);
      // TODO: Notifier le service livraison
    }
  }
}
