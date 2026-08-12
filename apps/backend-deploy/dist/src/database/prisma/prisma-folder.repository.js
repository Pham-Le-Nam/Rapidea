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
exports.PrismaFolderRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PrismaFolderRepository = class PrismaFolderRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, name, parentId) {
        const user = await this.prisma.users.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user) {
            throw new common_1.InternalServerErrorException("User not found");
        }
        return this.prisma.folder.create({
            data: {
                userId,
                parentId,
                name,
            },
        });
    }
    async delete(id, userId) {
        return this.prisma.folder.delete({
            where: {
                id,
                userId,
            },
        });
    }
    async rename(id, userId, name) {
        const folder = this.prisma.folder.update({
            where: {
                id,
                userId,
            },
            data: {
                name,
            },
        });
        if (!folder) {
            throw new common_1.InternalServerErrorException("Couldn't update the folder");
        }
        return folder;
    }
    async move(id, userId, parentId) {
        const folder = this.prisma.folder.update({
            where: {
                id,
            },
            data: {
                parentId,
            },
        });
        if (!folder) {
            throw new common_1.InternalServerErrorException("Couldn't update the folder");
        }
        return folder;
    }
    async getUrl(id) {
        const folder = await this.prisma.folder.findUnique({
            where: {
                id,
            },
        });
        if (!folder) {
            throw new common_1.NotFoundException("Folder not found");
        }
        if (folder.parentId) {
            const parentUrl = await this.getUrl(folder.parentId);
            const url = `${parentUrl}/${folder.name}`;
            return url;
        }
        else {
            return folder.name;
        }
    }
    async findById(id) {
        return this.prisma.folder.findUnique({
            where: {
                id,
            },
        });
    }
    async findByLocation(name, parentId) {
        const normalizedParentId = parentId?.trim() || null;
        return this.prisma.folder.findFirst({
            where: {
                name,
                parentId: normalizedParentId,
            },
        });
    }
    async findChildrenFolders(id) {
        const folder = await this.prisma.folder.findUnique({
            where: {
                id,
            },
            include: {
                childrenFolders: true,
            },
        });
        if (!folder) {
            throw new common_1.InternalServerErrorException("Folder not found");
        }
        return {
            childrenFolders: folder.childrenFolders,
        };
    }
    async findChildrenFiles(id) {
        const folder = await this.prisma.folder.findUnique({
            where: {
                id,
            },
            include: {
                files: true,
            },
        });
        if (!folder) {
            throw new common_1.InternalServerErrorException("Folder not found");
        }
        return {
            childrenFiles: folder.files,
        };
    }
    async findAllChildren(id) {
        const folder = await this.prisma.folder.findUnique({
            where: {
                id,
            },
            include: {
                childrenFolders: true,
                files: true,
            },
        });
        if (!folder) {
            throw new common_1.InternalServerErrorException("Folder not found");
        }
        return {
            childrenFolders: folder.childrenFolders,
            childrenFiles: folder.files,
        };
    }
};
exports.PrismaFolderRepository = PrismaFolderRepository;
exports.PrismaFolderRepository = PrismaFolderRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaFolderRepository);
//# sourceMappingURL=prisma-folder.repository.js.map