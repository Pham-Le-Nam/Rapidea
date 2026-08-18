import type { NotificationType } from '../notification-type';
export type CreateNotificationInput = { userId: string; actorId?: string; type: NotificationType; title: string; message: string; link?: string };
export interface NotificationRepository {
    create(input: CreateNotificationInput): Promise<any>;
    createMany(inputs: CreateNotificationInput[]): Promise<{ count: number }>;
    findUserName(userId: string): Promise<any | null>;
    findAdminIds(): Promise<Array<{ id: string }>>;
    findFeed(userId: string, limit: number, offset: number): Promise<{ notifications: any[]; unreadCount: number }>;
    markAsRead(userId: string, notificationId: string): Promise<any>;
    markAllAsRead(userId: string): Promise<any>;
    findFollowersAndSubscribers(userId: string): Promise<{ followers: any[]; subscribers: any[] }>;
}
