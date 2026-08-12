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
exports.SubscribeController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../auth/jwt.guard");
const review_subscription_dto_1 = require("./subscribe-dto/review-subscription.dto");
const subscribe_course_dto_1 = require("./subscribe-dto/subscribe-course.dto");
const subscribe_service_1 = require("./subscribe.service");
let SubscribeController = class SubscribeController {
    subscribeService;
    constructor(subscribeService) {
        this.subscribeService = subscribeService;
    }
    async getMySubscribedCourses(req) {
        const userId = req.user?.userId;
        if (!userId) {
            throw new common_1.NotFoundException("User not found", "User not found");
        }
        return this.subscribeService.getSubscribedCourses(userId);
    }
    async getCourseSubscribers(courseId) {
        return this.subscribeService.getSubscribers(courseId);
    }
    async getCourseReviews(courseId) {
        return this.subscribeService.getCourseReviews(courseId);
    }
    async getSubscription(courseId, req) {
        const userId = req.user?.userId;
        if (!userId) {
            throw new common_1.NotFoundException("User not found", "User not found");
        }
        const subscription = await this.subscribeService.getSubscription(courseId, userId);
        return {
            isSubscribed: !!subscription,
            subscription,
        };
    }
    async subscribeCourse(req, subscribeCourseDto) {
        const userId = req.user?.userId;
        if (!userId) {
            throw new common_1.NotFoundException("User not found", "User not found");
        }
        return this.subscribeService.subscribeCourse(subscribeCourseDto.courseId, userId);
    }
    async createCheckout(req, dto) {
        return this.subscribeService.createCheckoutSession(dto.courseId, req.user.userId);
    }
    async confirmCheckout(req, body) {
        return this.subscribeService.confirmCheckoutSession(body.sessionId, req.user.userId);
    }
    async unsubscribeCourse(req, subscribeCourseDto) {
        const userId = req.user?.userId;
        if (!userId) {
            throw new common_1.NotFoundException("User not found", "User not found");
        }
        return this.subscribeService.unsubscribeCourse(subscribeCourseDto.courseId, userId);
    }
    async reviewCourse(req, reviewSubscriptionDto) {
        const userId = req.user?.userId;
        if (!userId) {
            throw new common_1.NotFoundException("User not found", "User not found");
        }
        return this.subscribeService.reviewCourse(reviewSubscriptionDto.courseId, userId, reviewSubscriptionDto.review, reviewSubscriptionDto.rating);
    }
};
exports.SubscribeController = SubscribeController;
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)('me/courses'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubscribeController.prototype, "getMySubscribedCourses", null);
__decorate([
    (0, common_1.Get)('course/:courseId/subscribers'),
    __param(0, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubscribeController.prototype, "getCourseSubscribers", null);
__decorate([
    (0, common_1.Get)('course/:courseId/reviews'),
    __param(0, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubscribeController.prototype, "getCourseReviews", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':courseId'),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SubscribeController.prototype, "getSubscription", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, subscribe_course_dto_1.SubscribeCourseDto]),
    __metadata("design:returntype", Promise)
], SubscribeController.prototype, "subscribeCourse", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('checkout'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, subscribe_course_dto_1.SubscribeCourseDto]),
    __metadata("design:returntype", Promise)
], SubscribeController.prototype, "createCheckout", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('checkout/confirm'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SubscribeController.prototype, "confirmCheckout", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, subscribe_course_dto_1.SubscribeCourseDto]),
    __metadata("design:returntype", Promise)
], SubscribeController.prototype, "unsubscribeCourse", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('review'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, review_subscription_dto_1.ReviewSubscriptionDto]),
    __metadata("design:returntype", Promise)
], SubscribeController.prototype, "reviewCourse", null);
exports.SubscribeController = SubscribeController = __decorate([
    (0, common_1.Controller)('api/subscribe'),
    __metadata("design:paramtypes", [subscribe_service_1.SubscribeService])
], SubscribeController);
//# sourceMappingURL=subscribe.controller.js.map