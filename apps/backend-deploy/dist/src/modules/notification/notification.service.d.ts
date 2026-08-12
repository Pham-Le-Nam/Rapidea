import { CreateNotificationInput, NotificationRepository } from './notification.repository';
export declare class NotificationService {
    private readonly notificationRepo;
    constructor(notificationRepo: NotificationRepository);
    createNotification(input: CreateNotificationInput): Promise<any>;
    notifyFollow(followerId: string, followingId: string): Promise<any>;
    createManyNotifications(inputs: CreateNotificationInput[]): Promise<{
        count: number;
    }>;
    notifyFollowersAndSubscribersOfNewCourse(actorId: string, courseId: string, courseTitle: string): Promise<{
        count: number;
    }>;
    notifyFollowersAndSubscribersOfNewPost(actorId: string, postId: string, postTitle?: string | null): Promise<{
        count: number;
    }>;
    notifyAdminsOfModerationAlert(actorId: string, fileId: string, fileName: string, message: string): Promise<{
        count: number;
    }>;
    getNotifications(userId: string, limit?: number, offset?: number): Promise<{
        notifications: any[];
        unreadCount: number;
    }>;
    markAsRead(userId: string, notificationId: string): Promise<any>;
    markAllAsRead(userId: string): Promise<any>;
    private getFollowersAndSubscribers;
    private getUserName;
}
