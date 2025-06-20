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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const commandes_service_1 = require("./commandes.service");
const create_commande_dto_1 = require("./dto/create-commande.dto");
const update_status_dto_1 = require("./dto/update-status.dto");
let CommandesController = class CommandesController {
    commandesService;
    constructor(commandesService) {
        this.commandesService = commandesService;
    }
    create(createCommandeDto) {
        return this.commandesService.create(createCommandeDto);
    }
    findAll() {
        return this.commandesService.findAll();
    }
    findOne(id) {
        return this.commandesService.findOne(id);
    }
    updateStatus(id, updateStatusDto) {
        return this.commandesService.updateStatus(id, updateStatusDto.status);
    }
};
exports.CommandesController = CommandesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Créer une nouvelle commande' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Commande créée avec succès et transmise aux services appropriés',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Données invalides ou plats indisponibles',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_commande_dto_1.CreateCommandeDto]),
    __metadata("design:returntype", void 0)
], CommandesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer toutes les commandes' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Liste des commandes avec leurs détails',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CommandesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer une commande par ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Commande trouvée' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Commande non trouvée' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CommandesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, swagger_1.ApiOperation)({
        summary: "Mettre à jour le statut d'une commande",
        description: 'Change le statut de la commande et notifie les services appropriés',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Statut mis à jour avec succès',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Commande non trouvée',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_status_dto_1.UpdateStatusDto]),
    __metadata("design:returntype", void 0)
], CommandesController.prototype, "updateStatus", null);
exports.CommandesController = CommandesController = __decorate([
    (0, swagger_1.ApiTags)('Commandes'),
    (0, common_1.Controller)('commandes'),
    __metadata("design:paramtypes", [commandes_service_1.CommandesService])
], CommandesController);
//# sourceMappingURL=commandes.controller.js.map