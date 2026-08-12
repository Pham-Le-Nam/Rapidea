import { AuthRepository } from '../../modules/auth/auth.repository';
import { PrismaService } from '../../prisma/prisma.service';
export declare class PrismaAuthRepository implements AuthRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findEmailToken(tokenHash: string): import("../../../generated/prisma/models").Prisma__EmailAuthTokenClient<{
        id: string;
        email: string;
        createdAt: Date;
        tokenHash: string;
        purpose: string;
        pendingUser: import("@prisma/client/runtime/client").JsonValue | null;
        expiresAt: Date;
        usedAt: Date | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    consumeEmailToken(id: string): Promise<boolean>;
    findOAuthAccount(provider: string, providerUserId: string): import("../../../generated/prisma/models").Prisma__OAuthAccountClient<({
        user: {
            id: string;
            email: string;
            password: string | null;
            firstname: string;
            lastname: string;
            middlename: string | null;
            username: string;
            avatarId: number | null;
            backgroundId: number | null;
            headline: string | null;
            bio: string | null;
            postsCount: number;
            coursesCount: number;
            followersCount: number;
            followingCount: number;
            subscribersCount: number;
            ratingCount: number;
            ratingTotal: number;
            rating: number;
            sessionVersion: number;
            role: import("../../../generated/prisma/enums").AccountRole;
            isBanned: boolean;
            bannedAt: Date | null;
            banReason: string | null;
            creatorPrompt: string | null;
            createdAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        provider: string;
        providerUserId: string;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    createOAuthAccount(provider: string, providerUserId: string, userId: string): import("../../../generated/prisma/models").Prisma__OAuthAccountClient<{
        user: {
            id: string;
            email: string;
            password: string | null;
            firstname: string;
            lastname: string;
            middlename: string | null;
            username: string;
            avatarId: number | null;
            backgroundId: number | null;
            headline: string | null;
            bio: string | null;
            postsCount: number;
            coursesCount: number;
            followersCount: number;
            followingCount: number;
            subscribersCount: number;
            ratingCount: number;
            ratingTotal: number;
            rating: number;
            sessionVersion: number;
            role: import("../../../generated/prisma/enums").AccountRole;
            isBanned: boolean;
            bannedAt: Date | null;
            banReason: string | null;
            creatorPrompt: string | null;
            createdAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        provider: string;
        providerUserId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    replaceRegistrationToken(email: string, tokenHash: string, pendingUser: any, expiresAt: Date): Promise<void>;
}
