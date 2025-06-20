import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StatusCommande } from '@prisma/client';

export class UpdateStatusDto {
  @ApiProperty({
    description: 'Nouveau statut de la commande',
    enum: StatusCommande,
    enumName: 'StatusCommande',
    example: 'CONFIRMEE',
    examples: {
      'En attente': {
        value: 'EN_ATTENTE',
        description: 'Commande créée, en attente de confirmation',
      },
      Confirmée: {
        value: 'CONFIRMEE',
        description: 'Commande confirmée par le restaurant',
      },
      'En préparation': {
        value: 'EN_PREPARATION',
        description: 'Commande en cours de préparation en cuisine',
      },
      Prête: {
        value: 'PRETE',
        description: 'Commande prête, en attente de livraison',
      },
      Livrée: {
        value: 'LIVREE',
        description: 'Commande livrée au client',
      },
      Annulée: {
        value: 'ANNULEE',
        description: 'Commande annulée',
      },
    },
  })
  @IsEnum(StatusCommande)
  status: StatusCommande;
}
