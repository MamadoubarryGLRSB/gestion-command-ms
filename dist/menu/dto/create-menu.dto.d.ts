import { CategorieMenu } from '@prisma/client';
export declare class CreateMenuDto {
    nom: string;
    description?: string;
    prix: number;
    categorie: CategorieMenu;
    disponible?: boolean;
}
