export interface DiscussionRepository {
    create(discussion: any, postId: string, userId: string, parentId?: string, repliedId?: string): Promise<any>;
    updateById(id: string, userId: string, discussion: any): Promise<any>;
    deleteById(id: string, userId: string): Promise<any>;
    findById(id: string): Promise<any>;
    findReplyingById(id: string, startIndex?: number, amount?: number): Promise<any>;
    findByPostId(postId: string, startIndex?: number, amount?: number): Promise<any>;
    findChildrenById(parentId: string, startIndex?: number, amount?: number): Promise<any>;
}