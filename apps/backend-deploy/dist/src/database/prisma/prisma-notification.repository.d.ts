import { CreateNotificationInput, NotificationRepository } from '../../modules/notification/notification.repository';
import { PrismaService } from '../../prisma/prisma.service';
export declare class PrismaNotificationRepository implements NotificationRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(input: CreateNotificationInput): import("../../../generated/prisma/models").Prisma__NotificationClient<{
        id: string;
        createdAt: Date;
        userId: string;
        actorId: string | null;
        type: import("../../../generated/prisma/enums").NotificationType;
        title: string;
        message: string;
        link: string | null;
        readAt: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    createMany(inputs: CreateNotificationInput[]): import("../../../generated/prisma/internal/prismaNamespace").PrismaPromise<import("../../../generated/prisma/internal/prismaNamespace").BatchPayload>;
    findUserName(userId: string): import("../../../generated/prisma/models").Prisma__UsersClient<{
        firstname: string;
        lastname: string;
        middlename: string | null;
        username: string;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    findAdminIds(): import("../../../generated/prisma/internal/prismaNamespace").PrismaPromise<{
        id: string;
    }[]>;
    findFeed(userId: string, limit: number, offset: number): Promise<{
        notifications: ({
            actor: {
                id: string;
                firstname: string;
                lastname: string;
                middlename: string | null;
                username: string;
                avatar: {
                    url: string;
                    id: number;
                    createdAt: Date;
                    userId: string;
                    name: string;
                } | null;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            userId: string;
            actorId: string | null;
            type: import("../../../generated/prisma/enums").NotificationType;
            title: string;
            message: string;
            link: string | null;
            readAt: Date | null;
        })[];
        unreadCount: number;
    }>;
    markAsRead(userId: string, notificationId: string): import("../../../generated/prisma/models").Prisma__NotificationClient<{
        id: string;
        createdAt: Date;
        userId: string;
        actorId: string | null;
        type: import("../../../generated/prisma/enums").NotificationType;
        title: string;
        message: string;
        link: string | null;
        readAt: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    markAllAsRead(userId: string): import("../../../generated/prisma/internal/prismaNamespace").PrismaPromise<import("../../../generated/prisma/internal/prismaNamespace").BatchPayload>;
    findFollowersAndSubscribers(userId: string): Promise<{
        followers: {
            followerId: string;
        }[];
        subscribers: {
            userId: string;
        }[];
    }>;
}
