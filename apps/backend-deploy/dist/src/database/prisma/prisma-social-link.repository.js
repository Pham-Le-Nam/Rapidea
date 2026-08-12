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
exports.PrismaSocialLinkRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PrismaSocialLinkRepository = class PrismaSocialLinkRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(platform, url, userId) {
        const user = await this.prisma.users.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user) {
            throw new common_1.InternalServerErrorException("User not found");
        }
        return this.prisma.socialLink.create({
            data: {
                platform,
                url,
                userId,
            },
        });
    }
    async deleteById(id) {
        return this.prisma.socialLink.delete({
            where: {
                id,
            },
        });
    }
    async updateById(id, url) {
        return this.prisma.socialLink.update({
            where: {
                id,
            },
            data: {
                url,
            },
        });
    }
    async findByUserId(userId) {
        return this.prisma.socialLink.findMany({
            where: {
                userId,
            },
        });
    }
    async findById(id) {
        return this.prisma.socialLink.findUnique({
            where: {
                id,
            },
        });
    }
};
exports.PrismaSocialLinkRepository = PrismaSocialLinkRepository;
exports.PrismaSocialLinkRepository = PrismaSocialLinkRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaSocialLinkRepository);
//# sourceMappingURL=prisma-social-link.repository.js.map