export interface FolderInCourseRepository {
    create(folderId: string, courseId: string): Promise<any>;
    delete(folderId: string, courseId: string): Promise<any>;
    getFolders(courseId: string): Promise<any>;
    getCourses(folderId: string): Promise<any>;
}