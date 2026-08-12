import { TagsService } from './tags.service';
export declare class TagsController {
    private readonly tagsService;
    constructor(tagsService: TagsService);
    getTags(): Promise<any[]>;
    suggestTags(data: {
        text?: string;
        limit?: number;
    }): Promise<{
        id: string;
        name: string;
        score: number;
    }[]>;
}
