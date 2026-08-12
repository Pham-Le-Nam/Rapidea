export type SidebarItem = {
    id: string;
    title: string;
    link: string;
    activityAt: Date;
};
export interface RecentRepository {
    getSidebarSources(userId: string, limit: number): Promise<{
        ownedCourses: SidebarItem[];
        ownedPosts: SidebarItem[];
        viewedCourses: SidebarItem[];
        subscribedCourses: SidebarItem[];
        viewedPosts: SidebarItem[];
        subscribedPosts: SidebarItem[];
    }>;
}
