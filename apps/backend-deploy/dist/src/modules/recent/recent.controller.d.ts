import { RecentService } from './recent.service';
export declare class RecentController {
    private readonly recentService;
    constructor(recentService: RecentService);
    getSidebarActivity(req: any): Promise<{
        ownedCourses: import("./recent.repository").SidebarItem[];
        ownedPosts: import("./recent.repository").SidebarItem[];
        viewedOrSubscribedCourses: import("./recent.repository").SidebarItem[];
        viewedOrSubscribedPosts: import("./recent.repository").SidebarItem[];
    }>;
}
