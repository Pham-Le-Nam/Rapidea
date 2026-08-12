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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaChatRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const userSelect = { id: true, firstname: true, lastname: true, middlename: true, username: true, avatar: true, headline: true };
let PrismaChatRepository = class PrismaChatRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findRecentConversations(userId) {
        return this.prisma.chatConversation.findMany({ where: { OR: [{ userAId: userId }, { userBId: userId }] }, include: { userA: { select: userSelect }, userB: { select: userSelect }, messages: { orderBy: { createdAt: 'desc' }, take: 1 } }, orderBy: [{ lastMessageAt: 'desc' }, { id: 'asc' }], take: 50 });
    }
    countUnread(conversationId, userId) { return this.prisma.chatMessage.count({ where: { conversationId, senderId: { not: userId }, readAt: null } }); }
    findUser(userId, summaryOnly = false) { return this.prisma.users.findUnique({ where: { id: userId }, select: summaryOnly ? { id: true } : userSelect }); }
    findConversation(userAId, userBId, limit, before) {
        return this.prisma.chatConversation.findUnique({ where: { userAId_userBId: { userAId, userBId } }, include: { messages: { where: before ? { createdAt: { lt: before } } : undefined, orderBy: { createdAt: 'desc' }, take: Math.min(Math.max(limit, 1), 100) } } });
    }
    markConversationRead(conversationId, senderId) { return this.prisma.chatMessage.updateMany({ where: { conversationId, senderId, readAt: null }, data: { readAt: new Date() } }); }
    sendMessage(userAId, userBId, senderId, text) {
        const now = new Date();
        return this.prisma.$transaction(async (tx) => {
            const conversation = await tx.chatConversation.upsert({ where: { userAId_userBId: { userAId, userBId } }, update: { lastMessageAt: now }, create: { userAId, userBId, lastMessageAt: now, updatedAt: now } });
            const message = await tx.chatMessage.create({ data: { conversationId: conversation.id, senderId, text, createdAt: now } });
            return { conversationId: conversation.id, message };
        });
    }
    async findRelationship(userId, otherUserId) {
        const [viewerFollowsOther, otherFollowsViewer, viewerSubscribesToOther, otherSubscribesToViewer] = await Promise.all([
            this.prisma.follow.findUnique({ where: { followerId_followingId: { followerId: userId, followingId: otherUserId } } }),
            this.prisma.follow.findUnique({ where: { followerId_followingId: { followerId: otherUserId, followingId: userId } } }),
            this.prisma.subscribe.findFirst({ where: { userId, course: { userId: otherUserId } }, select: { id: true } }),
            this.prisma.subscribe.findFirst({ where: { userId: otherUserId, course: { userId } }, select: { id: true } }),
        ]);
        return { viewerFollowsOther: !!viewerFollowsOther, otherFollowsViewer: !!otherFollowsViewer, viewerSubscribesToOther: !!viewerSubscribesToOther, otherSubscribesToViewer: !!otherSubscribesToViewer, isFollower: !!otherFollowsViewer, isFollowing: !!viewerFollowsOther, isSubscriber: !!otherSubscribesToViewer, isSubscribed: !!viewerSubscribesToOther };
    }
};
exports.PrismaChatRepository = PrismaChatRepository;
exports.PrismaChatRepository = PrismaChatRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaChatRepository);
//# sourceMappingURL=prisma-chat.repository.js.map