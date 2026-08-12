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
exports.PrismaProjectContributorRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PrismaProjectContributorRepository = class PrismaProjectContributorRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(projectId, userId, role) {
        const project = await this.prisma.project.findUnique({
            where: {
                id: projectId,
            },
        });
        const user = await this.prisma.users.findUnique({
            where: {
                id: userId,
            },
        });
        if (!project) {
            throw new common_1.InternalServerErrorException("Project not found");
        }
        if (!user) {
            throw new common_1.InternalServerErrorException("User not found");
        }
        return this.prisma.projectContributor.create({
            data: {
                projectId,
                userId,
                role,
            },
        });
    }
    async updateRole(projectId, userId, role) {
        return this.prisma.projectContributor.update({
            where: {
                projectId_userId: {
                    projectId,
                    userId,
                }
            },
            data: {
                role,
            },
        });
    }
    async deleteOne(projectId, userId) {
        return this.prisma.projectContributor.delete({
            where: {
                projectId_userId: {
                    projectId,
                    userId,
                },
            },
        });
    }
    async deleteNotIn(projectId, userIds) {
        await this.prisma.projectContributor.deleteMany({
            where: {
                projectId,
                userId: { notIn: userIds },
            },
        });
        return true;
    }
    async findContributors(projectId) {
        const contributors = await this.prisma.projectContributor.findMany({
            where: {
                projectId,
            },
            select: {
                userId: true,
            },
        });
        const ids = contributors.map(contributor => contributor.userId);
        return this.prisma.users.findMany({
            where: {
                id: { in: ids },
            },
        });
    }
    async findContributor(projectId, userId) {
        return this.prisma.projectContributor.findUnique({
            where: {
                projectId_userId: {
                    projectId,
                    userId,
                },
            },
        });
    }
};
exports.PrismaProjectContributorRepository = PrismaProjectContributorRepository;
exports.PrismaProjectContributorRepository = PrismaProjectContributorRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaProjectContributorRepository);
//# sourceMappingURL=prisma-project-contributor.repository.js.map