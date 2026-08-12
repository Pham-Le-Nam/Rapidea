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
exports.DiscussionService = void 0;
const common_1 = require("@nestjs/common");
const notification_service_1 = require("../notification/notification.service");
const enums_1 = require("../../../generated/prisma/enums");
let DiscussionService = class DiscussionService {
    discussionRepo;
    notificationService;
    constructor(discussionRepo, notificationService) {
        this.discussionRepo = discussionRepo;
        this.notificationService = notificationService;
    }
    async createDiscussion(discussion, postId, userId, repliedId) {
        let postDiscussion;
        if (!repliedId) {
            postDiscussion = await this.discussionRepo.create(discussion, postId, userId);
        }
        else {
            const repliedDiscussion = await this.discussionRepo.findById(repliedId);
            if (!repliedDiscussion) {
                throw new common_1.NotFoundException("Replied discussion not found");
            }
            const parentId = repliedDiscussion.parentId ?? repliedDiscussion.id;
            postDiscussion = await this.discussionRepo.create(discussion, postId, userId, parentId, repliedId);
        }
        if (!postDiscussion) {
            throw new common_1.InternalServerErrorException("Couldn't create discussion", "Couldn't create discussion");
        }
        const post = await this.discussionRepo.findPostSummary(postId);
        if (post) {
            await this.notificationService.createNotification({
                userId: post.userId,
                actorId: userId,
                type: enums_1.NotificationType.POST_DISCUSSION,
                title: 'New post discussion',
                message: post.title || 'Untitled post',
                link: `/post/${postId}`,
            });
        }
        return postDiscussion;
    }
    async updateDiscussionById(id, userId, discussion) {
        const postDiscussion = await this.discussionRepo.updateById(id, userId, discussion);
        if (!postDiscussion) {
            throw new common_1.InternalServerErrorException("Couldn't update discussion", "Couldn't update discussion");
        }
        return postDiscussion;
    }
    async deleteDiscussionById(id, userId) {
        const postDiscussion = await this.discussionRepo.deleteById(id, userId);
        if (!postDiscussion) {
            throw new common_1.InternalServerErrorException("Couldn't delete discussion", "Couldn't delete discussion");
        }
        return postDiscussion;
    }
    async getDiscussionById(id) {
        const postDiscussion = await this.discussionRepo.findById(id);
        if (!postDiscussion) {
            throw new common_1.NotFoundException("Discussion not found", "Discussion not found");
        }
        return postDiscussion;
    }
    async getDiscussionsByPostId(postId, startIndex, amount) {
        const postDiscussions = await this.discussionRepo.findByPostId(postId, startIndex, amount);
        if (!postDiscussions) {
            throw new common_1.NotFoundException("Discussions not found", "Discussions not found");
        }
        return postDiscussions;
    }
    async getReplyingDiscussionById(id, startIndex, amount) {
        const replyingDiscussions = await this.discussionRepo.findReplyingById(id, startIndex, amount);
        if (!replyingDiscussions) {
            throw new common_1.NotFoundException("Discussions not found", "Discussions not found");
        }
        return replyingDiscussions;
    }
    async getChildrenDiscussionById(id, startIndex, amount) {
        const childrenDiscussions = await this.discussionRepo.findChildrenById(id, startIndex, amount);
        if (!childrenDiscussions) {
            throw new common_1.NotFoundException("Discussions not found", "Discussions not found");
        }
        return childrenDiscussions;
    }
};
exports.DiscussionService = DiscussionService;
exports.DiscussionService = DiscussionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('DISCUSSION_REPOSITORY')),
    __metadata("design:paramtypes", [Object, notification_service_1.NotificationService])
], DiscussionService);
//# sourceMappingURL=discussion.service.js.map