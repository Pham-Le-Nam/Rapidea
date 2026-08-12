import { SearchRepository } from '../../modules/search/search.repository';
import { PrismaService } from '../../prisma/prisma.service';
export declare class PrismaSearchRepository implements SearchRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    searchUsers(query: string, take: number): Promise<{
        id: string;
        title: string;
        subtitle: string;
        link: string;
        avatarName: string | undefined;
    }[]>;
    searchCourses(query: string, take: number): Promise<{
        id: string;
        title: string;
        subtitle: string;
        link: string;
        thumbnailName: string | undefined;
    }[]>;
    searchPosts(query: string, take: number): Promise<{
        id: string;
        title: string;
        subtitle: string;
        link: string;
    }[]>;
}
