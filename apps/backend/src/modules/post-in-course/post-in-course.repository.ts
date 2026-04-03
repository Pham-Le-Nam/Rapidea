export interface PostInCourseRepository {
    create(courseId: string, postId: string, userId: string): Promise<any>;
    delete(courseId: string, postId: string, userId: string): Promise<any>;
    findByCourseId(courseId: string): Promise<any>;
    findByPostId(postId: string): Promise<any>;
}