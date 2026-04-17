export interface RatePostRepository {
    create(postId: string, userId: string, rating: number): Promise<any>;
    updateById(id: string, userId: string, rating: number): Promise<any>;
    updateByPostId(postId: string, userId: string, rating: number): Promise<any>;
    findRating(postId: string, userId: string): Promise<any>;
    findByPostId(postId: string): Promise<any>;
    findByUserId(userId: string): Promise<any>;
}