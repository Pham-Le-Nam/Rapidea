import { 
    Injectable,
    Inject,
    NotFoundException,
    InternalServerErrorException,
    ForbiddenException,
} from '@nestjs/common';
import { RatePostRepository } from './rate-post.repository';
import { NotificationService } from '../notification/notification.service';
import { NotificationType } from '../../../generated/prisma/enums';

@Injectable()
export class RatePostService {
    constructor(
        @Inject("RATE_POST_REPOSITORY")
        private readonly ratePostRepo: RatePostRepository,
        private readonly notificationService: NotificationService,
    ) {}

    async createRatePost (postId: string, userId: string, rating: number) {
        if (rating < 0 || rating > 5) {
            throw new InternalServerErrorException("Invalid rating it must be from 0 to 5", "Invalid rating");
        }

        await this.assertCanRatePost(postId, userId);

        const ratePost = await this.ratePostRepo.create(postId, userId, rating);

        if (!ratePost) {
            throw new InternalServerErrorException("Couldn't rate this post", "Couldn't rate this post");
        }

        const post = await this.ratePostRepo.findPostSummary(postId);

        if (post) {
            await this.notificationService.createNotification({
                userId: post.userId,
                actorId: userId,
                type: NotificationType.POST_RATE,
                title: 'New post rating',
                message: post.title || `${rating} star rating`,
                link: `/post/${postId}`,
            });
        }

        return ratePost;
    }

    async updateRatePostById (id: string, userId: string, rating: number) {
        if (rating < 0 || rating > 5) {
            throw new InternalServerErrorException("Invalid rating it must be from 0 to 5", "Invalid rating");
        }

        const existingRating = await this.ratePostRepo.findOwnedRating(id, userId);

        if (!existingRating) {
            throw new NotFoundException("Post rating not found", "Post rating not found");
        }

        await this.assertCanRatePost(existingRating.postId, userId);

        const ratePost = await this.ratePostRepo.updateById(id, userId, rating);

        if (!ratePost) {
            throw new InternalServerErrorException("Couldn't re-rate this post", "Couldn't re-rate this post");
        }

        return ratePost;
    }

    async updateRatePostByPostId (postId: string, userId: string, rating: number) {
        if (rating < 0 || rating > 5) {
            throw new InternalServerErrorException("Invalid rating it must be from 0 to 5", "Invalid rating");
        }

        await this.assertCanRatePost(postId, userId);
        
        const ratePost = await this.ratePostRepo.updateByPostId(postId, userId, rating);

        if (!ratePost) {
            throw new InternalServerErrorException("Couldn't re-rate this post", "Couldn't re-rate this post");
        }

        return ratePost;
    }

    async findRatePost (postId: string, userId: string) {
        return this.ratePostRepo.findRating(postId, userId);
    }

    async findRatePostByPostId (postId: string) {
        const ratePosts = await this.ratePostRepo.findByPostId(postId);

        if (!ratePosts) {
            throw new InternalServerErrorException("Post ratings not found", "Post ratings not found");
        }

        return ratePosts;
    }

    async findRatePostByUserId (userId: string) {
        const ratePosts = await this.ratePostRepo.findByUserId(userId);

        if (!ratePosts) {
            throw new InternalServerErrorException("User's Post ratings not found", "User's Post ratings not found");
        }

        return ratePosts;
    }

    private async assertCanRatePost(postId: string, userId: string) {
        const post = await this.ratePostRepo.findPostAccess(postId, userId);

        if (!post) {
            throw new NotFoundException("Post not found", "Post not found");
        }

        const canRate = !post.courseId
            || post.isPreview
            || post.userId === userId
            || post.course?.userId === userId
            || (post.course?.subscribers?.length ?? 0) > 0;

        if (!canRate) {
            throw new ForbiddenException("Subscribe to this course before rating this post");
        }
    }
}

