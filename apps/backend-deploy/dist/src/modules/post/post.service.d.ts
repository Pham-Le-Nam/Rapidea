import { PostRepository } from "./post.repository";
import { TagsService } from "../tags/tags.service";
import { NotificationService } from "../notification/notification.service";
export declare class PostService {
    private readonly postRepo;
    private readonly tagsService;
    private readonly notificationService;
    constructor(postRepo: PostRepository, tagsService: TagsService, notificationService: NotificationService);
    generatePostField(userId: string, target: 'title' | 'details', input: {
        title?: string;
        details?: string;
        tags?: string[];
        fileIds?: string[];
    }): Promise<{
        target: "details";
        value: any;
    } | {
        target: "title";
        value: string;
    }>;
    createPost(userId: string, title?: string, content?: any, courseId?: string, isPreview?: boolean, tags?: string[]): Promise<any>;
    deletePostById(id: string, userId: string): Promise<any>;
    updatePostById(id: string, userId: string, title?: string, content?: any, isPreview?: boolean, courseId?: string | null, tags?: string[]): Promise<any>;
    recordPostView(id: string, userId: string): Promise<any>;
    canViewAllCoursePosts(courseId: string, viewerId?: string): Promise<boolean>;
    getPostById(id: string): Promise<any>;
    getPostsByCourseId(courseId: string, viewerId?: string, options?: {
        previewOnly?: boolean;
        orderBy?: 'rating' | 'createdAt';
        order?: 'asc' | 'desc';
        offset?: number;
        limit?: number;
    }): Promise<any>;
    getPostsByUserId(userId: string, options?: {
        offset?: number;
        limit?: number;
        courseId?: string;
        nonCourseOnly?: boolean;
        previewMode?: 'all' | 'preview' | 'nonPreview';
        orderBy?: 'rating' | 'createdAt';
        order?: 'asc' | 'desc';
    }): Promise<any>;
    getRecommendedFeed(viewerId?: string, options?: {
        offset?: number;
        limit?: number;
    }): Promise<any>;
}
