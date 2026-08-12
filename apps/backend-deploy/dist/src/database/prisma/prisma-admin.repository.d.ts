import { AdminRepository } from '../../modules/admin/admin.repository';
import { PrismaService } from '../../prisma/prisma.service';
export declare class PrismaAdminRepository implements AdminRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findModerationQueue(): import("../../../generated/prisma/internal/prismaNamespace").PrismaPromise<({
        user: {
            id: string;
            email: string;
            username: string;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        folderId: string;
        name: string;
        mimeType: string;
        size: number;
        moderationStatus: import("../../../generated/prisma/enums").ModerationStatus;
        moderationScore: number | null;
        moderationCategories: import("@prisma/client/runtime/client").JsonValue | null;
        moderationMessage: string | null;
    })[]>;
    banUser(userId: string, reason: string): Promise<{
        id: string;
        username: string;
        isBanned: boolean;
        bannedAt: Date | null;
        banReason: string | null;
    } | null>;
    deletePost(postId: string): import("../../../generated/prisma/models").Prisma__PostClient<{
        id: string;
        ratingCount: number;
        ratingTotal: number;
        rating: number;
        createdAt: Date;
        userId: string;
        title: string | null;
        lastUpdated: Date;
        courseId: string | null;
        content: import("@prisma/client/runtime/client").JsonValue | null;
        isPreview: boolean;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    deleteCourse(courseId: string): import("../../../generated/prisma/models").Prisma__CourseClient<{
        id: string;
        postsCount: number;
        subscribersCount: number;
        ratingCount: number;
        ratingTotal: number;
        rating: number;
        createdAt: Date;
        userId: string;
        currency: string;
        title: string;
        description: string | null;
        price: number;
        thumbnailId: number | null;
        folderId: string;
        lastUpdated: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    deleteFile(fileId: string): import("../../../generated/prisma/models").Prisma__FileClient<{
        id: string;
        createdAt: Date;
        userId: string;
        folderId: string;
        name: string;
        mimeType: string;
        size: number;
        moderationStatus: import("../../../generated/prisma/enums").ModerationStatus;
        moderationScore: number | null;
        moderationCategories: import("@prisma/client/runtime/client").JsonValue | null;
        moderationMessage: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
}
