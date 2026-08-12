import { PostService } from './post.service';
import { AddPostDto } from './post-dto/add-post.dto';
import { CourseService } from '../course/course.service';
import { UsersService } from '../users/users.service';
export declare class PostController {
    private readonly postService;
    private readonly courseService;
    private readonly usersService;
    constructor(postService: PostService, courseService: CourseService, usersService: UsersService);
    getHomepageFeed(req: any, offset?: string, limit?: string): Promise<{
        posts: any;
        hasMore: boolean;
    }>;
    createPost(req: any, addPostDto: AddPostDto): Promise<any>;
    deletePost(req: any, data: {
        postId: string;
    }): Promise<any>;
    getPostsByUsername(req: any, username: string, offset?: string, limit?: string, courseId?: string, nonCourseOnly?: string, previewMode?: 'all' | 'preview' | 'nonPreview', orderBy?: 'rating' | 'createdAt', order?: 'asc' | 'desc'): Promise<{
        posts: any;
        hasMore: boolean;
        isOwner: boolean;
    }>;
    updatePost(req: any, data: {
        postId: string;
        title?: string;
        content?: any;
        isPreview?: boolean;
        courseId?: string | null;
        tags?: string[];
    }): Promise<any>;
    generatePostField(req: any, data: {
        target: 'title' | 'details';
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
    getPostsByCourseId(req: any, courseId: string, previewOnly?: string, orderBy?: 'rating' | 'createdAt', order?: 'asc' | 'desc', offset?: string, limit?: string): Promise<{
        posts: any;
        hasMore: boolean;
        isOwner: boolean;
        canViewAllPosts: boolean;
    }>;
    getPost(req: any, id: string): Promise<{
        post: any;
        isOwner: boolean;
        canViewPost: any;
    }>;
    private getPagination;
}
