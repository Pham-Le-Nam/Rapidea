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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../../../generated/prisma/enums");
let NotificationService = class NotificationService {
    notificationRepo;
    constructor(notificationRepo) {
        this.notificationRepo = notificationRepo;
    }
    async createNotification(input) {
        if (!input.userId || input.userId === input.actorId) {
            return null;
        }
        return this.notificationRepo.create(input);
    }
    async notifyFollow(followerId, followingId) {
        const follower = await this.notificationRepo.findUserName(followerId);
        const followerName = [follower?.firstname, follower?.middlename, follower?.lastname].filter(Boolean).join(' ') || follower?.username || 'Someone';
        return this.createNotification({
            userId: followingId,
            actorId: followerId,
            type: enums_1.NotificationType.FOLLOW,
            title: 'New follower',
            message: `${followerName} followed you`,
            link: follower?.username ? `/profile/${follower.username}` : undefined,
        });
    }
    async createManyNotifications(inputs) {
        const uniqueNotifications = new Map();
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
    async notifyFollowersAndSubscribersOfNewCourse(actorId, courseId, courseTitle) {
        const recipients = await this.getFollowersAndSubscribers(actorId);
        const actorName = await this.getUserName(actorId);
        return this.createManyNotifications(recipients.map((recipient) => ({
            userId: recipient.userId,
            actorId,
            type: recipient.kind === 'subscriber'
                ? enums_1.NotificationType.SUBSCRIBED_CREATOR_NEW_COURSE
                : enums_1.NotificationType.FOLLOWING_NEW_COURSE,
            title: `${actorName} created a new course`,
            message: courseTitle,
            link: `/course/${courseId}`,
        })));
    }
    async notifyFollowersAndSubscribersOfNewPost(actorId, postId, postTitle) {
        const recipients = await this.getFollowersAndSubscribers(actorId);
        const actorName = await this.getUserName(actorId);
        return this.createManyNotifications(recipients.map((recipient) => ({
            userId: recipient.userId,
            actorId,
            type: recipient.kind === 'subscriber'
                ? enums_1.NotificationType.SUBSCRIBED_CREATOR_NEW_POST
                : enums_1.NotificationType.FOLLOWING_NEW_POST,
            title: `${actorName} created a new post`,
            message: postTitle || 'Untitled post',
            link: `/post/${postId}`,
        })));
    }
    async notifyAdminsOfModerationAlert(actorId, fileId, fileName, message) {
        const admins = await this.notificationRepo.findAdminIds();
        return this.createManyNotifications(admins.map((admin) => ({
            userId: admin.id,
            actorId,
            type: enums_1.NotificationType.MODERATION_ALERT,
            title: 'Serious upload warning',
            message: `${fileName}: ${message}`,
            link: `/admin/moderation?file=${encodeURIComponent(fileId)}`,
        })));
    }
    async getNotifications(userId, limit = 20, offset = 0) {
        return this.notificationRepo.findFeed(userId, limit, offset);
    }
    async markAsRead(userId, notificationId) {
        return this.notificationRepo.markAsRead(userId, notificationId);
    }
    async markAllAsRead(userId) {
        return this.notificationRepo.markAllAsRead(userId);
    }
    async getFollowersAndSubscribers(userId) {
        const { followers, subscribers } = await this.notificationRepo.findFollowersAndSubscribers(userId);
        const recipients = new Map();
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
    async getUserName(userId) {
        const user = await this.notificationRepo.findUserName(userId);
        return [user?.firstname, user?.middlename, user?.lastname].filter(Boolean).join(' ') || user?.username || 'Someone';
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('NOTIFICATION_REPOSITORY')),
    __metadata("design:paramtypes", [Object])
], NotificationService);
//# sourceMappingURL=notification.service.js.map