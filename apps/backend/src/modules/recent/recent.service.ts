import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

type SidebarItem = {
    id: string;
    title: string;
    link: string;
    activityAt: Date;
}

@Injectable()
export class RecentService {
    constructor(private readonly prisma: PrismaService) {}

    async getSidebarActivity(userId: string, limit = 10) {
        const [ownedCourses, ownedPosts, viewedCourses, subscribedCourses, viewedPosts, subscribedPosts] = await Promise.all([
            this.getOwnedCourses(userId, limit),
            this.getOwnedPosts(userId, limit),
            this.getViewedCourses(userId, limit),
            this.getSubscribedCourses(userId, limit),
            this.getViewedPosts(userId, limit),
            this.getSubscribedPosts(userId, limit),
        ]);

        return {
            ownedCourses,
            ownedPosts,
            viewedOrSubscribedCourses: this.mergeByLatestActivity(
                [...viewedCourses, ...subscribedCourses],
                limit,
            ),
            viewedOrSubscribedPosts: this.mergeByLatestActivity(
                [...viewedPosts, ...subscribedPosts],
                limit,
            ),
        };
    }

    private async getOwnedCourses(userId: string, limit: number): Promise<SidebarItem[]> {
        const courses = await this.prisma.course.findMany({
            where: { userId },
            orderBy: { lastUpdated: 'desc' },
            take: limit,
            select: {
                id: true,
                title: true,
                lastUpdated: true,
            },
        });

        return courses.map((course) => ({
            id: course.id,
            title: course.title,
            link: `/course/${course.id}`,
            activityAt: course.lastUpdated,
        }));
    }

    private async getOwnedPosts(userId: string, limit: number): Promise<SidebarItem[]> {
        const posts = await this.prisma.post.findMany({
            where: { userId },
            orderBy: { lastUpdated: 'desc' },
            take: limit,
            select: {
                id: true,
                title: true,
                lastUpdated: true,
            },
        });

        return posts.map((post) => ({
            id: post.id,
            title: post.title || "Untitled post",
            link: `/post/${post.id}`,
            activityAt: post.lastUpdated,
        }));
    }

    private async getViewedCourses(userId: string, limit: number): Promise<SidebarItem[]> {
        const views = await this.prisma.recentCourseView.findMany({
            where: {
                userId,
                course: {
                    userId: {
                        not: userId,
                    },
                },
            },
            orderBy: { viewedAt: 'desc' },
            take: limit,
            select: {
                viewedAt: true,
                course: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
            },
        });

        return views.map((view) => ({
            id: view.course.id,
            title: view.course.title,
            link: `/course/${view.course.id}`,
            activityAt: view.viewedAt,
        }));
    }

    private async getSubscribedCourses(userId: string, limit: number): Promise<SidebarItem[]> {
        const subscriptions = await this.prisma.subscribe.findMany({
            where: {
                userId,
                course: {
                    userId: {
                        not: userId,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
            take: limit,
            select: {
                createdAt: true,
                course: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
            },
        });

        return subscriptions.map((subscription) => ({
            id: subscription.course.id,
            title: subscription.course.title,
            link: `/course/${subscription.course.id}`,
            activityAt: subscription.createdAt,
        }));
    }

    private async getViewedPosts(userId: string, limit: number): Promise<SidebarItem[]> {
        const views = await this.prisma.recentPostView.findMany({
            where: {
                userId,
                post: {
                    userId: {
                        not: userId,
                    },
                },
            },
            orderBy: { viewedAt: 'desc' },
            take: limit,
            select: {
                viewedAt: true,
                post: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
            },
        });

        return views.map((view) => ({
            id: view.post.id,
            title: view.post.title || "Untitled post",
            link: `/post/${view.post.id}`,
            activityAt: view.viewedAt,
        }));
    }

    private async getSubscribedPosts(userId: string, limit: number): Promise<SidebarItem[]> {
        const posts = await this.prisma.post.findMany({
            where: {
                userId: {
                    not: userId,
                },
                course: {
                    subscribers: {
                        some: {
                            userId,
                        },
                    },
                },
            },
            orderBy: { lastUpdated: 'desc' },
            take: limit,
            select: {
                id: true,
                title: true,
                lastUpdated: true,
            },
        });

        return posts.map((post) => ({
            id: post.id,
            title: post.title || "Untitled post",
            link: `/post/${post.id}`,
            activityAt: post.lastUpdated,
        }));
    }

    private mergeByLatestActivity(items: SidebarItem[], limit: number) {
        const itemsById = new Map<string, SidebarItem>();

        items.forEach((item) => {
            const existingItem = itemsById.get(item.id);

            if (!existingItem || item.activityAt > existingItem.activityAt) {
                itemsById.set(item.id, item);
            }
        });

        return Array.from(itemsById.values())
            .sort((a, b) => b.activityAt.getTime() - a.activityAt.getTime())
            .slice(0, limit);
    }
}
