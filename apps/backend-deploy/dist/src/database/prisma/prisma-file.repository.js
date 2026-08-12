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
exports.PrismaFileRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PrismaFileRepository = class PrismaFileRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    updateModeration(id, moderation) {
        return this.prisma.file.update({
            where: { id },
            data: {
                moderationStatus: moderation.status,
                moderationScore: moderation.score,
                moderationCategories: moderation.categories,
                moderationMessage: moderation.message,
            },
        });
    }
    async findCourseIdByFolderId(folderId) {
        let currentFolderId = folderId;
        while (currentFolderId) {
            const course = await this.prisma.course.findUnique({
                where: {
                    folderId: currentFolderId,
                },
                select: {
                    id: true,
                },
            });
            if (course) {
                return course.id;
            }
            const folder = await this.prisma.folder.findUnique({
                where: {
                    id: currentFolderId,
                },
                select: {
                    parentId: true,
                },
            });
            currentFolderId = folder?.parentId ?? null;
        }
        return null;
    }
    async create(folderId, name, mimeType, size, userId) {
        const folder = await this.prisma.folder.findUnique({
            where: {
                id: folderId,
            },
            select: {
                name: true,
            },
        });
        if (!folder) {
            throw new common_1.InternalServerErrorException("Folder not found");
        }
        const courseId = await this.findCourseIdByFolderId(folderId);
        return this.prisma.$transaction(async (tx) => {
            const file = await tx.file.create({
                data: {
                    name,
                    mimeType,
                    size,
                    userId,
                    folderId,
                },
                include: {
                    transcript: true,
                    tags: {
                        include: {
                            tag: true,
                        },
                    },
                },
            });
            if (courseId) {
                await tx.course.update({
                    where: {
                        id: courseId,
                    },
                    data: {
                        lastUpdated: new Date(),
                    },
                });
            }
            return file;
        });
    }
    async updateById(id, userId, folderId, name) {
        const existingFile = await this.prisma.file.findUnique({
            where: {
                id,
                userId,
            },
            select: {
                folderId: true,
            },
        });
        if (!existingFile) {
            throw new common_1.InternalServerErrorException("File not found");
        }
        const targetFolderId = folderId ?? existingFile.folderId;
        const oldCourseId = await this.findCourseIdByFolderId(existingFile.folderId);
        const newCourseId = await this.findCourseIdByFolderId(targetFolderId);
        const courseIds = Array.from(new Set([oldCourseId, newCourseId].filter(Boolean)));
        return this.prisma.$transaction(async (tx) => {
            const file = await tx.file.update({
                where: {
                    id,
                    userId,
                },
                data: {
                    folderId,
                    name,
                },
            });
            await Promise.all(courseIds.map((courseId) => tx.course.update({
                where: {
                    id: courseId,
                },
                data: {
                    lastUpdated: new Date(),
                },
            })));
            return file;
        });
    }
    async findById(id) {
        return this.prisma.file.findUnique({
            where: {
                id,
            },
            include: {
                transcript: true,
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });
    }
    async findByFolderId(folderId) {
        return this.prisma.file.findMany({
            where: {
                folderId,
            },
            include: {
                transcript: true,
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });
    }
    async deleteById(id, userId) {
        return this.prisma.file.delete({
            where: {
                id,
                userId,
            },
        });
    }
};
exports.PrismaFileRepository = PrismaFileRepository;
exports.PrismaFileRepository = PrismaFileRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaFileRepository);
//# sourceMappingURL=prisma-file.repository.js.map