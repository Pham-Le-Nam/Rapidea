import { 
    Injectable,
    Inject,
    NotFoundException,
    InternalServerErrorException,
} from '@nestjs/common';
import { RatePostRepository } from './rate-post.repository';

@Injectable()
export class RatePostService {
    constructor(
        @Inject("RATE_POST_REPOSITORY")
        private readonly ratePostRepo: RatePostRepository,
    ) {}

    async createRatePost (postId: string, userId: string, rating: number) {
        if (rating < 0 || rating > 5) {
            throw new InternalServerErrorException("Invalid rating it must be from 0 to 5", "Invalid rating");
        }

        const ratePost = await this.ratePostRepo.create(postId, userId, rating);

        if (!ratePost) {
            throw new InternalServerErrorException("Couldn't rate this post", "Couldn't rate this post");
        }

        return ratePost;
    }

    async updateRatePostById (id: string, userId: string, rating: number) {
        if (rating < 0 || rating > 5) {
            throw new InternalServerErrorException("Invalid rating it must be from 0 to 5", "Invalid rating");
        }

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
        
        const ratePost = await this.ratePostRepo.updateByPostId(postId, userId, rating);

        if (!ratePost) {
            throw new InternalServerErrorException("Couldn't re-rate this post", "Couldn't re-rate this post");
        }

        return ratePost;
    }

    async findRatePost (postId: string, userId: string) {
        const ratePost = await this.ratePostRepo.findRating(postId, userId);

        if (!ratePost) {
            throw new InternalServerErrorException("Post rating not found", "Post rating not found");
        }

        return ratePost;
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
}

