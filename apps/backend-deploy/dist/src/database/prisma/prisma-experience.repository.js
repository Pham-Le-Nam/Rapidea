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
exports.PrismaExperienceRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PrismaExperienceRepository = class PrismaExperienceRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, name, position, role, startedAt, endedAt, location, achievement, logoId) {
        const highestOrder = await this.prisma.experience.findFirst({
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
        return this.prisma.experience.create({
            data: {
                userId,
                name,
                position,
                role,
                startedAt,
                endedAt,
                location,
                achievement,
                logoId,
                order
            }
        });
    }
    async updateById(userId, id, name, position, role, startedAt, endedAt, location, achievement, logoId) {
        return this.prisma.experience.update({
            where: {
                id,
                userId,
            },
            data: {
                name,
                position,
                role,
                startedAt,
                endedAt,
                location,
                achievement,
                logoId,
            }
        });
    }
    async deleteById(id, userId) {
        return this.prisma.experience.delete({
            where: {
                id,
                userId,
            },
        });
    }
    async swapOrderById(firstId, secondId) {
        const firstExperience = await this.prisma.experience.findUnique({
            where: {
                id: firstId,
            },
            select: {
                order: true,
            },
        });
        const secondExperience = await this.prisma.experience.findUnique({
            where: {
                id: secondId,
            },
            select: {
                order: true,
            },
        });
        if (!firstExperience || !secondExperience) {
            throw new common_1.InternalServerErrorException("Experience not found");
        }
        const firstUpdated = await this.prisma.experience.update({
            where: {
                id: firstId,
            },
            data: {
                order: secondExperience.order,
            },
        });
        const secondUpdated = await this.prisma.experience.update({
            where: {
                id: secondId,
            },
            data: {
                order: firstExperience.order,
            },
        });
        return [
            firstUpdated,
            secondUpdated,
        ];
    }
    async getByUserId(userId) {
        return this.prisma.experience.findMany({
            where: {
                userId,
            },
            orderBy: {
                order: "desc",
            },
        });
    }
};
exports.PrismaExperienceRepository = PrismaExperienceRepository;
exports.PrismaExperienceRepository = PrismaExperienceRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaExperienceRepository);
//# sourceMappingURL=prisma-experience.repository.js.map