import {
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsBoolean,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CategorieMenu } from '@prisma/client';

export class CreateMenuDto {
  @ApiProperty({
    description: 'Nom du plat',
    example: 'Pizza Margherita',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  nom: string;

  @ApiProperty({
    description: 'Description détaillée du plat',
    example: 'Pizza traditionnelle avec tomate, mozzarella et basilic frais',
    required: false,
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Prix du plat en euros',
    example: 12.5,
    minimum: 0,
    type: 'number',
    format: 'float',
  })
  @IsNumber()
  @Min(0)
  prix: number;

  @ApiProperty({
    description: 'Catégorie du plat dans le menu',
    example: 'PLAT_PRINCIPAL',
    enum: CategorieMenu,
    enumName: 'CategorieMenu',
  })
  @IsEnum(CategorieMenu)
  categorie: CategorieMenu;

  @ApiProperty({
    description:
      'Disponibilité du plat (true = disponible, false = rupture de stock)',
    example: true,
    default: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  disponible?: boolean;
}
