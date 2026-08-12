import { DiscussionRepository } from './discussion.repository';
import { NotificationService } from '../notification/notification.service';
export declare class DiscussionService {
    private readonly discussionRepo;
    private readonly notificationService;
    constructor(discussionRepo: DiscussionRepository, notificationService: NotificationService);
    createDiscussion(discussion: any, postId: string, userId: string, repliedId?: string): Promise<any>;
    updateDiscussionById(id: string, userId: string, discussion: any): Promise<any>;
    deleteDiscussionById(id: string, userId: string): Promise<any>;
    getDiscussionById(id: string): Promise<any>;
    getDiscussionsByPostId(postId: string, startIndex?: number, amount?: number): Promise<any>;
    getReplyingDiscussionById(id: string, startIndex?: number, amount?: number): Promise<any>;
    getChildrenDiscussionById(id: string, startIndex?: number, amount?: number): Promise<any>;
}
