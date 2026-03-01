import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { FolderInCourseRepository } from '../../modules/folder-in-course/folder-in-course.repository';

@Injectable()
export class PrismaFolderInCourseRepository implements FolderInCourseRepository {
    constructor(private prisma: PrismaService) {}

    async create(folderId: string, courseId: string): Promise<any> {
        const course = await this.prisma.course.findUnique({
            where: {
                id: courseId,
            },
            select: {
                id: true,
            },
        });

        const folder = await this.prisma.folder.findUnique({
            where: {
                id: folderId,
            },
            select: {
                id: true,
            },
        });

        if (!course) {
            throw  new InternalServerErrorException("Course not found");
        }

        if (!folder) {
            throw  new InternalServerErrorException("Folder not found");
        }

        return this.prisma.folderInCourse.create({
            data: {
                folderId,
                courseId,
            },
        });
    }

    async delete(folderId: string, courseId: string): Promise<any> {
        return this.prisma.folderInCourse.delete({
            where: {
                folderId_courseId: {
                    folderId,
                    courseId,
                },
            },
        });
    }

    async getFolders(courseId: string): Promise<any> {
        const folders = await this.prisma.folderInCourse.findMany({
            where: {
                courseId,
            },
            select: {
                folderId: true,
            },
        });

        const ids = folders.map(folder => folder.folderId);

        return this.prisma.folder.findMany({
            where: {
                id: { in: ids },
            },
        });
    }

    async getCourses(folderId: string): Promise<any> {
        const courses = await this.prisma.folderInCourse.findMany({
            where: {
                folderId,
            },
            select: {
                courseId: true,
            },
        });

        const ids = courses.map(folder => folder.courseId);

        return this.prisma.course.findMany({
            where: {
                id: { in: ids },
            },
        });
    }

}