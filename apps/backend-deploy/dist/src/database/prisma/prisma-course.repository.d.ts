import { PrismaService } from '../../prisma/prisma.service';
import { CourseRepository } from '../../modules/course/course.repository';
export declare class PrismaCourseRepository implements CourseRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, title: string, folderId: string, description?: string, price?: number, currency?: string): Promise<{
        tags: ({
            tag: {
                id: string;
                createdAt: Date;
                name: string;
                embedding: import("@prisma/client/runtime/client").JsonValue | null;
            };
        } & {
            createdAt: Date;
            courseId: string;
            tagId: string;
            isSuggested: boolean;
            score: number | null;
        })[];
        thumbnail: {
            url: string;
            id: number;
            createdAt: Date;
            userId: string;
            name: string;
        } | null;
    } & {
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
    }>;
    updateById(id: string, userId: string, title?: string, description?: string, price?: number, currency?: string, thumbnailId?: number): Promise<{
        tags: ({
            tag: {
                id: string;
                createdAt: Date;
                name: string;
                embedding: import("@prisma/client/runtime/client").JsonValue | null;
            };
        } & {
            createdAt: Date;
            courseId: string;
            tagId: string;
            isSuggested: boolean;
            score: number | null;
        })[];
        thumbnail: {
            url: string;
            id: number;
            createdAt: Date;
            userId: string;
            name: string;
        } | null;
    } & {
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
    }>;
    updateLastUpdatedById(id: string, lastUpdated?: Date): Promise<{
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
    }>;
    recordView(id: string, userId: string): Promise<{
        id: string;
        userId: string;
        courseId: string;
        viewedAt: Date;
    }>;
    findById(id: string): Promise<({
        tags: ({
            tag: {
                id: string;
                createdAt: Date;
                name: string;
                embedding: import("@prisma/client/runtime/client").JsonValue | null;
            };
        } & {
            createdAt: Date;
            courseId: string;
            tagId: string;
            isSuggested: boolean;
            score: number | null;
        })[];
        thumbnail: {
            url: string;
            id: number;
            createdAt: Date;
            userId: string;
            name: string;
        } | null;
    } & {
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
    }) | null>;
    findByUserId(userId: string, orderByField?: string, order?: 'asc' | 'desc', amount?: number, offset?: number): Promise<({
        tags: ({
            tag: {
                id: string;
                createdAt: Date;
                name: string;
                embedding: import("@prisma/client/runtime/client").JsonValue | null;
            };
        } & {
            createdAt: Date;
            courseId: string;
            tagId: string;
            isSuggested: boolean;
            score: number | null;
        })[];
        thumbnail: {
            url: string;
            id: number;
            createdAt: Date;
            userId: string;
            name: string;
        } | null;
    } & {
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
    })[]>;
    deleteCourseById(id: string): Promise<any>;
}
