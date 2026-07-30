import { Body, Controller, Get, NotFoundException, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ReviewSubscriptionDto } from './subscribe-dto/review-subscription.dto';
import { SubscribeCourseDto } from './subscribe-dto/subscribe-course.dto';
import { SubscribeService } from './subscribe.service';

@Controller('api/subscribe')
export class SubscribeController {
    constructor(
        private readonly subscribeService: SubscribeService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('me/courses')
    async getMySubscribedCourses(
        @Request() req: any,
    ) {
        const userId = req.user?.userId;

        if (!userId) {
            throw new NotFoundException("User not found", "User not found");
        }

        return this.subscribeService.getSubscribedCourses(userId);
    }

    @Get('course/:courseId/subscribers')
    async getCourseSubscribers(
        @Param('courseId') courseId: string,
    ) {
        return this.subscribeService.getSubscribers(courseId);
    }

    @Get('course/:courseId/reviews')
    async getCourseReviews(
        @Param('courseId') courseId: string,
    ) {
        return this.subscribeService.getCourseReviews(courseId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':courseId')
    async getSubscription(
        @Param('courseId') courseId: string,
        @Request() req: any,
    ) {
        const userId = req.user?.userId;

        if (!userId) {
            throw new NotFoundException("User not found", "User not found");
        }

        const subscription = await this.subscribeService.getSubscription(courseId, userId);

        return {
            isSubscribed: !!subscription,
            subscription,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Post('add')
    async subscribeCourse(
        @Request() req: any,
        @Body() subscribeCourseDto: SubscribeCourseDto,
    ) {
        const userId = req.user?.userId;

        if (!userId) {
            throw new NotFoundException("User not found", "User not found");
        }

        return this.subscribeService.subscribeCourse(subscribeCourseDto.courseId, userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('checkout')
    async createCheckout(@Request() req: any, @Body() dto: SubscribeCourseDto) {
        return this.subscribeService.createCheckoutSession(dto.courseId, req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('checkout/confirm')
    async confirmCheckout(@Request() req: any, @Body() body: { sessionId: string }) {
        return this.subscribeService.confirmCheckoutSession(body.sessionId, req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('delete')
    async unsubscribeCourse(
        @Request() req: any,
        @Body() subscribeCourseDto: SubscribeCourseDto,
    ) {
        const userId = req.user?.userId;

        if (!userId) {
            throw new NotFoundException("User not found", "User not found");
        }

        return this.subscribeService.unsubscribeCourse(subscribeCourseDto.courseId, userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('review')
    async reviewCourse(
        @Request() req: any,
        @Body() reviewSubscriptionDto: ReviewSubscriptionDto,
    ) {
        const userId = req.user?.userId;

        if (!userId) {
            throw new NotFoundException("User not found", "User not found");
        }

        return this.subscribeService.reviewCourse(
            reviewSubscriptionDto.courseId,
            userId,
            reviewSubscriptionDto.review,
            reviewSubscriptionDto.rating,
        );
    }
}
