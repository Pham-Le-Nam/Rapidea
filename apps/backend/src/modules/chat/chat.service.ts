import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ChatService {
    constructor(private readonly prisma: PrismaService) {}

    async getRecentConversations(userId: string, onlyRelated = true) {
        const conversations = await this.prisma.chatConversation.findMany({
            where: {
                OR: [
                    { userAId: userId },
                    { userBId: userId },
                ],
            },
            include: {
                userA: { select: this.userSelect },
                userB: { select: this.userSelect },
                messages: {
                    orderBy: { createdAt: 'desc' },
                    take: 1,
                },
            },
            orderBy: [
                { lastMessageAt: 'desc' },
                { id: 'asc' },
            ],
            take: 50,
        });

        const enriched = await Promise.all(conversations.map(async (conversation) => {
            const otherUser = conversation.userAId === userId ? conversation.userB : conversation.userA;
            const [relationship, unreadCount] = await Promise.all([
                this.getRelationship(userId, otherUser.id),
                this.prisma.chatMessage.count({
                    where: {
                        conversationId: conversation.id,
                        senderId: {
                            not: userId,
                        },
                        readAt: null,
                    },
                }),
            ]);

            return {
                id: conversation.id,
                otherUser,
                relationship,
                lastMessage: conversation.messages[0] ?? null,
                lastMessageAt: conversation.lastMessageAt,
                unreadCount,
            };
        }));

        return onlyRelated
            ? enriched.filter((conversation) => this.hasAnyRelationship(conversation.relationship))
            : enriched;
    }

    async getConversation(userId: string, otherUserId: string, limit = 10, before?: Date) {
        if (userId === otherUserId) {
            throw new BadRequestException("You cannot chat with yourself");
        }

        const otherUser = await this.prisma.users.findUnique({
            where: { id: otherUserId },
            select: this.userSelect,
        });

        if (!otherUser) {
            throw new NotFoundException("User not found");
        }

        const pair = this.getConversationPair(userId, otherUserId);
        const conversation = await this.prisma.chatConversation.findUnique({
            where: {
                userAId_userBId: pair,
            },
            include: {
                messages: {
                    where: before
                        ? {
                            createdAt: {
                                lt: before,
                            },
                        }
                        : undefined,
                    orderBy: { createdAt: 'desc' },
                    take: Math.min(Math.max(limit, 1), 100),
                },
            },
        });

        if (conversation) {
            await this.prisma.chatMessage.updateMany({
                where: {
                    conversationId: conversation.id,
                    senderId: otherUserId,
                    readAt: null,
                },
                data: {
                    readAt: new Date(),
                },
            });
        }

        return {
            conversationId: conversation?.id ?? null,
            otherUser,
            relationship: await this.getRelationship(userId, otherUserId),
            messages: conversation ? [...conversation.messages].reverse() : [],
            hasMore: conversation ? conversation.messages.length === Math.min(Math.max(limit, 1), 100) : false,
        };
    }

    async sendMessage(userId: string, otherUserId: string, text: string) {
        const trimmedText = text.trim();

        if (userId === otherUserId) {
            throw new BadRequestException("You cannot chat with yourself");
        }

        if (!trimmedText) {
            throw new BadRequestException("Message cannot be empty");
        }

        if (trimmedText.length > 2000) {
            throw new BadRequestException("Message is too long");
        }

        const otherUser = await this.prisma.users.findUnique({
            where: { id: otherUserId },
            select: { id: true },
        });

        if (!otherUser) {
            throw new NotFoundException("User not found");
        }

        const pair = this.getConversationPair(userId, otherUserId);
        const now = new Date();

        return this.prisma.$transaction(async (tx) => {
            const conversation = await tx.chatConversation.upsert({
                where: {
                    userAId_userBId: pair,
                },
                update: {
                    lastMessageAt: now,
                },
                create: {
                    ...pair,
                    lastMessageAt: now,
                    updatedAt: now,
                },
            });

            const message = await tx.chatMessage.create({
                data: {
                    conversationId: conversation.id,
                    senderId: userId,
                    text: trimmedText,
                    createdAt: now,
                },
            });

            return {
                conversationId: conversation.id,
                message,
            };
        });
    }

    private getConversationPair(userId: string, otherUserId: string) {
        const [userAId, userBId] = [userId, otherUserId].sort();

        return { userAId, userBId };
    }

    private async getRelationship(userId: string, otherUserId: string) {
        const [
            viewerFollowsOther,
            otherFollowsViewer,
            viewerSubscribesToOther,
            otherSubscribesToViewer,
        ] = await Promise.all([
            this.prisma.follow.findUnique({
                where: {
                    followerId_followingId: {
                        followerId: userId,
                        followingId: otherUserId,
                    },
                },
            }),
            this.prisma.follow.findUnique({
                where: {
                    followerId_followingId: {
                        followerId: otherUserId,
                        followingId: userId,
                    },
                },
            }),
            this.prisma.subscribe.findFirst({
                where: {
                    userId,
                    course: {
                        userId: otherUserId,
                    },
                },
                select: { id: true },
            }),
            this.prisma.subscribe.findFirst({
                where: {
                    userId: otherUserId,
                    course: {
                        userId,
                    },
                },
                select: { id: true },
            }),
        ]);

        return {
            viewerFollowsOther: !!viewerFollowsOther,
            otherFollowsViewer: !!otherFollowsViewer,
            viewerSubscribesToOther: !!viewerSubscribesToOther,
            otherSubscribesToViewer: !!otherSubscribesToViewer,
            isFollower: !!otherFollowsViewer,
            isFollowing: !!viewerFollowsOther,
            isSubscriber: !!otherSubscribesToViewer,
            isSubscribed: !!viewerSubscribesToOther,
        };
    }

    private hasAnyRelationship(relationship: any) {
        return !!(
            relationship.viewerFollowsOther
            || relationship.otherFollowsViewer
            || relationship.viewerSubscribesToOther
            || relationship.otherSubscribesToViewer
        );
    }

    private readonly userSelect = {
        id: true,
        firstname: true,
        lastname: true,
        middlename: true,
        username: true,
        avatar: true,
        headline: true,
    };
}
