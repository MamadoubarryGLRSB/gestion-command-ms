import { PrismaService } from '../config/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu, CategorieMenu } from '@prisma/client';
export declare class MenuService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createMenuDto: CreateMenuDto): Promise<Menu>;
    findAll(): Promise<Menu[]>;
    findByCategorie(categorie: CategorieMenu): Promise<Menu[]>;
    findOne(id: string): Promise<Menu | null>;
    update(id: string, updateMenuDto: UpdateMenuDto): Promise<Menu>;
    remove(id: string): Promise<Menu>;
}
