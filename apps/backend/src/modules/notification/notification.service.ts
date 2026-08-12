import { Inject, Injectable } from '@nestjs/common';
import { NotificationType } from '../../../generated/prisma/enums';
import { CreateNotificationInput, NotificationRepository } from './notification.repository';

@Injectable()
export class NotificationService {
    constructor(@Inject('NOTIFICATION_REPOSITORY') private readonly notificationRepo: NotificationRepository) {}

    async createNotification(input: CreateNotificationInput) {
        if (!input.userId || input.userId === input.actorId) {
            return null;
        }

        return this.notificationRepo.create(input);
    }

    async notifyFollow(followerId: string, followingId: string) {
        const follower = await this.notificationRepo.findUserName(followerId);
        const followerName = [follower?.firstname, follower?.middlename, follower?.lastname].filter(Boolean).join(' ') || follower?.username || 'Someone';

        return this.createNotification({
            userId: followingId,
            actorId: followerId,
            type: NotificationType.FOLLOW,
            title: 'New follower',
            message: `${followerName} followed you`,
            link: follower?.username ? `/profile/${follower.username}` : undefined,
        });
    }

    async createManyNotifications(inputs: CreateNotificationInput[]) {
        const uniqueNotifications = new Map<string, CreateNotificationInput>();

        inputs
            .filter((input) => input.userId && input.userId !== input.actorId)
            .forEach((input) => {
                uniqueNotifications.set(`${input.userId}:${input.type}:${input.link ?? ''}:${input.actorId ?? ''}`, input);
            });

        const data = Array.from(uniqueNotifications.values());

        if (data.length === 0) {
            return { count: 0 };
        }

        return this.notificationRepo.createMany(data);
    }

    async notifyFollowersAndSubscribersOfNewCourse(actorId: string, courseId: string, courseTitle: string) {
        const recipients = await this.getFollowersAndSubscribers(actorId);
        const actorName = await this.getUserName(actorId);

        return this.createManyNotifications(recipients.map((recipient) => ({
            userId: recipient.userId,
            actorId,
            type: recipient.kind === 'subscriber'
                ? NotificationType.SUBSCRIBED_CREATOR_NEW_COURSE
                : NotificationType.FOLLOWING_NEW_COURSE,
            title: `${actorName} created a new course`,
            message: courseTitle,
            link: `/course/${courseId}`,
        })));
    }

    async notifyFollowersAndSubscribersOfNewPost(actorId: string, postId: string, postTitle?: string | null) {
        const recipients = await this.getFollowersAndSubscribers(actorId);
        const actorName = await this.getUserName(actorId);

        return this.createManyNotifications(recipients.map((recipient) => ({
            userId: recipient.userId,
            actorId,
            type: recipient.kind === 'subscriber'
                ? NotificationType.SUBSCRIBED_CREATOR_NEW_POST
                : NotificationType.FOLLOWING_NEW_POST,
            title: `${actorName} created a new post`,
            message: postTitle || 'Untitled post',
            link: `/post/${postId}`,
        })));
    }

    async notifyAdminsOfModerationAlert(actorId: string, fileId: string, fileName: string, message: string) {
        const admins = await this.notificationRepo.findAdminIds();
        return this.createManyNotifications(admins.map((admin) => ({
            userId: admin.id,
            actorId,
            type: NotificationType.MODERATION_ALERT,
            title: 'Serious upload warning',
            message: `${fileName}: ${message}`,
            link: `/admin/moderation?file=${encodeURIComponent(fileId)}`,
        })));
    }

    async getNotifications(userId: string, limit = 20, offset = 0) {
        return this.notificationRepo.findFeed(userId, limit, offset);
    }

    async markAsRead(userId: string, notificationId: string) {
        return this.notificationRepo.markAsRead(userId, notificationId);
    }

    async markAllAsRead(userId: string) {
        return this.notificationRepo.markAllAsRead(userId);
    }

    private async getFollowersAndSubscribers(userId: string) {
        const { followers, subscribers } = await this.notificationRepo.findFollowersAndSubscribers(userId);

        const recipients = new Map<string, { userId: string; kind: 'follower' | 'subscriber' }>();

        followers.forEach((follow) => recipients.set(follow.followerId, {
            userId: follow.followerId,
            kind: 'follower',
        }));
        subscribers.forEach((subscribe) => recipients.set(subscribe.userId, {
            userId: subscribe.userId,
            kind: 'subscriber',
        }));

        return Array.from(recipients.values());
    }

    private async getUserName(userId: string) {
        const user = await this.notificationRepo.findUserName(userId);

        return [user?.firstname, user?.middlename, user?.lastname].filter(Boolean).join(' ') || user?.username || 'Someone';
    }
}
