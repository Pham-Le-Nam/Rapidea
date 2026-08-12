import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../../modules/auth/auth.repository';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PrismaAuthRepository implements AuthRepository {
    constructor(private readonly prisma: PrismaService) {}
    findEmailToken(tokenHash: string) { return this.prisma.emailAuthToken.findUnique({ where: { tokenHash } }); }
    async consumeEmailToken(id: string) {
        const result = await this.prisma.emailAuthToken.updateMany({ where: { id, usedAt: null, expiresAt: { gt: new Date() } }, data: { usedAt: new Date() } });
        return result.count === 1;
    }
    findOAuthAccount(provider: string, providerUserId: string) {
        return this.prisma.oAuthAccount.findUnique({ where: { provider_providerUserId: { provider, providerUserId } }, include: { user: true } });
    }
    createOAuthAccount(provider: string, providerUserId: string, userId: string) {
        return this.prisma.oAuthAccount.create({ data: { provider, providerUserId, userId }, include: { user: true } });
    }
    async replaceRegistrationToken(email: string, tokenHash: string, pendingUser: any, expiresAt: Date) {
        await this.prisma.$transaction([
            this.prisma.emailAuthToken.updateMany({ where: { email, purpose: 'REGISTER', usedAt: null }, data: { usedAt: new Date() } }),
            this.prisma.emailAuthToken.create({ data: { tokenHash, email, purpose: 'REGISTER', pendingUser, expiresAt } }),
        ]);
    }
}
