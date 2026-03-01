export interface FileInCourseRepository {
    create(fileId: string, courseId: string): Promise<any>;
    delete(fileId: string, courseId: string): Promise<any>;
    getCourses(fileId: string): Promise<any>;
    getFiles(courseId: string): Promise<any>;
}