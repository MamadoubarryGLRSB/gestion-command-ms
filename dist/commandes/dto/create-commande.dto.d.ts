export declare class CommandeItemDto {
    menuId: string;
    quantite: number;
}
export declare class CreateCommandeDto {
    clientId: string;
    items: CommandeItemDto[];
    adresse?: string;
    telephone?: string;
    commentaires?: string;
}
