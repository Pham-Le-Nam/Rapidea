"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
let ChatService = class ChatService {
    chatRepo;
    constructor(chatRepo) {
        this.chatRepo = chatRepo;
    }
    async getRecentConversations(userId, onlyRelated = true) {
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
    async getConversation(userId, otherUserId, limit = 10, before) {
        if (userId === otherUserId) {
            throw new common_1.BadRequestException("You cannot chat with yourself");
        }
        const otherUser = await this.chatRepo.findUser(otherUserId);
        if (!otherUser) {
            throw new common_1.NotFoundException("User not found");
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
    async sendMessage(userId, otherUserId, text) {
        const trimmedText = text.trim();
        if (userId === otherUserId) {
            throw new common_1.BadRequestException("You cannot chat with yourself");
        }
        if (!trimmedText) {
            throw new common_1.BadRequestException("Message cannot be empty");
        }
        if (trimmedText.length > 2000) {
            throw new common_1.BadRequestException("Message is too long");
        }
        const otherUser = await this.chatRepo.findUser(otherUserId, true);
        if (!otherUser) {
            throw new common_1.NotFoundException("User not found");
        }
        const pair = this.getConversationPair(userId, otherUserId);
        return this.chatRepo.sendMessage(pair.userAId, pair.userBId, userId, trimmedText);
    }
    getConversationPair(userId, otherUserId) {
        const [userAId, userBId] = [userId, otherUserId].sort();
        return { userAId, userBId };
    }
    async getRelationship(userId, otherUserId) {
        return this.chatRepo.findRelationship(userId, otherUserId);
    }
    hasAnyRelationship(relationship) {
        return !!(relationship.viewerFollowsOther
            || relationship.otherFollowsViewer
            || relationship.viewerSubscribesToOther
            || relationship.otherSubscribesToViewer);
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('CHAT_REPOSITORY')),
    __metadata("design:paramtypes", [Object])
], ChatService);
//# sourceMappingURL=chat.service.js.map