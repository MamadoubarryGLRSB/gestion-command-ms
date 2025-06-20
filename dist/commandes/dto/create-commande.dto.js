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
exports.CreateCommandeDto = exports.CommandeItemDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class CommandeItemDto {
    menuId;
    quantite;
}
exports.CommandeItemDto = CommandeItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Identifiant unique du plat du menu',
        example: 'cmc4wlgul00003p97h5ix02go',
        format: 'cuid',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CommandeItemDto.prototype, "menuId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Quantité souhaitée pour ce plat',
        example: 2,
        minimum: 1,
        type: 'integer',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CommandeItemDto.prototype, "quantite", void 0);
class CreateCommandeDto {
    clientId;
    items;
    adresse;
    telephone;
    commentaires;
}
exports.CreateCommandeDto = CreateCommandeDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Identifiant unique du client qui passe la commande',
        example: 'client-123',
        format: 'string',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCommandeDto.prototype, "clientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Liste des articles commandés avec leurs quantités',
        type: [CommandeItemDto],
        example: [
            { menuId: 'cmc4wlgul00003p97h5ix02go', quantite: 2 },
            { menuId: 'cmc4wm4c300013p97ufiaobyj', quantite: 1 },
        ],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CommandeItemDto),
    __metadata("design:type", Array)
], CreateCommandeDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Adresse complète de livraison (optionnel pour commande sur place)',
        example: '123 Rue de la Paix, 75001 Paris',
        required: false,
        maxLength: 200,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCommandeDto.prototype, "adresse", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Numéro de téléphone de contact',
        example: '0123456789',
        required: false,
        pattern: '^[0-9]{10}$',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCommandeDto.prototype, "telephone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Commentaires ou instructions spéciales pour la commande',
        example: 'Livraison rapide SVP, sans oignons sur la pizza',
        required: false,
        maxLength: 300,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCommandeDto.prototype, "commentaires", void 0);
//# sourceMappingURL=create-commande.dto.js.map