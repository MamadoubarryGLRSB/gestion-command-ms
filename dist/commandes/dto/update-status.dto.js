"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStatusDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class UpdateStatusDto {
    status;
}
exports.UpdateStatusDto = UpdateStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nouveau statut de la commande',
        enum: client_1.StatusCommande,
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
    }),
    (0, class_validator_1.IsEnum)(client_1.StatusCommande),
    __metadata("design:type", String)
], UpdateStatusDto.prototype, "status", void 0);
//# sourceMappingURL=update-status.dto.js.map