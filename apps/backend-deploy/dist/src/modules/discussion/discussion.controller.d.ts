import { DiscussionService } from './discussion.service';
import { AddDiscussionDto } from './discussion-dto/add-discussion.dto';
import { UpdateDiscussionDto } from './discussion-dto/update-discussion.dto';
import { PostService } from '../post/post.service';
export declare class DiscussionController {
    private readonly discussionService;
    private readonly postService;
    constructor(discussionService: DiscussionService, postService: PostService);
    private assertCanViewPostDiscussions;
    getDiscussionById(id: string, req: any): Promise<{
        isOwner: boolean;
        discusssion: any;
    }>;
    getDiscussionsById(id: string, req: any, startIndex?: number, amount?: number): Promise<any>;
    getReplyingDiscussions(id: string, req: any, startIndex?: number, amount?: number): Promise<any>;
    getChildrenDiscussions(id: string, req: any, startIndex?: number, amount?: number): Promise<any>;
    addDiscussion(req: any, addDiscussionDto: AddDiscussionDto): Promise<any>;
    updateDiscussion(req: any, updateDiscussionDto: UpdateDiscussionDto): Promise<any>;
    deleteDiscussion(req: any, data: {
        id: string;
    }): Promise<any>;
}
