import { RecentRepository, SidebarItem } from './recent.repository';
export declare class RecentService {
    private readonly recentRepo;
    constructor(recentRepo: RecentRepository);
    getSidebarActivity(userId: string, limit?: number): Promise<{
        ownedCourses: SidebarItem[];
        ownedPosts: SidebarItem[];
        viewedOrSubscribedCourses: SidebarItem[];
        viewedOrSubscribedPosts: SidebarItem[];
    }>;
    private mergeByLatestActivity;
}
