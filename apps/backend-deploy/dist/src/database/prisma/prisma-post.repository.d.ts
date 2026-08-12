import { PrismaService } from '../../prisma/prisma.service';
import { PostRepository } from '../../modules/post/post.repository';
export declare class PrismaPostRepository implements PostRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findGenerationContext(userId: string, fileIds: string[]): Promise<{
        user: {
            creatorPrompt: string | null;
        } | null;
        files: ({
            transcript: {
                id: string;
                createdAt: Date;
                provider: string | null;
                status: import("../../../generated/prisma/enums").TranscriptStatus;
                updatedAt: Date;
                text: string | null;
                fileId: string;
                language: string | null;
                durationSec: number | null;
                model: string | null;
                errorMessage: string | null;
            } | null;
            tags: ({
                tag: {
                    id: string;
                    createdAt: Date;
                    name: string;
                    embedding: import("@prisma/client/runtime/client").JsonValue | null;
                };
            } & {
                createdAt: Date;
                fileId: string;
                tagId: string;
                isSuggested: boolean;
                score: number | null;
            })[];
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
        })[];
    }>;
    create(userId: string, title?: string, content?: any, courseId?: string, isPreview?: boolean): Promise<any>;
    deleteById(id: string, userId: string): Promise<any>;
    updateById(id: string, userId: string, title?: string, content?: any, isPreview?: boolean, courseId?: string | null): Promise<any>;
    recordView(id: string, userId: string): Promise<any>;
    canViewAllCoursePosts(courseId: string, viewerId?: string): Promise<boolean>;
    findById(id: string): Promise<any>;
    findByCourseId(courseId: string, viewerId?: string, options?: {
        previewOnly?: boolean;
        orderBy?: 'rating' | 'createdAt';
        order?: 'asc' | 'desc';
        offset?: number;
        limit?: number;
    }): Promise<any>;
    findByUserId(userId: string, options?: {
        offset?: number;
        limit?: number;
        courseId?: string;
        nonCourseOnly?: boolean;
        previewMode?: 'all' | 'preview' | 'nonPreview';
        orderBy?: 'rating' | 'createdAt';
        order?: 'asc' | 'desc';
    }): Promise<any>;
    findRecommendedFeed(viewerId?: string, options?: {
        offset?: number;
        limit?: number;
    }): Promise<any>;
    private getViewerRecommendationContext;
    private getTagNames;
    private calculateSimilarityScore;
    private calculateRecencyScore;
    private calculateEngagementScore;
    private calculateAuthorScore;
    private diversifyPosts;
    private diversifyPostGroup;
    private getPrimaryTag;
    private clampScore;
}
