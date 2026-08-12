import { Injectable } from '@nestjs/common';
import { CreateNotificationInput, NotificationRepository } from '../../modules/notification/notification.repository';
import { PrismaService } from '../../prisma/prisma.service';
@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
    constructor(private readonly prisma: PrismaService) {}
    create(input: CreateNotificationInput) { return this.prisma.notification.create({ data: input }); }
    createMany(inputs: CreateNotificationInput[]) { return this.prisma.notification.createMany({ data: inputs }); }
    findUserName(userId: string) { return this.prisma.users.findUnique({ where: { id: userId }, select: { firstname: true, middlename: true, lastname: true, username: true } }); }
    findAdminIds() { return this.prisma.users.findMany({ where: { role: 'ADMIN', isBanned: false }, select: { id: true } }); }
    async findFeed(userId: string, limit: number, offset: number) {
        const [notifications, unreadCount] = await Promise.all([
            this.prisma.notification.findMany({ where: { userId }, include: { actor: { select: { id: true, firstname: true, middlename: true, lastname: true, username: true, avatar: true } } }, orderBy: [{ createdAt: 'desc' }, { id: 'asc' }], take: Math.min(Math.max(limit, 1), 50), skip: Math.max(offset, 0) }),
            this.prisma.notification.count({ where: { userId, readAt: null } }),
        ]);
        return { notifications, unreadCount };
    }
    markAsRead(userId: string, notificationId: string) { return this.prisma.notification.update({ where: { id: notificationId, userId }, data: { readAt: new Date() } }); }
    markAllAsRead(userId: string) { return this.prisma.notification.updateMany({ where: { userId, readAt: null }, data: { readAt: new Date() } }); }
    async findFollowersAndSubscribers(userId: string) {
        const [followers, subscribers] = await Promise.all([
            this.prisma.follow.findMany({ where: { followingId: userId }, select: { followerId: true } }),
            this.prisma.subscribe.findMany({ where: { course: { userId } }, distinct: ['userId'], select: { userId: true } }),
        ]);
        return { followers, subscribers };
    }
}
