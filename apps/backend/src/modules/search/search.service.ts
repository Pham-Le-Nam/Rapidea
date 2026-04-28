import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SearchService {
    constructor(private readonly prisma: PrismaService) {}

    async search(query: string, limit = 5) {
        const normalizedQuery = query?.trim();

        if (!normalizedQuery) {
            return {
                users: [],
                courses: [],
                posts: [],
            };
        }

        const take = Math.min(Math.max(Number(limit) || 5, 1), 10);

        const [users, courses, posts] = await Promise.all([
            this.searchUsers(normalizedQuery, take),
            this.searchCourses(normalizedQuery, take),
            this.searchPosts(normalizedQuery, take),
        ]);

        return {
            users,
            courses,
            posts,
        };
    }

    private async searchUsers(query: string, take: number) {
        const users = await this.prisma.users.findMany({
            where: {
                OR: [
                    { username: { contains: query, mode: 'insensitive' } },
                    { firstname: { contains: query, mode: 'insensitive' } },
                    { middlename: { contains: query, mode: 'insensitive' } },
                    { lastname: { contains: query, mode: 'insensitive' } },
                    { headline: { contains: query, mode: 'insensitive' } },
                ],
            },
            take,
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                id: true,
                username: true,
                firstname: true,
                middlename: true,
                lastname: true,
                headline: true,
                avatar: true,
            },
        });

        return users.map((user) => ({
            id: user.id,
            title: [user.firstname, user.middlename, user.lastname].filter(Boolean).join(' ') || user.username,
            subtitle: user.headline || `@${user.username}`,
            link: `/profile/${user.username}`,
            avatarName: user.avatar?.name,
        }));
    }

    private async searchCourses(query: string, take: number) {
        const courses = await this.prisma.course.findMany({
            where: {
                OR: [
                    { title: { contains: query, mode: 'insensitive' } },
                    { description: { contains: query, mode: 'insensitive' } },
                ],
            },
            take,
            orderBy: {
                lastUpdated: 'desc',
            },
            select: {
                id: true,
                title: true,
                description: true,
                thumbnail: true,
                user: {
                    select: {
                        firstname: true,
                        middlename: true,
                        lastname: true,
                        username: true,
                    },
                },
            },
        });

        return courses.map((course) => ({
            id: course.id,
            title: course.title,
            subtitle: [course.user.firstname, course.user.middlename, course.user.lastname].filter(Boolean).join(' ') || course.user.username,
            link: `/course/${course.id}`,
            thumbnailName: course.thumbnail?.name,
        }));
    }

    private async searchPosts(query: string, take: number) {
        const posts = await this.prisma.post.findMany({
            where: {
                title: { contains: query, mode: 'insensitive' },
            },
            take,
            orderBy: {
                lastUpdated: 'desc',
            },
            select: {
                id: true,
                title: true,
                user: {
                    select: {
                        firstname: true,
                        middlename: true,
                        lastname: true,
                        username: true,
                    },
                },
                course: {
                    select: {
                        title: true,
                    },
                },
            },
        });

        return posts.map((post) => ({
            id: post.id,
            title: post.title || 'Untitled post',
            subtitle: post.course?.title || [post.user.firstname, post.user.middlename, post.user.lastname].filter(Boolean).join(' ') || post.user.username,
            link: `/post/${post.id}`,
        }));
    }
}
