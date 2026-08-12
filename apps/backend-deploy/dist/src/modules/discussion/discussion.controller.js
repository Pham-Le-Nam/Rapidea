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
exports.DiscussionController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../auth/jwt.guard");
const discussion_service_1 = require("./discussion.service");
const optional_jwt_guard_1 = require("../auth/optional-jwt.guard");
const add_discussion_dto_1 = require("./discussion-dto/add-discussion.dto");
const update_discussion_dto_1 = require("./discussion-dto/update-discussion.dto");
const post_service_1 = require("../post/post.service");
let DiscussionController = class DiscussionController {
    discussionService;
    postService;
    constructor(discussionService, postService) {
        this.discussionService = discussionService;
        this.postService = postService;
    }
    async assertCanViewPostDiscussions(postId, userId) {
        const post = await this.postService.getPostById(postId);
        if (!post) {
            throw new common_1.NotFoundException("Post not found");
        }
        const canView = !post.courseId
            || post.isPreview
            || (userId && userId === post.userId)
            || (userId && post.course?.subscribers?.some((subscription) => subscription.userId === userId));
        if (!canView) {
            throw new common_1.ForbiddenException("Subscribe to this course to view this post's discussions");
        }
    }
    async getDiscussionById(id, req) {
        const user = req.user;
        const discusssion = await this.discussionService.getDiscussionById(id);
        await this.assertCanViewPostDiscussions(discusssion.postId, user?.userId);
        const isOwner = (user?.userId === discusssion.userId);
        return {
            isOwner,
            discusssion,
        };
    }
    async getDiscussionsById(id, req, startIndex = 0, amount = 5) {
        await this.assertCanViewPostDiscussions(id, req.user?.userId);
        return this.discussionService.getDiscussionsByPostId(id, startIndex, amount);
    }
    async getReplyingDiscussions(id, req, startIndex = 0, amount = 5) {
        const discussion = await this.discussionService.getDiscussionById(id);
        await this.assertCanViewPostDiscussions(discussion.postId, req.user?.userId);
        return this.discussionService.getReplyingDiscussionById(id, startIndex, amount);
    }
    async getChildrenDiscussions(id, req, startIndex = 0, amount = 5) {
        const discussion = await this.discussionService.getDiscussionById(id);
        await this.assertCanViewPostDiscussions(discussion.postId, req.user?.userId);
        return this.discussionService.getChildrenDiscussionById(id, startIndex, amount);
    }
    async addDiscussion(req, addDiscussionDto) {
        const user = req.user;
        const userId = user?.userId;
        if (!userId) {
            throw new common_1.NotFoundException("User not found", "User not found");
        }
        await this.assertCanViewPostDiscussions(addDiscussionDto.postId, userId);
        const discussion = await this.discussionService.createDiscussion(addDiscussionDto.discussion, addDiscussionDto.postId, userId, addDiscussionDto.repliedId);
        return discussion;
    }
    async updateDiscussion(req, updateDiscussionDto) {
        const user = req.user;
        const userId = user?.userId;
        if (!userId) {
            throw new common_1.NotFoundException("User not found", "User not found");
        }
        const discussion = await this.discussionService.updateDiscussionById(updateDiscussionDto.id, userId, updateDiscussionDto.discussion);
        return discussion;
    }
    async deleteDiscussion(req, data) {
        const user = req.user;
        const userId = user?.userId;
        if (!userId) {
            throw new common_1.NotFoundException("User not found", "User not found");
        }
        const discussion = await this.discussionService.deleteDiscussionById(data.id, userId);
        return discussion;
    }
};
exports.DiscussionController = DiscussionController;
__decorate([
    (0, common_1.UseGuards)(optional_jwt_guard_1.OptionalJwtAuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DiscussionController.prototype, "getDiscussionById", null);
__decorate([
    (0, common_1.UseGuards)(optional_jwt_guard_1.OptionalJwtAuthGuard),
    (0, common_1.Get)('post/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Query)('startIndex', common_1.ParseIntPipe)),
    __param(3, (0, common_1.Query)('amount', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], DiscussionController.prototype, "getDiscussionsById", null);
__decorate([
    (0, common_1.UseGuards)(optional_jwt_guard_1.OptionalJwtAuthGuard),
    (0, common_1.Get)('replying/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Query)('startIndex', common_1.ParseIntPipe)),
    __param(3, (0, common_1.Query)('amount', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], DiscussionController.prototype, "getReplyingDiscussions", null);
__decorate([
    (0, common_1.UseGuards)(optional_jwt_guard_1.OptionalJwtAuthGuard),
    (0, common_1.Get)('children/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Query)('startIndex', common_1.ParseIntPipe)),
    __param(3, (0, common_1.Query)('amount', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], DiscussionController.prototype, "getChildrenDiscussions", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_discussion_dto_1.AddDiscussionDto]),
    __metadata("design:returntype", Promise)
], DiscussionController.prototype, "addDiscussion", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_discussion_dto_1.UpdateDiscussionDto]),
    __metadata("design:returntype", Promise)
], DiscussionController.prototype, "updateDiscussion", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DiscussionController.prototype, "deleteDiscussion", null);
exports.DiscussionController = DiscussionController = __decorate([
    (0, common_1.Controller)('api/discussion'),
    __metadata("design:paramtypes", [discussion_service_1.DiscussionService,
        post_service_1.PostService])
], DiscussionController);
//# sourceMappingURL=discussion.controller.js.map