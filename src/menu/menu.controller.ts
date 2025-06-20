import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { CategorieMenu } from '@prisma/client';

@ApiTags('Menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau plat' })
  @ApiResponse({ status: 201, description: 'Plat créé avec succès' })
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les plats disponibles' })
  @ApiResponse({ status: 200, description: 'Liste des plats' })
  @ApiQuery({
    name: 'categorie',
    required: false,
    enum: CategorieMenu,
    description: 'Filtrer par catégorie (optionnel)',
  })
  findAll(@Query('categorie') categorie?: CategorieMenu) {
    if (categorie) {
      return this.menuService.findByCategorie(categorie);
    }
    return this.menuService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un plat par ID' })
  @ApiResponse({ status: 200, description: 'Plat trouvé' })
  @ApiResponse({ status: 404, description: 'Plat non trouvé' })
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un plat' })
  @ApiResponse({ status: 200, description: 'Plat mis à jour' })
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(id, updateMenuDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un plat (marquer comme indisponible)' })
  @ApiResponse({ status: 200, description: 'Plat supprimé' })
  remove(@Param('id') id: string) {
    return this.menuService.remove(id);
  }
}
