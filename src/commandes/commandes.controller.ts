import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommandesService } from './commandes.service';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@ApiTags('Commandes')
@Controller('commandes')
export class CommandesController {
  constructor(private readonly commandesService: CommandesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Créer une nouvelle commande' })
  @ApiResponse({
    status: 201,
    description:
      'Commande créée avec succès et transmise aux services appropriés',
  })
  @ApiResponse({
    status: 400,
    description: 'Données invalides ou plats indisponibles',
  })
  create(@Body() createCommandeDto: CreateCommandeDto) {
    return this.commandesService.create(createCommandeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les commandes' })
  @ApiResponse({
    status: 200,
    description: 'Liste des commandes avec leurs détails',
  })
  findAll() {
    return this.commandesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une commande par ID' })
  @ApiResponse({ status: 200, description: 'Commande trouvée' })
  @ApiResponse({ status: 404, description: 'Commande non trouvée' })
  findOne(@Param('id') id: string) {
    return this.commandesService.findOne(id);
  }

  @Patch(':id/status')
  @ApiOperation({
    summary: "Mettre à jour le statut d'une commande",
    description:
      'Change le statut de la commande et notifie les services appropriés',
  })
  @ApiResponse({
    status: 200,
    description: 'Statut mis à jour avec succès',
  })
  @ApiResponse({
    status: 404,
    description: 'Commande non trouvée',
  })
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return this.commandesService.updateStatus(id, updateStatusDto.status);
  }
}
