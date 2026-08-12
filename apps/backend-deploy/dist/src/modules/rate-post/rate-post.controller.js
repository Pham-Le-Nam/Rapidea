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
exports.RatePostController = void 0;
const common_1 = require("@nestjs/common");
const rate_post_service_1 = require("./rate-post.service");
const jwt_guard_1 = require("../auth/jwt.guard");
const add_rate_post_dto_1 = require("./rate-post-dto/add-rate-post.dto");
const update_rate_post_dto_1 = require("./rate-post-dto/update-rate-post.dto");
let RatePostController = class RatePostController {
    ratePostService;
    constructor(ratePostService) {
        this.ratePostService = ratePostService;
    }
    async getRating(id, req) {
        const user = req.user;
        const userId = user?.userId;
        if (!userId) {
            throw new common_1.NotFoundException("User not found", "User not found");
        }
        const ratePost = await this.ratePostService.findRatePost(id, userId);
        const isRated = !!ratePost;
        if (isRated) {
            return {
                isRated,
                ratePost,
            };
        }
        return {
            isRated,
        };
    }
    async getRatingByPostId(id) {
        const ratePosts = await this.ratePostService.findRatePostByPostId(id);
        if (!ratePosts) {
            return [];
        }
        return ratePosts;
    }
    async getRatingByUserId(id) {
        const ratePosts = await this.ratePostService.findRatePostByUserId(id);
        if (!ratePosts) {
            return [];
        }
        return ratePosts;
    }
    async ratePost(req, addRatePostDto) {
        const user = req.user;
        const userId = user?.userId;
        if (!userId) {
            throw new common_1.NotFoundException("User not found", "User not found");
        }
        const ratePost = await this.ratePostService.createRatePost(addRatePostDto.postId, userId, addRatePostDto.rating);
        if (!ratePost) {
            throw new common_1.InternalServerErrorException("Couldn't rate the post", "Couldn't rate the post");
        }
        return ratePost;
    }
    async updateRateById(id, req, data) {
        const user = req.user;
        const userId = user?.userId;
        if (!userId) {
            throw new common_1.NotFoundException("User not found", "User not found");
        }
        const ratePost = await this.ratePostService.updateRatePostById(id, userId, data.rating);
        if (!ratePost) {
            throw new common_1.InternalServerErrorException("Couldn't re-rate the post", "Couldn't re-rate the post");
        }
        return ratePost;
    }
    async updateRatePost(req, updateRatePostDto) {
        const user = req.user;
        const userId = user?.userId;
        if (!userId) {
            throw new common_1.NotFoundException("User not found", "User not found");
        }
        const ratePost = await this.ratePostService.updateRatePostByPostId(updateRatePostDto.postId, userId, updateRatePostDto.rating);
        if (!ratePost) {
            throw new common_1.InternalServerErrorException("Couldn't re-rate the post", "Couldn't re-rate the post");
        }
        return ratePost;
    }
};
exports.RatePostController = RatePostController;
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RatePostController.prototype, "getRating", null);
__decorate([
    (0, common_1.Get)('post/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RatePostController.prototype, "getRatingByPostId", null);
__decorate([
    (0, common_1.Get)('user/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RatePostController.prototype, "getRatingByUserId", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_rate_post_dto_1.AddRatePostDto]),
    __metadata("design:returntype", Promise)
], RatePostController.prototype, "ratePost", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], RatePostController.prototype, "updateRateById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_rate_post_dto_1.UpdateRatePostDto]),
    __metadata("design:returntype", Promise)
], RatePostController.prototype, "updateRatePost", null);
exports.RatePostController = RatePostController = __decorate([
    (0, common_1.Controller)('api/rate-post'),
    __metadata("design:paramtypes", [rate_post_service_1.RatePostService])
], RatePostController);
//# sourceMappingURL=rate-post.controller.js.map