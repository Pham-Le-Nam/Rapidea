import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CourseRepository } from '../../modules/course/course.repository';

@Injectable()
export class PrismaCourseRepository implements CourseRepository {
    constructor(private prisma: PrismaService) {}

    async create(userId: string, title: string, folderId: string, description?: string, price?: number, currency?: string) {
        const user = await this.prisma.users.findUnique({
            where: {
                id: userId,
            },
        });

        if(!user) {
            throw new InternalServerErrorException("User not found");
        }

        const course = await this.prisma.course.create({
            data: {
                userId,
                title,
                folderId,
                description,
                price,
                currency,
            }
        });

        if (!course) {
            throw new InternalServerErrorException("Couldn't create the course")
        }

        // Update user courses count
        await this.prisma.users.update({
            where: {
                id: userId,
            },
            data: {
                coursesCount: { increment: 1 },
            },
        });

        return course;
    }

    async updateById(id: string, userId: string, title?: string, description?: string, price?: number, currency?: string, thumbnailId?: number) {
        return this.prisma.course.update({
            where: { 
                id,
                userId,
            },
            data: {
                title,
                description,
                price,
                currency,
                thumbnailId,
            }
        });
    }

    async updateLastUpdatedById(id: string, lastUpdated: Date = new Date()) {
        return this.prisma.course.update({
            where: { id },
            data: { lastUpdated },
        });
    }

    async recordView(id: string, userId: string) {
        return this.prisma.recentCourseView.upsert({
            where: {
                courseId_userId: {
                    courseId: id,
                    userId,
                },
            },
            update: {
                viewedAt: new Date(),
            },
            create: {
                courseId: id,
                userId,
            },
        });
    }

    async findById(id: string) {
        return this.prisma.course.findUnique({
            where: { id },
            include: {
                thumbnail: true,
            },
        });
    }

    async findByUserId(userId: string, orderByField: string = 'createdAt', order: 'asc' | 'desc' = 'desc', amount?: number, offset?: number) {
        const allowedFields = [
            'createdAt',
            'price',
            'rating',
            'postCount',
            'postsCount',
            'ratingCount',
            'subscribersCount',
            'lastUpdated',
        ];

        if (!allowedFields.includes(orderByField)) {
            orderByField = 'createdAt';
        }

        return this.prisma.course.findMany({
            where: { userId },
            include: {
                thumbnail: true,
            },
            orderBy: { 
                [orderByField]: order,
            },
            skip: offset,
            take: amount
        });
    }

    async deleteCourseById(id: string): Promise<any> {
        const course = await this.prisma.course.findUnique({
            where: { id },
            include: {
                _count: {
                    select: {
                        posts: true,
                    },
                },
            },
        });

        if (!course) {
            throw new InternalServerErrorException("Course not found")
        }

        const [deletedCourse] = await this.prisma.$transaction([
            this.prisma.course.delete({
                where: { id },
            }),
            this.prisma.users.update({
                where: {
                    id: course.userId,
                },
                data: {
                    coursesCount: { decrement: 1 },
                    postsCount: { decrement: course._count.posts },
                },
            }),
        ]);

        return deletedCourse;
    }
}
