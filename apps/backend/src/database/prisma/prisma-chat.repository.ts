import { Injectable } from '@nestjs/common';
import { ChatRepository } from '../../modules/chat/chat.repository';
import { PrismaService } from '../../prisma/prisma.service';
const userSelect = { id: true, firstname: true, lastname: true, middlename: true, username: true, avatar: true, headline: true };
@Injectable()
export class PrismaChatRepository implements ChatRepository {
    constructor(private readonly prisma: PrismaService) {}
    findRecentConversations(userId: string) {
        return this.prisma.chatConversation.findMany({ where: { OR: [{ userAId: userId }, { userBId: userId }] }, include: { userA: { select: userSelect }, userB: { select: userSelect }, messages: { orderBy: { createdAt: 'desc' }, take: 1 } }, orderBy: [{ lastMessageAt: 'desc' }, { id: 'asc' }], take: 50 });
    }
    countUnread(conversationId: string, userId: string) { return this.prisma.chatMessage.count({ where: { conversationId, senderId: { not: userId }, readAt: null } }); }
    findUser(userId: string, summaryOnly = false) { return this.prisma.users.findUnique({ where: { id: userId }, select: summaryOnly ? { id: true } : userSelect }); }
    findConversation(userAId: string, userBId: string, limit: number, before?: Date) {
        return this.prisma.chatConversation.findUnique({ where: { userAId_userBId: { userAId, userBId } }, include: { messages: { where: before ? { createdAt: { lt: before } } : undefined, orderBy: { createdAt: 'desc' }, take: Math.min(Math.max(limit, 1), 100) } } });
    }
    markConversationRead(conversationId: string, senderId: string) { return this.prisma.chatMessage.updateMany({ where: { conversationId, senderId, readAt: null }, data: { readAt: new Date() } }); }
    sendMessage(userAId: string, userBId: string, senderId: string, text: string) {
        const now = new Date();
        return this.prisma.$transaction(async tx => {
            const conversation = await tx.chatConversation.upsert({ where: { userAId_userBId: { userAId, userBId } }, update: { lastMessageAt: now }, create: { userAId, userBId, lastMessageAt: now, updatedAt: now } });
            const message = await tx.chatMessage.create({ data: { conversationId: conversation.id, senderId, text, createdAt: now } });
            return { conversationId: conversation.id, message };
        });
    }
    async findRelationship(userId: string, otherUserId: string) {
        const [viewerFollowsOther, otherFollowsViewer, viewerSubscribesToOther, otherSubscribesToViewer] = await Promise.all([
            this.prisma.follow.findUnique({ where: { followerId_followingId: { followerId: userId, followingId: otherUserId } } }),
            this.prisma.follow.findUnique({ where: { followerId_followingId: { followerId: otherUserId, followingId: userId } } }),
            this.prisma.subscribe.findFirst({ where: { userId, course: { userId: otherUserId } }, select: { id: true } }),
            this.prisma.subscribe.findFirst({ where: { userId: otherUserId, course: { userId } }, select: { id: true } }),
        ]);
        return { viewerFollowsOther: !!viewerFollowsOther, otherFollowsViewer: !!otherFollowsViewer, viewerSubscribesToOther: !!viewerSubscribesToOther, otherSubscribesToViewer: !!otherSubscribesToViewer, isFollower: !!otherFollowsViewer, isFollowing: !!viewerFollowsOther, isSubscriber: !!otherSubscribesToViewer, isSubscribed: !!viewerSubscribesToOther };
    }
}
