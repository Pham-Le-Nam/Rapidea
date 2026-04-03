export interface PostRepository {
    create(userId: string, title?: string, content?: any, courseId?: string): Promise<any>;
    deleteById(id: string, userId: string): Promise<any>;
    updateById(id: string, userId: string, title?: string, content?: any): Promise<any>;
    findById(id: string): Promise<any>;
    findByCourseId(courseId: string): Promise<any>;
}