import { Injectable } from '@nestjs/common';
import { SearchRepository } from '../../modules/search/search.repository';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PrismaSearchRepository implements SearchRepository {
    constructor(private readonly prisma: PrismaService) {}
    async searchUsers(query: string, take: number) {
        const users = await this.prisma.users.findMany({
            where: { OR: ['username','firstname','middlename','lastname','headline'].map((field) => ({ [field]: { contains: query, mode: 'insensitive' } })) as any },
            take, orderBy: { createdAt: 'desc' },
            select: { id: true, username: true, firstname: true, middlename: true, lastname: true, headline: true, avatar: true },
        });
        return users.map((user) => ({ id: user.id, title: [user.firstname,user.middlename,user.lastname].filter(Boolean).join(' ') || user.username, subtitle: user.headline || `@${user.username}`, link: `/profile/${user.username}`, avatarName: user.avatar?.name }));
    }
    async searchCourses(query: string, take: number) {
        const courses = await this.prisma.course.findMany({
            where: { OR: [{ title: { contains: query, mode: 'insensitive' } }, { description: { contains: query, mode: 'insensitive' } }] },
            take, orderBy: { lastUpdated: 'desc' },
            select: { id: true, title: true, description: true, thumbnail: true, user: { select: { firstname: true, middlename: true, lastname: true, username: true } } },
        });
        return courses.map((course) => ({ id: course.id, title: course.title, subtitle: [course.user.firstname,course.user.middlename,course.user.lastname].filter(Boolean).join(' ') || course.user.username, link: `/course/${course.id}`, thumbnailName: course.thumbnail?.name }));
    }
    async searchPosts(query: string, take: number) {
        const posts = await this.prisma.post.findMany({
            where: { title: { contains: query, mode: 'insensitive' } }, take, orderBy: { lastUpdated: 'desc' },
            select: { id: true, title: true, user: { select: { firstname: true, middlename: true, lastname: true, username: true } }, course: { select: { title: true } } },
        });
        return posts.map((post) => ({ id: post.id, title: post.title || 'Untitled post', subtitle: post.course?.title || [post.user.firstname,post.user.middlename,post.user.lastname].filter(Boolean).join(' ') || post.user.username, link: `/post/${post.id}` }));
    }
}
