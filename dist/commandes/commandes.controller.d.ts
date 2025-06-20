import { CommandesService } from './commandes.service';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
export declare class CommandesController {
    private readonly commandesService;
    constructor(commandesService: CommandesService);
    create(createCommandeDto: CreateCommandeDto): Promise<{
        items: ({
            menu: {
                description: string | null;
                nom: string;
                prix: number;
                categorie: import(".prisma/client").$Enums.CategorieMenu;
                disponible: boolean;
                id: string;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            prix: number;
            id: string;
            createdAt: Date;
            menuId: string;
            quantite: number;
            commandeId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        clientId: string;
        adresse: string | null;
        telephone: string | null;
        commentaires: string | null;
        numeroCommande: string;
        status: import(".prisma/client").$Enums.StatusCommande;
        total: number;
    }>;
    findAll(): Promise<({
        items: ({
            menu: {
                description: string | null;
                nom: string;
                prix: number;
                categorie: import(".prisma/client").$Enums.CategorieMenu;
                disponible: boolean;
                id: string;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            prix: number;
            id: string;
            createdAt: Date;
            menuId: string;
            quantite: number;
            commandeId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        clientId: string;
        adresse: string | null;
        telephone: string | null;
        commentaires: string | null;
        numeroCommande: string;
        status: import(".prisma/client").$Enums.StatusCommande;
        total: number;
    })[]>;
    findOne(id: string): Promise<({
        items: ({
            menu: {
                description: string | null;
                nom: string;
                prix: number;
                categorie: import(".prisma/client").$Enums.CategorieMenu;
                disponible: boolean;
                id: string;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            prix: number;
            id: string;
            createdAt: Date;
            menuId: string;
            quantite: number;
            commandeId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        clientId: string;
        adresse: string | null;
        telephone: string | null;
        commentaires: string | null;
        numeroCommande: string;
        status: import(".prisma/client").$Enums.StatusCommande;
        total: number;
    }) | null>;
    updateStatus(id: string, updateStatusDto: UpdateStatusDto): Promise<{
        items: ({
            menu: {
                description: string | null;
                nom: string;
                prix: number;
                categorie: import(".prisma/client").$Enums.CategorieMenu;
                disponible: boolean;
                id: string;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            prix: number;
            id: string;
            createdAt: Date;
            menuId: string;
            quantite: number;
            commandeId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        clientId: string;
        adresse: string | null;
        telephone: string | null;
        commentaires: string | null;
        numeroCommande: string;
        status: import(".prisma/client").$Enums.StatusCommande;
        total: number;
    }>;
}
