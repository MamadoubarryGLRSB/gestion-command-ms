import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { CategorieMenu } from '@prisma/client';
export declare class MenuController {
    private readonly menuService;
    constructor(menuService: MenuService);
    create(createMenuDto: CreateMenuDto): Promise<{
        description: string | null;
        nom: string;
        prix: number;
        categorie: import(".prisma/client").$Enums.CategorieMenu;
        disponible: boolean;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(categorie?: CategorieMenu): Promise<{
        description: string | null;
        nom: string;
        prix: number;
        categorie: import(".prisma/client").$Enums.CategorieMenu;
        disponible: boolean;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        description: string | null;
        nom: string;
        prix: number;
        categorie: import(".prisma/client").$Enums.CategorieMenu;
        disponible: boolean;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    update(id: string, updateMenuDto: UpdateMenuDto): Promise<{
        description: string | null;
        nom: string;
        prix: number;
        categorie: import(".prisma/client").$Enums.CategorieMenu;
        disponible: boolean;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        description: string | null;
        nom: string;
        prix: number;
        categorie: import(".prisma/client").$Enums.CategorieMenu;
        disponible: boolean;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
