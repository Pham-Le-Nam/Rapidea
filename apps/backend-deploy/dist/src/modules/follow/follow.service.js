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
exports.FollowService = void 0;
const common_1 = require("@nestjs/common");
const notification_service_1 = require("../notification/notification.service");
let FollowService = class FollowService {
    followRepo;
    notificationService;
    constructor(followRepo, notificationService) {
        this.followRepo = followRepo;
        this.notificationService = notificationService;
    }
    async followUser(followerId, followingId) {
        if (!followingId) {
            throw new common_1.BadRequestException("Following user id is required");
        }
        const follow = await this.followRepo.create(followerId, followingId);
        await this.notificationService.notifyFollow(followerId, followingId);
        return follow;
    }
    async unfollowUser(followerId, followingId) {
        if (!followingId) {
            throw new common_1.BadRequestException("Following user id is required");
        }
        return this.followRepo.delete(followerId, followingId);
    }
    async getFollow(followerId, followingId) {
        if (!followingId) {
            throw new common_1.BadRequestException("Following user id is required");
        }
        return this.followRepo.findFollow(followerId, followingId);
    }
    async getFollowers(followingId) {
        if (!followingId) {
            throw new common_1.BadRequestException("Following user id is required");
        }
        return this.followRepo.findFollowers(followingId);
    }
    async getFollowings(followerId) {
        if (!followerId) {
            throw new common_1.BadRequestException("Follower user id is required");
        }
        return this.followRepo.findFollowings(followerId);
    }
    async getMutualFollowings(followerId, otherFollowerId) {
        if (!otherFollowerId) {
            throw new common_1.BadRequestException("Other user id is required");
        }
        return this.followRepo.findMutualFollowings(followerId, otherFollowerId);
    }
};
exports.FollowService = FollowService;
exports.FollowService = FollowService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('FOLLOW_REPOSITORY')),
    __metadata("design:paramtypes", [Object, notification_service_1.NotificationService])
], FollowService);
//# sourceMappingURL=follow.service.js.map