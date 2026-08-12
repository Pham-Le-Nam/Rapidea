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
exports.PrismaEducationRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PrismaEducationRepository = class PrismaEducationRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, name, major, degree, startedAt, endedAt, location, achievement, logoId) {
        const highestOrder = await this.prisma.education.findFirst({
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
        return this.prisma.education.create({
            data: {
                userId,
                name,
                major,
                degree,
                startedAt,
                endedAt,
                location,
                achievement,
                logoId,
                order
            }
        });
    }
    async updateById(userId, id, name, major, degree, startedAt, endedAt, location, achievement, logoId) {
        return this.prisma.education.update({
            where: {
                id,
                userId,
            },
            data: {
                name,
                major,
                degree,
                startedAt,
                endedAt,
                location,
                achievement,
                logoId
            }
        });
    }
    async deleteById(id, userId) {
        return this.prisma.education.deleteMany({
            where: {
                id: id,
                userId: userId,
            },
        });
    }
    async swapOrderById(firstId, secondId) {
        const firstEducation = await this.prisma.education.findUnique({
            where: {
                id: firstId,
            },
            select: {
                order: true,
            },
        });
        const secondEducation = await this.prisma.education.findUnique({
            where: {
                id: secondId,
            },
            select: {
                order: true,
            },
        });
        if (!firstEducation || !secondEducation) {
            throw new common_1.InternalServerErrorException("Education not found");
        }
        const firstUpdated = await this.prisma.education.update({
            where: {
                id: firstId,
            },
            data: {
                order: secondEducation.order,
            },
        });
        const secondUpdated = await this.prisma.education.update({
            where: {
                id: secondId,
            },
            data: {
                order: firstEducation.order,
            },
        });
        return [
            firstUpdated,
            secondUpdated,
        ];
    }
    async getByUserId(userId) {
        return this.prisma.education.findMany({
            where: {
                userId,
            },
            orderBy: {
                order: "desc",
            },
        });
    }
};
exports.PrismaEducationRepository = PrismaEducationRepository;
exports.PrismaEducationRepository = PrismaEducationRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaEducationRepository);
//# sourceMappingURL=prisma-education.repository.js.map