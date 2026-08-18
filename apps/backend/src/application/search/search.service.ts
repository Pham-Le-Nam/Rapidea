import { Inject, Injectable } from '@nestjs/common';
import { SearchRepository } from '../../domain/search/repositories/search.repository';

@Injectable()
export class SearchService {
    constructor(@Inject('SEARCH_REPOSITORY') private readonly searchRepo: SearchRepository) {}

    async search(query: string, limit = 5) {
        const normalizedQuery = query?.trim();
        if (!normalizedQuery) return { users: [], courses: [], posts: [] };
        const take = Math.min(Math.max(Number(limit) || 5, 1), 10);
        const [users, courses, posts] = await Promise.all([
            this.searchRepo.searchUsers(normalizedQuery, take),
            this.searchRepo.searchCourses(normalizedQuery, take),
            this.searchRepo.searchPosts(normalizedQuery, take),
        ]);
        return { users, courses, posts };
    }
}
