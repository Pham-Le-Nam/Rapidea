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
exports.PrismaPhotoRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PrismaPhotoRepository = class PrismaPhotoRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, extension, url) {
        const user = await this.prisma.users.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user) {
            throw new common_1.InternalServerErrorException("User not found");
        }
        const tempName = "tempName";
        const photo = await this.prisma.photo.create({
            data: {
                userId,
                url: url ?? '',
                name: tempName,
            },
            select: {
                id: true,
            },
        });
        const name = `${photo.id}.${extension}`;
        return this.prisma.photo.update({
            where: {
                id: photo.id,
            },
            data: {
                name,
                url: url ?? `media/${name}`,
            },
        });
    }
    async delete(id) {
        return this.prisma.photo.delete({
            where: {
                id,
            },
        });
    }
    async findById(id) {
        return this.prisma.photo.findUnique({
            where: {
                id,
            },
        });
    }
};
exports.PrismaPhotoRepository = PrismaPhotoRepository;
exports.PrismaPhotoRepository = PrismaPhotoRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaPhotoRepository);
//# sourceMappingURL=prisma-photo.repository.js.map