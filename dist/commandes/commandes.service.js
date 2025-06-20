"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../config/prisma.service");
const menu_service_1 = require("../menu/menu.service");
const client_1 = require("@prisma/client");
let CommandesService = class CommandesService {
    prisma;
    menuService;
    constructor(prisma, menuService) {
        this.prisma = prisma;
        this.menuService = menuService;
    }
    async create(createCommandeDto) {
        const menus = await Promise.all(createCommandeDto.items.map((item) => this.menuService.findOne(item.menuId)));
        const menusIndisponibles = menus.filter((menu) => !menu || !menu.disponible);
        if (menusIndisponibles.length > 0) {
            throw new common_1.BadRequestException('Certains plats ne sont pas disponibles');
        }
        let total = 0;
        const commandeItems = createCommandeDto.items.map((item, index) => {
            const menu = menus[index];
            if (!menu) {
                throw new common_1.BadRequestException('Menu introuvable');
            }
            const prix = menu.prix * item.quantite;
            total += prix;
            return {
                menuId: item.menuId,
                quantite: item.quantite,
                prix: prix,
            };
        });
        const numeroCommande = await this.generateNumeroCommande();
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
    async findOne(id) {
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
    async updateStatus(id, status) {
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
        await this.notifierChangementStatut(commande);
        return commande;
    }
    async generateNumeroCommande() {
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
    async transmettreAuxServices(commande) {
        console.log(`📨 Transmission de la commande ${commande.numeroCommande}:`);
        await this.transmettreAuServiceCuisine(commande);
        if (commande.adresse) {
            await this.preparerPourServiceLivraison(commande);
        }
    }
    async transmettreAuServiceCuisine(commande) {
        console.log(`🍳 → Service Cuisine: Nouvelle commande ${commande.numeroCommande}`);
        console.log(`   - Items: ${commande.items?.length || 0} plats`);
        console.log(`   - Total: ${commande.total}€`);
    }
    async preparerPourServiceLivraison(commande) {
        console.log(`🚚 → Service Livraison: Préparer livraison pour ${commande.numeroCommande}`);
        console.log(`   - Adresse: ${commande.adresse}`);
        console.log(`   - Téléphone: ${commande.telephone}`);
    }
    async notifierChangementStatut(commande) {
        console.log(`📢 Changement de statut: ${commande.numeroCommande} → ${commande.status}`);
        if (commande.status === client_1.StatusCommande.PRETE && commande.adresse) {
            console.log(`🚚 → Service Livraison: Commande prête pour livraison`);
        }
    }
};
exports.CommandesService = CommandesService;
exports.CommandesService = CommandesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        menu_service_1.MenuService])
], CommandesService);
//# sourceMappingURL=commandes.service.js.map