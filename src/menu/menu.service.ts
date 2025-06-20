import { Injectable } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu, CategorieMenu } from '@prisma/client';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async create(createMenuDto: CreateMenuDto): Promise<Menu> {
    return this.prisma.menu.create({
      data: createMenuDto,
    });
  }

  async findAll(): Promise<Menu[]> {
    return this.prisma.menu.findMany({
      where: { disponible: true },
      orderBy: { categorie: 'asc' },
    });
  }

  async findByCategorie(categorie: CategorieMenu): Promise<Menu[]> {
    return this.prisma.menu.findMany({
      where: {
        categorie,
        disponible: true,
      },
    });
  }

  async findOne(id: string): Promise<Menu | null> {
    return this.prisma.menu.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateMenuDto: UpdateMenuDto): Promise<Menu> {
    return this.prisma.menu.update({
      where: { id },
      data: updateMenuDto,
    });
  }

  async remove(id: string): Promise<Menu> {
    return this.prisma.menu.update({
      where: { id },
      data: { disponible: false },
    });
  }
}
