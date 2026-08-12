import { RateDiscussionRepository } from './rate-discussion.repository';
export declare class RateDiscussionService {
    private readonly rateDiscussionRepo;
    constructor(rateDiscussionRepo: RateDiscussionRepository);
    createRateDiscussion(discussionId: string, userId: string, rating: number): Promise<any>;
    updateRateDiscussionById(id: string, userId: string, rating: number): Promise<any>;
    updateRateDiscussionByDiscussionId(discussionId: string, userId: string, rating: number): Promise<any>;
    findRateDiscussion(discussionId: string, userId: string): Promise<any>;
    private validateRating;
}
