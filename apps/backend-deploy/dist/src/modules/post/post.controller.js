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
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const post_service_1 = require("./post.service");
const add_post_dto_1 = require("./post-dto/add-post.dto");
const jwt_guard_1 = require("../auth/jwt.guard");
const optional_jwt_guard_1 = require("../auth/optional-jwt.guard");
const course_service_1 = require("../course/course.service");
const users_service_1 = require("../users/users.service");
let PostController = class PostController {
    postService;
    courseService;
    usersService;
    constructor(postService, courseService, usersService) {
        this.postService = postService;
        this.courseService = courseService;
        this.usersService = usersService;
    }
    async getHomepageFeed(req, offset, limit) {
        const pagination = this.getPagination(offset, limit);
        const posts = await this.postService.getRecommendedFeed(req.user?.userId, {
            offset: pagination.offset,
            limit: pagination.limit + 1,
        });
        return {
            posts: posts.slice(0, pagination.limit),
            hasMore: posts.length > pagination.limit,
        };
    }
    async createPost(req, addPostDto) {
        const user = req.user;
        const post = await this.postService.createPost(user.userId, addPostDto.title, addPostDto.content, addPostDto.courseId, addPostDto.isPreview, addPostDto.tags);
        return post;
    }
    async deletePost(req, data) {
        const user = req.user;
        const post = await this.postService.deletePostById(data.postId, user.userId);
        return post;
    }
    async getPostsByUsername(req, username, offset, limit, courseId, nonCourseOnly, previewMode, orderBy, order) {
        const viewer = req.user;
        const user = await this.usersService.getUserByUsername(username);
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        const pagination = this.getPagination(offset, limit);
        const posts = await this.postService.getPostsByUserId(user.id, {
            offset: pagination.offset,
            limit: pagination.limit + 1,
            courseId,
            nonCourseOnly: nonCourseOnly === 'true',
            previewMode,
            orderBy,
            order,
        });
        return {
            posts: posts.slice(0, pagination.limit),
            hasMore: posts.length > pagination.limit,
            isOwner: viewer ? viewer.userId === user.id : false,
        };
    }
    async updatePost(req, data) {
        const user = req.user;
        const post = await this.postService.updatePostById(data.postId, user.userId, data.title, data.content, data.isPreview, data.courseId, data.tags);
        return post;
    }
    async generatePostField(req, data) {
        if (data.target !== 'title' && data.target !== 'details') {
            throw new common_1.NotFoundException('Unknown post field');
        }
        return this.postService.generatePostField(req.user.userId, data.target, data);
    }
    async getPostsByCourseId(req, courseId, previewOnly, orderBy, order, offset, limit) {
        const user = req.user;
        const course = await this.courseService.getCourseById(courseId);
        if (!course) {
            throw new common_1.NotFoundException("Course not found");
        }
        const canViewAllPosts = user?.role === 'ADMIN'
            || await this.postService.canViewAllCoursePosts(courseId, user?.userId);
        const pagination = this.getPagination(offset, limit);
        const posts = await this.postService.getPostsByCourseId(courseId, user?.userId, {
            previewOnly: previewOnly === 'true',
            orderBy,
            order,
            offset: pagination.offset,
            limit: pagination.limit + 1,
        });
        return {
            posts: posts.slice(0, pagination.limit),
            hasMore: posts.length > pagination.limit,
            isOwner: user ? course.userId === user.userId : false,
            canViewAllPosts,
        };
    }
    async getPost(req, id) {
        const user = req.user;
        const post = await this.postService.getPostById(id);
        if (!post) {
            throw new common_1.NotFoundException("Post not found");
        }
        const canViewPost = !post.courseId
            || post.isPreview
            || user?.role === 'ADMIN'
            || (user?.userId && user.userId === post.userId)
            || (user?.userId && post.course?.subscribers?.some((subscription) => subscription.userId === user.userId));
        if (user?.userId && user.userId !== post.userId) {
            await this.postService.recordPostView(id, user.userId);
        }
        const { course: _course, ...safePost } = post;
        return {
            post: safePost,
            isOwner: user ? (user.userId === post.userId) : false,
            canViewPost,
        };
    }
    getPagination(offset, limit) {
        const parsedOffset = Number(offset);
        const parsedLimit = Number(limit);
        return {
            offset: Number.isInteger(parsedOffset) && parsedOffset > 0 ? parsedOffset : 0,
            limit: Number.isInteger(parsedLimit) && parsedLimit > 0 ? Math.min(parsedLimit, 50) : 5,
        };
    }
};
exports.PostController = PostController;
__decorate([
    (0, common_1.UseGuards)(optional_jwt_guard_1.OptionalJwtAuthGuard),
    (0, common_1.Get)('homepage-feed'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('offset')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getHomepageFeed", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_post_dto_1.AddPostDto]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "createPost", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "deletePost", null);
__decorate([
    (0, common_1.UseGuards)(optional_jwt_guard_1.OptionalJwtAuthGuard),
    (0, common_1.Get)('user/:username'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('username')),
    __param(2, (0, common_1.Query)('offset')),
    __param(3, (0, common_1.Query)('limit')),
    __param(4, (0, common_1.Query)('courseId')),
    __param(5, (0, common_1.Query)('nonCourseOnly')),
    __param(6, (0, common_1.Query)('previewMode')),
    __param(7, (0, common_1.Query)('orderBy')),
    __param(8, (0, common_1.Query)('order')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPostsByUsername", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "updatePost", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('generate'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "generatePostField", null);
__decorate([
    (0, common_1.UseGuards)(optional_jwt_guard_1.OptionalJwtAuthGuard),
    (0, common_1.Get)('course/:courseId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('courseId')),
    __param(2, (0, common_1.Query)('previewOnly')),
    __param(3, (0, common_1.Query)('orderBy')),
    __param(4, (0, common_1.Query)('order')),
    __param(5, (0, common_1.Query)('offset')),
    __param(6, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPostsByCourseId", null);
__decorate([
    (0, common_1.UseGuards)(optional_jwt_guard_1.OptionalJwtAuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPost", null);
exports.PostController = PostController = __decorate([
    (0, common_1.Controller)('api/post'),
    __metadata("design:paramtypes", [post_service_1.PostService,
        course_service_1.CourseService,
        users_service_1.UsersService])
], PostController);
//# sourceMappingURL=post.controller.js.map