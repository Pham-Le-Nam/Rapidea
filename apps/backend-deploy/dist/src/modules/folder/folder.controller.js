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
exports.FolderController = void 0;
const common_1 = require("@nestjs/common");
const folder_service_1 = require("./folder.service");
const optional_jwt_guard_1 = require("../auth/optional-jwt.guard");
const jwt_guard_1 = require("../auth/jwt.guard");
const add_folder_dto_1 = require("./folder-dto/add-folder.dto");
const rename_folder_dto_1 = require("./folder-dto/rename-folder.dto");
const move_folder_dto_1 = require("./folder-dto/move-folder.dto");
let FolderController = class FolderController {
    folderService;
    constructor(folderService) {
        this.folderService = folderService;
    }
    async getUserFolders(username, req) {
        const rootFolder = await this.folderService.findFolderByLocation(username);
        if (!rootFolder) {
            throw new common_1.NotFoundException('Root folder not found');
        }
        const freeFolder = await this.folderService.findFolderByLocation('free', rootFolder.id);
        if (!freeFolder) {
            throw new common_1.NotFoundException('Free folder not found');
        }
        return {
            rootFolder,
            freeFolder,
            isOwner: req.user ? req.user.userId === rootFolder.userId : false,
        };
    }
    async getFolderById(id, req) {
        const viewer = req.user;
        const folder = await this.folderService.findFolderById(id);
        if (!folder) {
            throw new common_1.NotFoundException('Folder not found');
        }
        const isOwner = viewer ? viewer.userId === folder.userId : false;
        const children = await this.folderService.findAllChildren(id);
        if (!children) {
            throw new common_1.NotFoundException('Children not found');
        }
        const childrenFolders = children.childrenFolders;
        const childrenFiles = children.childrenFiles;
        return {
            folder,
            isOwner,
            childrenFolders,
            childrenFiles,
        };
    }
    async addFolder(req, addFolderdto) {
        const user = req.user;
        const folder = await this.folderService.createFolder(user.userId, addFolderdto.folderName, addFolderdto.parentId);
        if (!folder) {
            throw new common_1.InternalServerErrorException("Couldn't create folder");
        }
        return folder;
    }
    async renameFolder(req, renameFolderDto) {
        const user = req.user;
        const folder = await this.folderService.renameFolder(renameFolderDto.folderId, user.userId, renameFolderDto.name);
        if (!folder) {
            throw new common_1.InternalServerErrorException("Couldn't rename the folder");
        }
        return folder;
    }
    async moveFolder(req, moveFolderDto) {
        const user = req.user;
        const folder = await this.folderService.moveFolder(moveFolderDto.folderId, user.userId, moveFolderDto.parentId);
        if (!folder) {
            throw new common_1.InternalServerErrorException("Couldn't move the folder");
        }
        return folder;
    }
    async deleteFolder(req, data) {
        const user = req.user;
        const folder = await this.folderService.deleteFolder(data.folderId, user.userId);
        if (!folder) {
            throw new common_1.InternalServerErrorException("", "Couldn't delete the folder");
        }
        return folder;
    }
};
exports.FolderController = FolderController;
__decorate([
    (0, common_1.UseGuards)(optional_jwt_guard_1.OptionalJwtAuthGuard),
    (0, common_1.Get)('user/:username'),
    __param(0, (0, common_1.Param)('username')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FolderController.prototype, "getUserFolders", null);
__decorate([
    (0, common_1.UseGuards)(optional_jwt_guard_1.OptionalJwtAuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FolderController.prototype, "getFolderById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_folder_dto_1.AddFolderDto]),
    __metadata("design:returntype", Promise)
], FolderController.prototype, "addFolder", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('rename'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, rename_folder_dto_1.RenameFolderDto]),
    __metadata("design:returntype", Promise)
], FolderController.prototype, "renameFolder", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('move'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, move_folder_dto_1.MoveFolderDto]),
    __metadata("design:returntype", Promise)
], FolderController.prototype, "moveFolder", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FolderController.prototype, "deleteFolder", null);
exports.FolderController = FolderController = __decorate([
    (0, common_1.Controller)('api/folder'),
    __metadata("design:paramtypes", [folder_service_1.FolderService])
], FolderController);
//# sourceMappingURL=folder.controller.js.map