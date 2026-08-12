import { AdminRepository } from './admin.repository';
import { NotificationService } from '../notification/notification.service';
export declare class AdminService {
    private readonly adminRepo;
    private readonly notifications;
    constructor(adminRepo: AdminRepository, notifications: NotificationService);
    getModerationQueue(): Promise<any[]>;
    warn(adminId: string, userId: string, message: string, link?: string): Promise<any>;
    ban(userId: string, reason: string): Promise<any>;
    deletePost(postId: string): Promise<any>;
    deleteCourse(courseId: string): Promise<any>;
    deleteFile(fileId: string): Promise<any>;
}
