import { SearchRepository } from './search.repository';
export declare class SearchService {
    private readonly searchRepo;
    constructor(searchRepo: SearchRepository);
    search(query: string, limit?: number): Promise<{
        users: any[];
        courses: any[];
        posts: any[];
    }>;
}
