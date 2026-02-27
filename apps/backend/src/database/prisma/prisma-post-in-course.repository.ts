import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PostInCourseRepository } from '../../modules/post-in-course/post-in-course.repository';

@Injectable()
export class PrismaPostInCourseRepository implements PostInCourseRepository {
    constructor(private prisma: PrismaService) {}

    async create(courseId: string, postId: string): Promise<any | null> {
        const course = await this.prisma.course.findUnique({
            where: {
                id: courseId,
            },
        });

        // Check if the course exists
        if (!course) {
            throw new InternalServerErrorException("Course not found");
        }

        const post = await this.prisma.post.findUnique({
            where: {
                id: postId,
            },
        });

        if (!post) {
            throw new InternalServerErrorException("Post not found");
        }

        const postInCourse = await this.prisma.postInCourse.create({
            data: {
                courseId,
                postId,
            },
        });

        if (!postInCourse) {
            throw new InternalServerErrorException("Cannot include the selected post in the course");
        }

        this.prisma.course.update({
            where: {
                id: courseId,
            },
            data: {
                postsCount: { increment: 1 },
            },
        });

        return postInCourse;
    }

    async delete(courseId: string, postId: string): Promise<any | null> {
        const deleted = await this.prisma.postInCourse.delete({
            where: {
                courseId_postId: {
                    courseId,
                    postId,
                },
            },
        });

        if (!deleted) {
            throw new InternalServerErrorException("Cannot exclude the selected post from the course");
        }

        this.prisma.course.update({
            where: {
                id: courseId,
            },
            data: {
                postsCount: { increment:  -1 },
            },
        });

        return deleted;
    }

    async findByCourseId(courseId: string): Promise<any | null> {
        return this.prisma.postInCourse.findMany({
            where: {
                courseId,
            },
        });
    }

    async findByPostId(postId: string): Promise<any | null> {
        return this.prisma.postInCourse.findMany({
            where: {
                postId,
            },
        });
    }

}