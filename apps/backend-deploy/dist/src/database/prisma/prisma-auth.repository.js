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
exports.PrismaAuthRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PrismaAuthRepository = class PrismaAuthRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findEmailToken(tokenHash) { return this.prisma.emailAuthToken.findUnique({ where: { tokenHash } }); }
    async consumeEmailToken(id) {
        const result = await this.prisma.emailAuthToken.updateMany({ where: { id, usedAt: null, expiresAt: { gt: new Date() } }, data: { usedAt: new Date() } });
        return result.count === 1;
    }
    findOAuthAccount(provider, providerUserId) {
        return this.prisma.oAuthAccount.findUnique({ where: { provider_providerUserId: { provider, providerUserId } }, include: { user: true } });
    }
    createOAuthAccount(provider, providerUserId, userId) {
        return this.prisma.oAuthAccount.create({ data: { provider, providerUserId, userId }, include: { user: true } });
    }
    async replaceRegistrationToken(email, tokenHash, pendingUser, expiresAt) {
        await this.prisma.$transaction([
            this.prisma.emailAuthToken.updateMany({ where: { email, purpose: 'REGISTER', usedAt: null }, data: { usedAt: new Date() } }),
            this.prisma.emailAuthToken.create({ data: { tokenHash, email, purpose: 'REGISTER', pendingUser, expiresAt } }),
        ]);
    }
};
exports.PrismaAuthRepository = PrismaAuthRepository;
exports.PrismaAuthRepository = PrismaAuthRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaAuthRepository);
//# sourceMappingURL=prisma-auth.repository.js.map