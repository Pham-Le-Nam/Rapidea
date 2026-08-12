import { RecentRepository } from '../../modules/recent/recent.repository';
import { PrismaService } from '../../prisma/prisma.service';
export declare class PrismaRecentRepository implements RecentRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getSidebarSources(userId: string, limit: number): Promise<{
        ownedCourses: {
            id: string;
            title: string;
            link: string;
            activityAt: Date;
        }[];
        ownedPosts: {
            id: string;
            title: string;
            link: string;
            activityAt: Date;
        }[];
        viewedCourses: {
            id: string;
            title: string;
            link: string;
            activityAt: Date;
        }[];
        subscribedCourses: {
            id: string;
            title: string;
            link: string;
            activityAt: Date;
        }[];
        viewedPosts: {
            id: string;
            title: string;
            link: string;
            activityAt: Date;
        }[];
        subscribedPosts: {
            id: string;
            title: string;
            link: string;
            activityAt: Date;
        }[];
    }>;
}
