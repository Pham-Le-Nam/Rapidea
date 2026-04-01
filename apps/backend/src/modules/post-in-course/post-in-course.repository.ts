export interface PostInCourseRepository {
    create(courseId: string, postId: string): Promise<any>;
    delete(courseId: string, postId: string): Promise<any>;
    findByCourseId(courseId: string): Promise<any>;
    findByPostId(postId: string): Promise<any>;
}