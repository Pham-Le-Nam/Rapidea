import { PrismaService } from '../../prisma/prisma.service';
import { DiscussionRepository } from '../../modules/discussion/discussion.repository';
export declare class PrismaDiscussionRepository implements DiscussionRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(discussion: any, postId: string, userId: string, parentId?: string, repliedId?: string): Promise<{
        id: string;
        ratingCount: number;
        ratingTotal: number;
        rating: number;
        createdAt: Date;
        userId: string;
        postId: string;
        discussion: import("@prisma/client/runtime/client").JsonValue;
        parentId: string | null;
        repliedId: string | null;
    }>;
    updateById(id: string, userId: string, discussion: any): Promise<{
        id: string;
        ratingCount: number;
        ratingTotal: number;
        rating: number;
        createdAt: Date;
        userId: string;
        postId: string;
        discussion: import("@prisma/client/runtime/client").JsonValue;
        parentId: string | null;
        repliedId: string | null;
    }>;
    deleteById(id: string, userId: string): Promise<{
        id: string;
        ratingCount: number;
        ratingTotal: number;
        rating: number;
        createdAt: Date;
        userId: string;
        postId: string;
        discussion: import("@prisma/client/runtime/client").JsonValue;
        parentId: string | null;
        repliedId: string | null;
    }>;
    findById(id: string): Promise<{
        id: string;
        ratingCount: number;
        ratingTotal: number;
        rating: number;
        createdAt: Date;
        userId: string;
        postId: string;
        discussion: import("@prisma/client/runtime/client").JsonValue;
        parentId: string | null;
        repliedId: string | null;
    } | null>;
    findPostSummary(postId: string): import("../../../generated/prisma/models").Prisma__PostClient<{
        userId: string;
        title: string | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    findByPostId(postId: string, startIndex?: number, amount?: number): Promise<{
        discussion: {
            id: string;
            ratingCount: number;
            ratingTotal: number;
            rating: number;
            createdAt: Date;
            userId: string;
            postId: string;
            discussion: import("@prisma/client/runtime/client").JsonValue;
            parentId: string | null;
            repliedId: string | null;
        }[];
        startIndex: number;
        amount: number;
    }>;
    findReplyingById(repliedId: string, startIndex?: number, amount?: number): Promise<any>;
    findChildrenById(parentId: string, startIndex?: number, amount?: number): Promise<any>;
    addRatingById(id: string, rating: number): Promise<{
        id: string;
        ratingCount: number;
        ratingTotal: number;
        rating: number;
        createdAt: Date;
        userId: string;
        postId: string;
        discussion: import("@prisma/client/runtime/client").JsonValue;
        parentId: string | null;
        repliedId: string | null;
    }>;
    updateRatingById(id: string, ratingDifference: number): Promise<{
        id: string;
        ratingCount: number;
        ratingTotal: number;
        rating: number;
        createdAt: Date;
        userId: string;
        postId: string;
        discussion: import("@prisma/client/runtime/client").JsonValue;
        parentId: string | null;
        repliedId: string | null;
    }>;
}
