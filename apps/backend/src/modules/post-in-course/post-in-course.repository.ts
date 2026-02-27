export interface PostInCourseRepository {
    create(courseId: string, postId: string): Promise<any | null>;
    delete(courseId: string, postId: string): Promise<any | null>;
    findByCourseId(courseId: string): Promise<any | null>;
    findByPostId(courseId: string): Promise<any | null>;
}