import {
    Inject,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { RateDiscussionRepository } from './rate-discussion.repository';

@Injectable()
export class RateDiscussionService {
    constructor(
        @Inject("RATE_DISCUSSION_REPOSITORY")
        private readonly rateDiscussionRepo: RateDiscussionRepository,
    ) {}

    async createRateDiscussion(discussionId: string, userId: string, rating: number) {
        this.validateRating(rating);

        const rateDiscussion = await this.rateDiscussionRepo.create(discussionId, userId, rating);

        if (!rateDiscussion) {
            throw new InternalServerErrorException("Couldn't rate this discussion", "Couldn't rate this discussion");
        }

        return rateDiscussion;
    }

    async updateRateDiscussionById(id: string, userId: string, rating: number) {
        this.validateRating(rating);

        const rateDiscussion = await this.rateDiscussionRepo.updateById(id, userId, rating);

        if (!rateDiscussion) {
            throw new InternalServerErrorException("Couldn't re-rate this discussion", "Couldn't re-rate this discussion");
        }

        return rateDiscussion;
    }

    async updateRateDiscussionByDiscussionId(discussionId: string, userId: string, rating: number) {
        this.validateRating(rating);

        const rateDiscussion = await this.rateDiscussionRepo.updateByDiscussionId(discussionId, userId, rating);

        if (!rateDiscussion) {
            throw new InternalServerErrorException("Couldn't re-rate this discussion", "Couldn't re-rate this discussion");
        }

        return rateDiscussion;
    }

    async findRateDiscussion(discussionId: string, userId: string) {
        return this.rateDiscussionRepo.findRating(discussionId, userId);
    }

    private validateRating(rating: number) {
        if (rating < 0 || rating > 5) {
            throw new InternalServerErrorException("Invalid rating it must be from 0 to 5", "Invalid rating");
        }
    }
}
