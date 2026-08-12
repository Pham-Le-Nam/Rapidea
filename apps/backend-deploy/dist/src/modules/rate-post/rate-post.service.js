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
exports.RatePostService = void 0;
const common_1 = require("@nestjs/common");
const notification_service_1 = require("../notification/notification.service");
const enums_1 = require("../../../generated/prisma/enums");
let RatePostService = class RatePostService {
    ratePostRepo;
    notificationService;
    constructor(ratePostRepo, notificationService) {
        this.ratePostRepo = ratePostRepo;
        this.notificationService = notificationService;
    }
    async createRatePost(postId, userId, rating) {
        if (rating < 0 || rating > 5) {
            throw new common_1.InternalServerErrorException("Invalid rating it must be from 0 to 5", "Invalid rating");
        }
        await this.assertCanRatePost(postId, userId);
        const ratePost = await this.ratePostRepo.create(postId, userId, rating);
        if (!ratePost) {
            throw new common_1.InternalServerErrorException("Couldn't rate this post", "Couldn't rate this post");
        }
        const post = await this.ratePostRepo.findPostSummary(postId);
        if (post) {
            await this.notificationService.createNotification({
                userId: post.userId,
                actorId: userId,
                type: enums_1.NotificationType.POST_RATE,
                title: 'New post rating',
                message: post.title || `${rating} star rating`,
                link: `/post/${postId}`,
            });
        }
        return ratePost;
    }
    async updateRatePostById(id, userId, rating) {
        if (rating < 0 || rating > 5) {
            throw new common_1.InternalServerErrorException("Invalid rating it must be from 0 to 5", "Invalid rating");
        }
        const existingRating = await this.ratePostRepo.findOwnedRating(id, userId);
        if (!existingRating) {
            throw new common_1.NotFoundException("Post rating not found", "Post rating not found");
        }
        await this.assertCanRatePost(existingRating.postId, userId);
        const ratePost = await this.ratePostRepo.updateById(id, userId, rating);
        if (!ratePost) {
            throw new common_1.InternalServerErrorException("Couldn't re-rate this post", "Couldn't re-rate this post");
        }
        return ratePost;
    }
    async updateRatePostByPostId(postId, userId, rating) {
        if (rating < 0 || rating > 5) {
            throw new common_1.InternalServerErrorException("Invalid rating it must be from 0 to 5", "Invalid rating");
        }
        await this.assertCanRatePost(postId, userId);
        const ratePost = await this.ratePostRepo.updateByPostId(postId, userId, rating);
        if (!ratePost) {
            throw new common_1.InternalServerErrorException("Couldn't re-rate this post", "Couldn't re-rate this post");
        }
        return ratePost;
    }
    async findRatePost(postId, userId) {
        return this.ratePostRepo.findRating(postId, userId);
    }
    async findRatePostByPostId(postId) {
        const ratePosts = await this.ratePostRepo.findByPostId(postId);
        if (!ratePosts) {
            throw new common_1.InternalServerErrorException("Post ratings not found", "Post ratings not found");
        }
        return ratePosts;
    }
    async findRatePostByUserId(userId) {
        const ratePosts = await this.ratePostRepo.findByUserId(userId);
        if (!ratePosts) {
            throw new common_1.InternalServerErrorException("User's Post ratings not found", "User's Post ratings not found");
        }
        return ratePosts;
    }
    async assertCanRatePost(postId, userId) {
        const post = await this.ratePostRepo.findPostAccess(postId, userId);
        if (!post) {
            throw new common_1.NotFoundException("Post not found", "Post not found");
        }
        const canRate = !post.courseId
            || post.isPreview
            || post.userId === userId
            || post.course?.userId === userId
            || (post.course?.subscribers?.length ?? 0) > 0;
        if (!canRate) {
            throw new common_1.ForbiddenException("Subscribe to this course before rating this post");
        }
    }
};
exports.RatePostService = RatePostService;
exports.RatePostService = RatePostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("RATE_POST_REPOSITORY")),
    __metadata("design:paramtypes", [Object, notification_service_1.NotificationService])
], RatePostService);
//# sourceMappingURL=rate-post.service.js.map