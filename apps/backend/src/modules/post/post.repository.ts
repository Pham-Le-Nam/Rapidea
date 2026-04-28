export interface PostRepository {
    create(userId: string, title?: string, content?: any, courseId?: string, isPreview?: boolean): Promise<any>;
    deleteById(id: string, userId: string): Promise<any>;
    updateById(id: string, userId: string, title?: string, content?: any, isPreview?: boolean): Promise<any>;
    recordView(id: string, userId: string): Promise<any>;
    canViewAllCoursePosts(courseId: string, viewerId?: string): Promise<boolean>;
    findById(id: string): Promise<any>;
    findByCourseId(courseId: string, viewerId?: string, options?: {
        previewOnly?: boolean;
        orderBy?: 'rating' | 'createdAt';
        order?: 'asc' | 'desc';
    }): Promise<any>;
    findByUserId(userId: string): Promise<any>;
}
