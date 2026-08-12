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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscribeService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const stripe_1 = __importDefault(require("stripe"));
const notification_service_1 = require("../notification/notification.service");
const enums_1 = require("../../../generated/prisma/enums");
let SubscribeService = class SubscribeService {
    subscribeRepo;
    notificationService;
    config;
    constructor(subscribeRepo, notificationService, config) {
        this.subscribeRepo = subscribeRepo;
        this.notificationService = notificationService;
        this.config = config;
    }
    async subscribeCourse(courseId, userId) {
        if (!courseId) {
            throw new common_1.BadRequestException("Course id is required");
        }
        const coursePrice = await this.subscribeRepo.getCoursePrice(courseId);
        if (!coursePrice)
            throw new common_1.BadRequestException('Course not found');
        if (coursePrice.price > 0) {
            throw new common_1.BadRequestException({
                code: 'PAYMENT_REQUIRED',
                message: 'Payment is required before subscribing to this course.',
            });
        }
        return this.createSubscription(courseId, userId);
    }
    async createCheckoutSession(courseId, userId) {
        const [{ course, user }, existing] = await Promise.all([
            this.subscribeRepo.getCheckoutContext(courseId, userId),
            this.subscribeRepo.getSubscription(courseId, userId),
        ]);
        if (!course || !user)
            throw new common_1.BadRequestException('Course or user not found');
        if (course.userId === userId)
            throw new common_1.BadRequestException('You cannot subscribe to your own course');
        if (existing)
            return { alreadySubscribed: true };
        if (course.price <= 0)
            throw new common_1.BadRequestException('This course is free and does not require checkout');
        if (course.user.payoutAccount?.status !== 'READY_FOR_REVIEW') {
            throw new common_1.BadRequestException('This creator is not ready to receive payments.');
        }
        const stripe = this.getStripe();
        const frontend = this.config.get('FRONTEND_URL') ?? 'http://localhost:5173';
        const zeroDecimal = new Set(['bif', 'clp', 'djf', 'gnf', 'jpy', 'kmf', 'krw', 'mga', 'pyg', 'rwf', 'ugx', 'vnd', 'vuv', 'xaf', 'xof', 'xpf']);
        const currency = course.currency.toLowerCase();
        const unitAmount = Math.round(course.price * (zeroDecimal.has(currency) ? 1 : 100));
        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            customer_email: user.email,
            line_items: [{
                    quantity: 1,
                    price_data: {
                        currency,
                        unit_amount: unitAmount,
                        product_data: { name: course.title, description: `Course subscription: ${course.title}` },
                    },
                }],
            metadata: { courseId, userId },
            success_url: `${frontend}/course/${courseId}?payment=success&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${frontend}/course/${courseId}?payment=cancelled`,
        });
        return { checkoutUrl: session.url };
    }
    async confirmCheckoutSession(sessionId, userId) {
        const existingPayment = await this.subscribeRepo.findByPaymentSession(sessionId);
        if (existingPayment)
            return existingPayment;
        const session = await this.getStripe().checkout.sessions.retrieve(sessionId);
        if (session.payment_status !== 'paid' || session.metadata?.userId !== userId || !session.metadata?.courseId) {
            throw new common_1.UnauthorizedException('This payment cannot be used for this subscription.');
        }
        const subscription = await this.createSubscription(session.metadata.courseId, userId);
        return this.subscribeRepo.attachPaymentSession(subscription.id, session.id);
    }
    async createSubscription(courseId, userId) {
        const existingSubscription = await this.subscribeRepo.getSubscription(courseId, userId);
        if (existingSubscription) {
            return existingSubscription;
        }
        const subscription = await this.subscribeRepo.create(courseId, userId);
        if (!subscription) {
            throw new common_1.InternalServerErrorException("Couldn't subscribe to course");
        }
        const course = await this.subscribeRepo.findCourseSummary(courseId);
        if (course) {
            await this.notificationService.createNotification({
                userId: course.userId,
                actorId: userId,
                type: enums_1.NotificationType.COURSE_SUBSCRIBE,
                title: 'New course subscriber',
                message: course.title,
                link: `/course/${courseId}`,
            });
        }
        return subscription;
    }
    getStripe() {
        const secretKey = this.config.get('STRIPE_SECRET_KEY');
        if (!secretKey)
            throw new common_1.InternalServerErrorException('Stripe payments are not configured');
        return new stripe_1.default(secretKey);
    }
    async unsubscribeCourse(courseId, userId) {
        if (!courseId) {
            throw new common_1.BadRequestException("Course id is required");
        }
        return this.subscribeRepo.delete(courseId, userId);
    }
    async reviewCourse(courseId, userId, review, rating) {
        if (!courseId) {
            throw new common_1.BadRequestException("Course id is required");
        }
        if (typeof review !== 'string' || !review.trim()) {
            throw new common_1.BadRequestException("Review is required");
        }
        if (!Number.isFinite(rating) || rating < 0 || rating > 5) {
            throw new common_1.BadRequestException("Invalid rating it must be from 0 to 5");
        }
        const subscription = await this.subscribeRepo.reviewByCourseId(courseId, userId, review.trim(), rating);
        const course = await this.subscribeRepo.findCourseSummary(courseId);
        if (course) {
            await this.notificationService.createNotification({
                userId: course.userId,
                actorId: userId,
                type: enums_1.NotificationType.COURSE_REVIEW,
                title: 'New course review',
                message: course.title,
                link: `/course/${courseId}`,
            });
        }
        return subscription;
    }
    async getSubscribedCourses(userId) {
        return this.subscribeRepo.getSubscribedCourses(userId);
    }
    async getSubscribers(courseId) {
        if (!courseId) {
            throw new common_1.BadRequestException("Course id is required");
        }
        return this.subscribeRepo.getSubscribers(courseId);
    }
    async getCourseReviews(courseId) {
        if (!courseId) {
            throw new common_1.BadRequestException("Course id is required");
        }
        return this.subscribeRepo.getSubscriptionsByCourse(courseId);
    }
    async getSubscription(courseId, userId) {
        if (!courseId) {
            throw new common_1.BadRequestException("Course id is required");
        }
        return this.subscribeRepo.getSubscription(courseId, userId);
    }
};
exports.SubscribeService = SubscribeService;
exports.SubscribeService = SubscribeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('SUBSCRIBE_REPOSITORY')),
    __metadata("design:paramtypes", [Object, notification_service_1.NotificationService,
        config_1.ConfigService])
], SubscribeService);
//# sourceMappingURL=subscribe.service.js.map