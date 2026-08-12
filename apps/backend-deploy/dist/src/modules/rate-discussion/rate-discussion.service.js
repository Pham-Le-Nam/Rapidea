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
exports.RateDiscussionService = void 0;
const common_1 = require("@nestjs/common");
let RateDiscussionService = class RateDiscussionService {
    rateDiscussionRepo;
    constructor(rateDiscussionRepo) {
        this.rateDiscussionRepo = rateDiscussionRepo;
    }
    async createRateDiscussion(discussionId, userId, rating) {
        this.validateRating(rating);
        const rateDiscussion = await this.rateDiscussionRepo.create(discussionId, userId, rating);
        if (!rateDiscussion) {
            throw new common_1.InternalServerErrorException("Couldn't rate this discussion", "Couldn't rate this discussion");
        }
        return rateDiscussion;
    }
    async updateRateDiscussionById(id, userId, rating) {
        this.validateRating(rating);
        const rateDiscussion = await this.rateDiscussionRepo.updateById(id, userId, rating);
        if (!rateDiscussion) {
            throw new common_1.InternalServerErrorException("Couldn't re-rate this discussion", "Couldn't re-rate this discussion");
        }
        return rateDiscussion;
    }
    async updateRateDiscussionByDiscussionId(discussionId, userId, rating) {
        this.validateRating(rating);
        const rateDiscussion = await this.rateDiscussionRepo.updateByDiscussionId(discussionId, userId, rating);
        if (!rateDiscussion) {
            throw new common_1.InternalServerErrorException("Couldn't re-rate this discussion", "Couldn't re-rate this discussion");
        }
        return rateDiscussion;
    }
    async findRateDiscussion(discussionId, userId) {
        return this.rateDiscussionRepo.findRating(discussionId, userId);
    }
    validateRating(rating) {
        if (rating < 0 || rating > 5) {
            throw new common_1.InternalServerErrorException("Invalid rating it must be from 0 to 5", "Invalid rating");
        }
    }
};
exports.RateDiscussionService = RateDiscussionService;
exports.RateDiscussionService = RateDiscussionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("RATE_DISCUSSION_REPOSITORY")),
    __metadata("design:paramtypes", [Object])
], RateDiscussionService);
//# sourceMappingURL=rate-discussion.service.js.map