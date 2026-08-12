import { Injectable } from '@nestjs/common';
import { RecentRepository } from '../../modules/recent/recent.repository';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PrismaRecentRepository implements RecentRepository {
    constructor(private readonly prisma: PrismaService) {}
    async getSidebarSources(userId: string, limit: number) {
        const [courses, ownedPostRows, courseViews, subscriptions, postViews, subscribedPostRows] = await Promise.all([
            this.prisma.course.findMany({ where: { userId }, orderBy: { lastUpdated: 'desc' }, take: limit, select: { id: true, title: true, lastUpdated: true } }),
            this.prisma.post.findMany({ where: { userId }, orderBy: { lastUpdated: 'desc' }, take: limit, select: { id: true, title: true, lastUpdated: true } }),
            this.prisma.recentCourseView.findMany({ where: { userId, course: { userId: { not: userId } } }, orderBy: { viewedAt: 'desc' }, take: limit, select: { viewedAt: true, course: { select: { id: true, title: true } } } }),
            this.prisma.subscribe.findMany({ where: { userId, course: { userId: { not: userId } } }, orderBy: { createdAt: 'desc' }, take: limit, select: { createdAt: true, course: { select: { id: true, title: true } } } }),
            this.prisma.recentPostView.findMany({ where: { userId, post: { userId: { not: userId } } }, orderBy: { viewedAt: 'desc' }, take: limit, select: { viewedAt: true, post: { select: { id: true, title: true } } } }),
            this.prisma.post.findMany({ where: { userId: { not: userId }, course: { subscribers: { some: { userId } } } }, orderBy: { lastUpdated: 'desc' }, take: limit, select: { id: true, title: true, lastUpdated: true } }),
        ]);
        return {
            ownedCourses: courses.map(x => ({ id: x.id, title: x.title, link: `/course/${x.id}`, activityAt: x.lastUpdated })),
            ownedPosts: ownedPostRows.map(x => ({ id: x.id, title: x.title || 'Untitled post', link: `/post/${x.id}`, activityAt: x.lastUpdated })),
            viewedCourses: courseViews.map(x => ({ id: x.course.id, title: x.course.title, link: `/course/${x.course.id}`, activityAt: x.viewedAt })),
            subscribedCourses: subscriptions.map(x => ({ id: x.course.id, title: x.course.title, link: `/course/${x.course.id}`, activityAt: x.createdAt })),
            viewedPosts: postViews.map(x => ({ id: x.post.id, title: x.post.title || 'Untitled post', link: `/post/${x.post.id}`, activityAt: x.viewedAt })),
            subscribedPosts: subscribedPostRows.map(x => ({ id: x.id, title: x.title || 'Untitled post', link: `/post/${x.id}`, activityAt: x.lastUpdated })),
        };
    }
}
