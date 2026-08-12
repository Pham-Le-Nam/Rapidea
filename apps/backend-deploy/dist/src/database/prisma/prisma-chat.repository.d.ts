import { ChatRepository } from '../../modules/chat/chat.repository';
import { PrismaService } from '../../prisma/prisma.service';
export declare class PrismaChatRepository implements ChatRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findRecentConversations(userId: string): import("../../../generated/prisma/internal/prismaNamespace").PrismaPromise<({
        userA: {
            id: string;
            firstname: string;
            lastname: string;
            middlename: string | null;
            username: string;
            headline: string | null;
            avatar: {
                url: string;
                id: number;
                createdAt: Date;
                userId: string;
                name: string;
            } | null;
        };
        userB: {
            id: string;
            firstname: string;
            lastname: string;
            middlename: string | null;
            username: string;
            headline: string | null;
            avatar: {
                url: string;
                id: number;
                createdAt: Date;
                userId: string;
                name: string;
            } | null;
        };
        messages: {
            id: string;
            createdAt: Date;
            readAt: Date | null;
            conversationId: string;
            senderId: string;
            text: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userAId: string;
        userBId: string;
        lastMessageAt: Date;
    })[]>;
    countUnread(conversationId: string, userId: string): import("../../../generated/prisma/internal/prismaNamespace").PrismaPromise<number>;
    findUser(userId: string, summaryOnly?: boolean): import("../../../generated/prisma/models").Prisma__UsersClient<{
        id: string;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    findConversation(userAId: string, userBId: string, limit: number, before?: Date): import("../../../generated/prisma/models").Prisma__ChatConversationClient<({
        messages: {
            id: string;
            createdAt: Date;
            readAt: Date | null;
            conversationId: string;
            senderId: string;
            text: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userAId: string;
        userBId: string;
        lastMessageAt: Date;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    markConversationRead(conversationId: string, senderId: string): import("../../../generated/prisma/internal/prismaNamespace").PrismaPromise<import("../../../generated/prisma/internal/prismaNamespace").BatchPayload>;
    sendMessage(userAId: string, userBId: string, senderId: string, text: string): Promise<{
        conversationId: string;
        message: {
            id: string;
            createdAt: Date;
            readAt: Date | null;
            conversationId: string;
            senderId: string;
            text: string;
        };
    }>;
    findRelationship(userId: string, otherUserId: string): Promise<{
        viewerFollowsOther: boolean;
        otherFollowsViewer: boolean;
        viewerSubscribesToOther: boolean;
        otherSubscribesToViewer: boolean;
        isFollower: boolean;
        isFollowing: boolean;
        isSubscriber: boolean;
        isSubscribed: boolean;
    }>;
}
