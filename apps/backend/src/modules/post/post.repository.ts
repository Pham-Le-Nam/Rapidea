export interface PostRepository {
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
}
