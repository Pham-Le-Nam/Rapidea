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
exports.FolderService = void 0;
const common_1 = require("@nestjs/common");
const storage_constants_1 = require("../storage/storage.constants");
let FolderService = class FolderService {
    folderRepo;
    storage;
    constructor(folderRepo, storage) {
        this.folderRepo = folderRepo;
        this.storage = storage;
    }
    async createFolder(userId, folderName, parentId) {
        const folder = await this.folderRepo.create(userId, folderName, parentId);
        if (!folder) {
            throw new common_1.InternalServerErrorException("Couldn't create folder");
        }
        const url = await this.folderRepo.getUrl(folder.id);
        await this.storage.ensureDirectory(url);
        return folder;
    }
    async deleteFolder(folderId, userId) {
        const url = await this.folderRepo.getUrl(folderId);
        const folder = await this.folderRepo.delete(folderId, userId);
        if (!folder) {
            throw new common_1.InternalServerErrorException("Couldn't delete folder");
        }
        await this.storage.deleteDirectory(url);
        return folder;
    }
    async renameFolder(folderId, userId, name) {
        const oldUrl = await this.folderRepo.getUrl(folderId);
        const folder = await this.folderRepo.rename(folderId, userId, name);
        const newUrl = await this.folderRepo.getUrl(folder.id);
        if (!newUrl || !oldUrl) {
            throw new common_1.InternalServerErrorException("Couldn't rename the folder");
        }
        await this.storage.moveDirectory(oldUrl, newUrl);
        return folder;
    }
    async moveFolder(folderId, userId, parentId) {
        const oldUrl = await this.folderRepo.getUrl(folderId);
        const folder = await this.folderRepo.move(folderId, userId, parentId);
        const newUrl = await this.folderRepo.getUrl(folder.id);
        if (!newUrl || !oldUrl) {
            throw new common_1.InternalServerErrorException("Couldn't move the folder");
        }
        await this.storage.moveDirectory(oldUrl, newUrl);
        return folder;
    }
    async findFolderById(folderId) {
        return this.folderRepo.findById(folderId);
    }
    async findFolderByLocation(folderName, parentId) {
        return this.folderRepo.findByLocation(folderName, parentId);
    }
    async findChildrenFolders(folderId) {
        return this.folderRepo.findChildrenFolders(folderId);
    }
    async findChildrenFiles(folderId) {
        return this.folderRepo.findChildrenFiles(folderId);
    }
    async findAllChildren(folderId) {
        return this.folderRepo.findAllChildren(folderId);
    }
    async getFolderUrl(folderId) {
        return this.folderRepo.getUrl(folderId);
    }
};
exports.FolderService = FolderService;
exports.FolderService = FolderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('FOLDER_REPOSITORY')),
    __param(1, (0, common_1.Inject)(storage_constants_1.STORAGE_SERVICE)),
    __metadata("design:paramtypes", [Object, Object])
], FolderService);
//# sourceMappingURL=folder.service.js.map