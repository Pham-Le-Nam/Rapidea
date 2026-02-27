export interface ReplyDiscussionRepository {
    create(repliedId: string, replyingId: string): Promise<any>;
    findByRepliedId(repliedId: string): Promise<any>;
}