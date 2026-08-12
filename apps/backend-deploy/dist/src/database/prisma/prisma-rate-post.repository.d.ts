import { PrismaService } from '../../prisma/prisma.service';
import { RatePostRepository } from '../../modules/rate-post/rate-post.repository';
export declare class PrismaRatePostRepository implements RatePostRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findPostSummary(postId: string): import("../../../generated/prisma/models").Prisma__PostClient<{
        userId: string;
        title: string | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    findOwnedRating(id: string, userId: string): import("../../../generated/prisma/models").Prisma__RatePostClient<{
        postId: string;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    findPostAccess(postId: string, userId: string): import("../../../generated/prisma/models").Prisma__PostClient<{
        userId: string;
        courseId: string | null;
        isPreview: boolean;
        course: {
            userId: string;
            subscribers: {
                userId: string;
            }[];
        } | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    create(postId: string, userId: string, rating: number): Promise<any>;
    updateById(id: string, userId: string, rating: number): Promise<any>;
    updateByPostId(postId: string, userId: string, rating: number): Promise<any>;
    findRating(postId: string, userId: string): Promise<any>;
    findByPostId(postId: string): Promise<any>;
    findByUserId(userId: string): Promise<any>;
}
