import { Injectable } from '@nestjs/common';
import { NotificationType } from '../../../generated/prisma/enums';
import { PrismaService } from '../../prisma/prisma.service';

type CreateNotificationInput = {
    userId: string;
    actorId?: string;
    type: NotificationType;
    title: string;
    message: string;
    link?: string;
};

@Injectable()
export class NotificationService {
    constructor(private readonly prisma: PrismaService) {}

    async createNotification(input: CreateNotificationInput) {
        if (!input.userId || input.userId === input.actorId) {
            return null;
        }

        return this.prisma.notification.create({
            data: input,
        });
    }

    async notifyFollow(followerId: string, followingId: string) {
        const follower = await this.prisma.users.findUnique({
            where: { id: followerId },
            select: {
                firstname: true,
                middlename: true,
                lastname: true,
                username: true,
            },
        });
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

        return this.prisma.notification.createMany({ data });
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
        const admins = await this.prisma.users.findMany({
            where: { role: 'ADMIN', isBanned: false },
            select: { id: true },
        });
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
        const [notifications, unreadCount] = await Promise.all([
            this.prisma.notification.findMany({
                where: { userId },
                include: {
                    actor: {
                        select: {
                            id: true,
                            firstname: true,
                            middlename: true,
                            lastname: true,
                            username: true,
                            avatar: true,
                        },
                    },
                },
                orderBy: [
                    { createdAt: 'desc' },
                    { id: 'asc' },
                ],
                take: Math.min(Math.max(limit, 1), 50),
                skip: Math.max(offset, 0),
            }),
            this.prisma.notification.count({
                where: {
                    userId,
                    readAt: null,
                },
            }),
        ]);

        return { notifications, unreadCount };
    }

    async markAsRead(userId: string, notificationId: string) {
        return this.prisma.notification.update({
            where: {
                id: notificationId,
                userId,
            },
            data: {
                readAt: new Date(),
            },
        });
    }

    async markAllAsRead(userId: string) {
        return this.prisma.notification.updateMany({
            where: {
                userId,
                readAt: null,
            },
            data: {
                readAt: new Date(),
            },
        });
    }

    private async getFollowersAndSubscribers(userId: string) {
        const [followers, subscribers] = await Promise.all([
            this.prisma.follow.findMany({
                where: { followingId: userId },
                select: { followerId: true },
            }),
            this.prisma.subscribe.findMany({
                where: {
                    course: {
                        userId,
                    },
                },
                distinct: ['userId'],
                select: { userId: true },
            }),
        ]);

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
        const user = await this.prisma.users.findUnique({
            where: { id: userId },
            select: {
                firstname: true,
                middlename: true,
                lastname: true,
                username: true,
            },
        });

        return [user?.firstname, user?.middlename, user?.lastname].filter(Boolean).join(' ') || user?.username || 'Someone';
    }
}
