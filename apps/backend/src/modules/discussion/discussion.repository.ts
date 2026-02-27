export interface DiscussionRepository {
    create(discussion: any, postId: string, userId: string): Promise<any>;
    updateById(id: string, discussion: any): Promise<any>;
    deleteById(id: string): Promise<any>;
    findById(id: string): Promise<any>;
    findByPostId(postId: string): Promise<any>;
}