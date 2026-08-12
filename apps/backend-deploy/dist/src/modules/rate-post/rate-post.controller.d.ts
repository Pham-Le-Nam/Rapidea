import { RatePostService } from './rate-post.service';
import { AddRatePostDto } from './rate-post-dto/add-rate-post.dto';
import { UpdateRatePostDto } from './rate-post-dto/update-rate-post.dto';
export declare class RatePostController {
    private readonly ratePostService;
    constructor(ratePostService: RatePostService);
    getRating(id: string, req: any): Promise<{
        isRated: true;
        ratePost: any;
    } | {
        isRated: false;
        ratePost?: undefined;
    }>;
    getRatingByPostId(id: string): Promise<any>;
    getRatingByUserId(id: string): Promise<any>;
    ratePost(req: any, addRatePostDto: AddRatePostDto): Promise<any>;
    updateRateById(id: string, req: any, data: {
        rating: number;
    }): Promise<any>;
    updateRatePost(req: any, updateRatePostDto: UpdateRatePostDto): Promise<any>;
}
