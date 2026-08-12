import { RateDiscussionService } from './rate-discussion.service';
import { AddRateDiscussionDto } from './rate-discussion-dto/add-rate-discussion.dto';
import { UpdateRateDiscussionDto } from './rate-discussion-dto/update-rate-discussion.dto';
export declare class RateDiscussionController {
    private readonly rateDiscussionService;
    constructor(rateDiscussionService: RateDiscussionService);
    getRating(id: string, req: any): Promise<{
        isRated: true;
        rateDiscussion: any;
    } | {
        isRated: false;
        rateDiscussion?: undefined;
    }>;
    rateDiscussion(req: any, addRateDiscussionDto: AddRateDiscussionDto): Promise<any>;
    updateRateById(id: string, req: any, data: {
        rating: number;
    }): Promise<any>;
    updateRateDiscussion(req: any, updateRateDiscussionDto: UpdateRateDiscussionDto): Promise<any>;
}
