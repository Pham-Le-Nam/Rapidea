import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ChatRepository } from './chat.repository';

@Injectable()
export class ChatService {
    constructor(@Inject('CHAT_REPOSITORY') private readonly chatRepo: ChatRepository) {}

    async getRecentConversations(userId: string, onlyRelated = true) {
        const conversations = await this.chatRepo.findRecentConversations(userId);

        const enriched = await Promise.all(conversations.map(async (conversation) => {
            const otherUser = conversation.userAId === userId ? conversation.userB : conversation.userA;
            const [relationship, unreadCount] = await Promise.all([
                this.getRelationship(userId, otherUser.id),
                this.chatRepo.countUnread(conversation.id, userId),
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

        const otherUser = await this.chatRepo.findUser(otherUserId);

        if (!otherUser) {
            throw new NotFoundException("User not found");
        }

        const pair = this.getConversationPair(userId, otherUserId);
        const conversation = await this.chatRepo.findConversation(pair.userAId, pair.userBId, limit, before);

        if (conversation) {
            await this.chatRepo.markConversationRead(conversation.id, otherUserId);
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

        const otherUser = await this.chatRepo.findUser(otherUserId, true);

        if (!otherUser) {
            throw new NotFoundException("User not found");
        }

        const pair = this.getConversationPair(userId, otherUserId);
        return this.chatRepo.sendMessage(pair.userAId, pair.userBId, userId, trimmedText);
    }

    private getConversationPair(userId: string, otherUserId: string) {
        const [userAId, userBId] = [userId, otherUserId].sort();

        return { userAId, userBId };
    }

    private async getRelationship(userId: string, otherUserId: string) {
        return this.chatRepo.findRelationship(userId, otherUserId);
    }

    private hasAnyRelationship(relationship: any) {
        return !!(
            relationship.viewerFollowsOther
            || relationship.otherFollowsViewer
            || relationship.viewerSubscribesToOther
            || relationship.otherSubscribesToViewer
        );
    }

}
