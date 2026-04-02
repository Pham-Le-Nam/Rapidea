import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { FileInCourseRepository } from '../../modules/file-in-course/file-in-course.repository';

@Injectable()
export class PrismaFileInCourseRepository implements FileInCourseRepository {
    constructor(private prisma: PrismaService) {}

    async create(fileId: string, courseId: string, userId: string): Promise<any> {
        const file = await this.prisma.file.findUnique({
            where: {
                id: fileId,
            },
            select: {
                id: true,
            },
        });

        const course = await this.prisma.course.findUnique({
            where: {
                id: courseId,
            },
            select: {
                id: true,
            },
        });

        if (!file) {
            throw new InternalServerErrorException("File not found");
        }

        if (!course) {
            throw new InternalServerErrorException("Course not found");
        }

        const fileInCourse = await this.prisma.fileInCourse.create({
            data: {
                fileId,
                courseId,
                userId,
            },
        });

        return fileInCourse;
    }

    async delete(fileId: string, courseId: string, userId: string): Promise<any> {
        return this.prisma.fileInCourse.delete({
            where: {
                fileId_courseId: {
                    fileId,
                    courseId,
                },
                userId,
            },
        });
    }

    async getCourses(fileId: string): Promise<any> {
        const courses = await this.prisma.fileInCourse.findMany({
            where: {
                fileId,
            },
            select: {
                courseId: true,
            },
        });

        if (!courses) {
            throw new InternalServerErrorException("Courses not found");
        }

        const ids = courses.map(course => course.courseId);

        return this.prisma.course.findMany({
            where: {
                id: { in: ids },
            },
        });
    }

    async getFiles(courseId: string): Promise<any> {
        const files = await this.prisma.fileInCourse.findMany({
            where: {
                courseId,
            },
            select: {
                fileId: true,
            },
        });

        if (!files) {
            throw new InternalServerErrorException("Files not found");
        }

        const ids = files.map(course => course.fileId);

        return this.prisma.file.findMany({
            where: {
                id: { in: ids },
            },
        });
    }
}