import { PrismaService } from '../../prisma/prisma.service';
import { FileInCourseRepository } from '../../modules/file-in-course/file-in-course.repository';
export declare class PrismaFileInCourseRepository implements FileInCourseRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(fileId: string, courseId: string, userId: string): Promise<any>;
    delete(fileId: string, courseId: string, userId: string): Promise<any>;
    getCourses(fileId: string): Promise<any>;
    getFiles(courseId: string): Promise<any>;
}
