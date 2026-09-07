export interface AdminRepository {
    findModerationQueue(): Promise<any[]>;
    banUser(userId: string, reason: string): Promise<any | null>;
    deletePost(postId: string): Promise<any>;
    deleteCourse(courseId: string): Promise<any>;
    deleteFile(fileId: string): Promise<any>;
    findInstructorApplications(): Promise<any[]>;
    findInstructorApplicationById(applicationId: string): Promise<any | null>;
    approveInstructorApplication(applicationId: string, adminId: string): Promise<any | null>;
    disapproveInstructorApplication(applicationId: string, adminId: string): Promise<any | null>;
}
