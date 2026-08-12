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
exports.PrismaProjectRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PrismaProjectRepository = class PrismaProjectRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, name, role, startedAt, endedAt, details, logoId) {
        const highestOrder = await this.prisma.project.findFirst({
            where: {
                userId,
            },
            orderBy: {
                order: 'desc',
            },
            select: {
                order: true,
            },
        });
        let order = 1;
        if (highestOrder) {
            order = highestOrder.order + 1;
        }
        return this.prisma.project.create({
            data: {
                userId,
                name,
                role,
                startedAt,
                endedAt,
                details,
                logoId,
                order
            }
        });
    }
    async updateById(id, userId, name, role, startedAt, endedAt, details, logoId) {
        return this.prisma.project.update({
            where: {
                id,
                userId,
            },
            data: {
                name,
                role,
                startedAt,
                endedAt,
                details,
                logoId,
            }
        });
    }
    async deleteById(id, userId) {
        return this.prisma.project.delete({
            where: {
                id,
                userId,
            },
        });
    }
    async swapOrderById(firstId, secondId) {
        const firstProject = await this.prisma.project.findUnique({
            where: {
                id: firstId,
            },
            select: {
                order: true,
            },
        });
        const secondProject = await this.prisma.project.findUnique({
            where: {
                id: secondId,
            },
            select: {
                order: true,
            },
        });
        if (!firstProject || !secondProject) {
            throw new common_1.InternalServerErrorException("project not found");
        }
        const firstUpdated = await this.prisma.project.update({
            where: {
                id: firstId,
            },
            data: {
                order: secondProject.order,
            },
        });
        const secondUpdated = await this.prisma.project.update({
            where: {
                id: secondId,
            },
            data: {
                order: firstProject.order,
            },
        });
        return [
            firstUpdated,
            secondUpdated,
        ];
    }
    async getByUserId(userId) {
        return this.prisma.project.findMany({
            where: {
                userId,
            },
            orderBy: {
                order: "desc",
            },
        });
    }
    async checkOwner(id, userId) {
        const project = await this.prisma.project.findUnique({
            where: {
                id,
            },
            select: {
                userId: true,
            },
        });
        if (!project) {
            throw new common_1.NotFoundException("Project not found");
        }
        const isOwner = project.userId === userId;
        return isOwner;
    }
};
exports.PrismaProjectRepository = PrismaProjectRepository;
exports.PrismaProjectRepository = PrismaProjectRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaProjectRepository);
//# sourceMappingURL=prisma-project.repository.js.map