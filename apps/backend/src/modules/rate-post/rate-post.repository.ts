export interface RatePostRepository {
    create(postId: string, userId: string, rating: number): Promise<any>;
    updateById(id: string, rating: number): Promise<any>;
    findRating(postId: string, userId: string): Promise<any>;
}