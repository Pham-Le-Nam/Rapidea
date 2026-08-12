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
exports.FollowController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../auth/jwt.guard");
const follow_user_dto_1 = require("./follow-dto/follow-user.dto");
const follow_service_1 = require("./follow.service");
let FollowController = class FollowController {
    followService;
    constructor(followService) {
        this.followService = followService;
    }
    async getFollow(followingId, req) {
        const followerId = req.user?.userId;
        if (!followerId) {
            throw new common_1.NotFoundException("User not found");
        }
        const follow = await this.followService.getFollow(followerId, followingId);
        return {
            isFollowing: !!follow,
            follow,
        };
    }
    async getFollowers(followingId) {
        const followers = await this.followService.getFollowers(followingId);
        return { followers };
    }
    async getFollowings(followerId) {
        const following = await this.followService.getFollowings(followerId);
        return { following };
    }
    async getMutualFollowings(otherFollowerId, req) {
        const followerId = req.user?.userId;
        if (!followerId) {
            throw new common_1.NotFoundException("User not found");
        }
        const mutual = await this.followService.getMutualFollowings(followerId, otherFollowerId);
        return { mutual };
    }
    async followUser(req, followUserDto) {
        const followerId = req.user?.userId;
        if (!followerId) {
            throw new common_1.NotFoundException("User not found");
        }
        return this.followService.followUser(followerId, followUserDto.followingId);
    }
    async unfollowUser(req, followUserDto) {
        const followerId = req.user?.userId;
        if (!followerId) {
            throw new common_1.NotFoundException("User not found");
        }
        return this.followService.unfollowUser(followerId, followUserDto.followingId);
    }
};
exports.FollowController = FollowController;
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':followingId'),
    __param(0, (0, common_1.Param)('followingId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "getFollow", null);
__decorate([
    (0, common_1.Get)(':followingId/followers'),
    __param(0, (0, common_1.Param)('followingId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "getFollowers", null);
__decorate([
    (0, common_1.Get)(':followerId/following'),
    __param(0, (0, common_1.Param)('followerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "getFollowings", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':otherFollowerId/mutual'),
    __param(0, (0, common_1.Param)('otherFollowerId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "getMutualFollowings", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, follow_user_dto_1.FollowUserDto]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "followUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, follow_user_dto_1.FollowUserDto]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "unfollowUser", null);
exports.FollowController = FollowController = __decorate([
    (0, common_1.Controller)('api/follow'),
    __metadata("design:paramtypes", [follow_service_1.FollowService])
], FollowController);
//# sourceMappingURL=follow.controller.js.map