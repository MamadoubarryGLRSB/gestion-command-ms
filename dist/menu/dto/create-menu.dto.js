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
exports.CreateMenuDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class CreateMenuDto {
    nom;
    description;
    prix;
    categorie;
    disponible;
}
exports.CreateMenuDto = CreateMenuDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nom du plat',
        example: 'Pizza Margherita',
        minLength: 2,
        maxLength: 100,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMenuDto.prototype, "nom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Description détaillée du plat',
        example: 'Pizza traditionnelle avec tomate, mozzarella et basilic frais',
        required: false,
        maxLength: 500,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMenuDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Prix du plat en euros',
        example: 12.5,
        minimum: 0,
        type: 'number',
        format: 'float',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateMenuDto.prototype, "prix", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Catégorie du plat dans le menu',
        example: 'PLAT_PRINCIPAL',
        enum: client_1.CategorieMenu,
        enumName: 'CategorieMenu',
    }),
    (0, class_validator_1.IsEnum)(client_1.CategorieMenu),
    __metadata("design:type", String)
], CreateMenuDto.prototype, "categorie", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Disponibilité du plat (true = disponible, false = rupture de stock)',
        example: true,
        default: true,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateMenuDto.prototype, "disponible", void 0);
//# sourceMappingURL=create-menu.dto.js.map