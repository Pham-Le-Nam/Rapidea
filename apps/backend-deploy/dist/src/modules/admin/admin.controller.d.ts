import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly admin;
    constructor(admin: AdminService);
    moderationQueue(): Promise<any[]>;
    warning(req: any, data: {
        userId: string;
        message: string;
        link?: string;
    }): Promise<any>;
    ban(id: string, reason: string): Promise<any>;
    deletePost(id: string): Promise<any>;
    deleteCourse(id: string): Promise<any>;
    deleteFile(id: string): Promise<any>;
}
