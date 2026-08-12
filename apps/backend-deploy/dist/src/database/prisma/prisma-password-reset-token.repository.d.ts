import { PrismaService } from '../../prisma/prisma.service';
import { PasswordResetTokenRepository } from 'src/modules/password-reset-token/password-reset-token.repository';
export declare class PrismaPasswordResetTokenRepository implements PasswordResetTokenRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, token: string, expiresAt: Date): Promise<void>;
    getToken(rawToken: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        expiresAt: Date;
        token: string;
        used: boolean;
    } | null>;
    useToken(id: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        expiresAt: Date;
        token: string;
        used: boolean;
    }>;
}
