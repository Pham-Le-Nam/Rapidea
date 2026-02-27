export interface RateDiscussionRepository {
    create(discussionId: string, userId: string, rating: number): Promise<any>;
    updateById(id: string, rating: number): Promise<any>;
    findRating(discussionId: string, userId: string): Promise<any>;
}