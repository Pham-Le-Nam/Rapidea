import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PostInCourseRepository } from '../../modules/post-in-course/post-in-course.repository';

@Injectable()
export class PrismaPostInCourseRepository implements PostInCourseRepository {
    constructor(private prisma: PrismaService) {}

    async create(courseId: string, postId: string, userId: string): Promise<any> {
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
                userId,
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

    async delete(courseId: string, postId: string, userId: string): Promise<any> {
        const deleted = await this.prisma.postInCourse.delete({
            where: {
                courseId_postId: {
                    courseId,
                    postId,
                },
                userId
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

    async deleteCourse(courseId: string): Promise<any> {
        const deletedPost = await this.prisma.postInCourse.deleteMany({
            where: {
                courseId,
            },
        });

        return deletedPost;
    }

    async deletePost(postId: string): Promise<any> {
        const deletedCourse = await this.prisma.postInCourse.deleteMany({
            where: {
                postId,
            },
        });
    }

    // This method returns the posts in a course, ordered by creation date (newest first)
    async findByCourseId(courseId: string): Promise<any> {
        const postInCourse = await this.prisma.postInCourse.findMany({
            where: {
                courseId,
            },
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                postId: true,
            },
        });

        const postIds = postInCourse.map(pic => pic.postId);

        const posts = await this.prisma.post.findMany({
            where: {
                id: { in: postIds },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return posts;
    }

    async findByPostId(postId: string): Promise<any> {
        return this.prisma.postInCourse.findMany({
            where: {
                postId,
            },
        });
    }

}