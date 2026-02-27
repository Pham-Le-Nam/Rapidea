import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CourseRepository } from '../../modules/course/course.repository';

@Injectable()
export class PrismaCourseRepository implements CourseRepository {
    constructor(private prisma: PrismaService) {}

    async create(userId: string, title?: string, description?: string, price?: number, currency?: string) {
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
                description,
                price,
                currency,
            }
        });

        if (!course) {
            throw new InternalServerErrorException("Couldn't create the course")
        }

        // Update user courses count
        this.prisma.users.update({
            where: {
                id: userId,
            },
            data: {
                coursesCount: { increment: 1 },
            },
        });

        return course;
    }

    async updateById(id: string, title?: string, description?: string, price?: number, currency?: string) {
        return this.prisma.course.update({
            where: { id },
            data: {
                title,
                description,
                price,
                currency,
            }
        });
    }

    async findById(id: string) {
        return this.prisma.course.findUnique({
            where: { id }
        });
    }

    async findByUserId(userId: string, orderByField: string = 'createdAt', order: 'asc' | 'desc' = 'desc', amount?: number) {
        const allowedFields = [
            'createdAt',
            'price',
            'rating',
            'postCount',
            'ratingCount',
        ];

        if (!allowedFields.includes(orderByField)) {
            orderByField = 'createdAt';
        }

        return this.prisma.course.findMany({
            where: { userId },
            orderBy: { 
                [orderByField]: order,
            },
            take: amount
        });
    }

    async deleteCourseById(id: string): Promise<any> {
        const deletedCourse = await this.prisma.course.delete({
            where: { id },
        });

        if (!deletedCourse) {
            throw new InternalServerErrorException("Course not found")
        }

        const user = await this.prisma.users.update({
            where: {
                id: deletedCourse.userId,
            },
            data: {
                coursesCount: { increment: -1 },
            },
        });

        if (!user) {
            throw new InternalServerErrorException("User not found");
        }

        return deletedCourse;
    }
}