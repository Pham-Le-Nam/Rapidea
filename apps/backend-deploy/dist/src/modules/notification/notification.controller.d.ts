import { NotificationService } from './notification.service';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    getNotifications(req: any, limit?: string, offset?: string): Promise<{
        notifications: any[];
        unreadCount: number;
    }>;
    markAsRead(req: any, notificationId: string): Promise<any>;
    markAllAsRead(req: any): Promise<any>;
}
