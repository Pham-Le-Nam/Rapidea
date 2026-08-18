import { Inject, Injectable } from '@nestjs/common';
import { RecentRepository, SidebarItem } from '../../domain/recent/repositories/recent.repository';

@Injectable()
export class RecentService {
    constructor(@Inject('RECENT_REPOSITORY') private readonly recentRepo: RecentRepository) {}
    async getSidebarActivity(userId: string, limit = 10) {
        const data = await this.recentRepo.getSidebarSources(userId, limit);
        return {
            ownedCourses: data.ownedCourses,
            ownedPosts: data.ownedPosts,
            viewedOrSubscribedCourses: this.mergeByLatestActivity([...data.viewedCourses, ...data.subscribedCourses], limit),
            viewedOrSubscribedPosts: this.mergeByLatestActivity([...data.viewedPosts, ...data.subscribedPosts], limit),
        };
    }
    private mergeByLatestActivity(items: SidebarItem[], limit: number) {
        const byId = new Map<string, SidebarItem>();
        items.forEach(item => { const current = byId.get(item.id); if (!current || item.activityAt > current.activityAt) byId.set(item.id, item); });
        return Array.from(byId.values()).sort((a, b) => b.activityAt.getTime() - a.activityAt.getTime()).slice(0, limit);
    }
}
