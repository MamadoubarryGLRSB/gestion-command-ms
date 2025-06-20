import {
  IsString,
  IsArray,
  IsOptional,
  ValidateNested,
  IsNumber,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CommandeItemDto {
  @ApiProperty({
    description: 'Identifiant unique du plat du menu',
    example: 'cmc4wlgul00003p97h5ix02go',
    format: 'cuid',
  })
  @IsString()
  menuId: string;

  @ApiProperty({
    description: 'Quantité souhaitée pour ce plat',
    example: 2,
    minimum: 1,
    type: 'integer',
  })
  @IsNumber()
  @Min(1)
  quantite: number;
}

export class CreateCommandeDto {
  @ApiProperty({
    description: 'Identifiant unique du client qui passe la commande',
    example: 'client-123',
    format: 'string',
  })
  @IsString()
  clientId: string;

  @ApiProperty({
    description: 'Liste des articles commandés avec leurs quantités',
    type: [CommandeItemDto],
    example: [
      { menuId: 'cmc4wlgul00003p97h5ix02go', quantite: 2 },
      { menuId: 'cmc4wm4c300013p97ufiaobyj', quantite: 1 },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CommandeItemDto)
  items: CommandeItemDto[];

  @ApiProperty({
    description:
      'Adresse complète de livraison (optionnel pour commande sur place)',
    example: '123 Rue de la Paix, 75001 Paris',
    required: false,
    maxLength: 200,
  })
  @IsOptional()
  @IsString()
  adresse?: string;

  @ApiProperty({
    description: 'Numéro de téléphone de contact',
    example: '0123456789',
    required: false,
    pattern: '^[0-9]{10}$',
  })
  @IsOptional()
  @IsString()
  telephone?: string;

  @ApiProperty({
    description: 'Commentaires ou instructions spéciales pour la commande',
    example: 'Livraison rapide SVP, sans oignons sur la pizza',
    required: false,
    maxLength: 300,
  })
  @IsOptional()
  @IsString()
  commentaires?: string;
}
