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
exports.RateDiscussionController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../auth/jwt.guard");
const rate_discussion_service_1 = require("./rate-discussion.service");
const add_rate_discussion_dto_1 = require("./rate-discussion-dto/add-rate-discussion.dto");
const update_rate_discussion_dto_1 = require("./rate-discussion-dto/update-rate-discussion.dto");
let RateDiscussionController = class RateDiscussionController {
    rateDiscussionService;
    constructor(rateDiscussionService) {
        this.rateDiscussionService = rateDiscussionService;
    }
    async getRating(id, req) {
        const user = req.user;
        const userId = user?.userId;
        if (!userId) {
            throw new common_1.NotFoundException("User not found", "User not found");
        }
        const rateDiscussion = await this.rateDiscussionService.findRateDiscussion(id, userId);
        const isRated = !!rateDiscussion;
        if (isRated) {
            return {
                isRated,
                rateDiscussion,
            };
        }
        return {
            isRated,
        };
    }
    async rateDiscussion(req, addRateDiscussionDto) {
        const user = req.user;
        const userId = user?.userId;
        if (!userId) {
            throw new common_1.NotFoundException("User not found", "User not found");
        }
        const rateDiscussion = await this.rateDiscussionService.createRateDiscussion(addRateDiscussionDto.discussionId, userId, addRateDiscussionDto.rating);
        if (!rateDiscussion) {
            throw new common_1.InternalServerErrorException("Couldn't rate the discussion", "Couldn't rate the discussion");
        }
        return rateDiscussion;
    }
    async updateRateById(id, req, data) {
        const user = req.user;
        const userId = user?.userId;
        if (!userId) {
            throw new common_1.NotFoundException("User not found", "User not found");
        }
        const rateDiscussion = await this.rateDiscussionService.updateRateDiscussionById(id, userId, data.rating);
        if (!rateDiscussion) {
            throw new common_1.InternalServerErrorException("Couldn't re-rate the discussion", "Couldn't re-rate the discussion");
        }
        return rateDiscussion;
    }
    async updateRateDiscussion(req, updateRateDiscussionDto) {
        const user = req.user;
        const userId = user?.userId;
        if (!userId) {
            throw new common_1.NotFoundException("User not found", "User not found");
        }
        const rateDiscussion = await this.rateDiscussionService.updateRateDiscussionByDiscussionId(updateRateDiscussionDto.discussionId, userId, updateRateDiscussionDto.rating);
        if (!rateDiscussion) {
            throw new common_1.InternalServerErrorException("Couldn't re-rate the discussion", "Couldn't re-rate the discussion");
        }
        return rateDiscussion;
    }
};
exports.RateDiscussionController = RateDiscussionController;
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RateDiscussionController.prototype, "getRating", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_rate_discussion_dto_1.AddRateDiscussionDto]),
    __metadata("design:returntype", Promise)
], RateDiscussionController.prototype, "rateDiscussion", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], RateDiscussionController.prototype, "updateRateById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_rate_discussion_dto_1.UpdateRateDiscussionDto]),
    __metadata("design:returntype", Promise)
], RateDiscussionController.prototype, "updateRateDiscussion", null);
exports.RateDiscussionController = RateDiscussionController = __decorate([
    (0, common_1.Controller)('api/rate-discussion'),
    __metadata("design:paramtypes", [rate_discussion_service_1.RateDiscussionService])
], RateDiscussionController);
//# sourceMappingURL=rate-discussion.controller.js.map