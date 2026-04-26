import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { FileRepository } from '../../modules/file/file.repository';

@Injectable()
export class PrismaFileRepository implements FileRepository {
    constructor(private prisma: PrismaService) {}

    private async findCourseIdByFolderId(folderId: string): Promise<string | null> {
        let currentFolderId: string | null = folderId;

        while (currentFolderId) {
            const course = await this.prisma.course.findUnique({
                where: {
                    folderId: currentFolderId,
                },
                select: {
                    id: true,
                },
            });

            if (course) {
                return course.id;
            }

            const folder = await this.prisma.folder.findUnique({
                where: {
                    id: currentFolderId,
                },
                select: {
                    parentId: true,
                },
            });

            currentFolderId = folder?.parentId ?? null;
        }

        return null;
    }

    async create(folderId: string, name: string, mimeType: string, size: number, userId: string): Promise<any> {
        const folder = await this.prisma.folder.findUnique({
            where: {
                id: folderId,
            },
            select: {
                name: true,
            },
        });

        if (!folder) {
            throw new InternalServerErrorException("Folder not found");
        }

        const courseId = await this.findCourseIdByFolderId(folderId);

        return this.prisma.$transaction(async (tx) => {
            const file = await tx.file.create({
                data: {
                    name,
                    mimeType,
                    size,
                    userId,
                    folderId,
                },
            });

            if (courseId) {
                await tx.course.update({
                    where: {
                        id: courseId,
                    },
                    data: {
                        lastUpdated: new Date(),
                    },
                });
            }

            return file;
        });
    }

    async updateById(id: string, userId: string, folderId?: string, name?: string): Promise<any> {
        const existingFile = await this.prisma.file.findUnique({
            where: {
                id,
                userId,
            },
            select: {
                folderId: true,
            },
        });

        if (!existingFile) {
            throw new InternalServerErrorException("File not found");
        }

        const targetFolderId = folderId ?? existingFile.folderId;
        const oldCourseId = await this.findCourseIdByFolderId(existingFile.folderId);
        const newCourseId = await this.findCourseIdByFolderId(targetFolderId);
        const courseIds = Array.from(new Set([oldCourseId, newCourseId].filter(Boolean))) as string[];

        return this.prisma.$transaction(async (tx) => {
            const file = await tx.file.update({
                where: {
                    id,
                    userId,
                },
                data: {
                    folderId,
                    name,
                },
            });

            await Promise.all(courseIds.map((courseId) => tx.course.update({
                where: {
                    id: courseId,
                },
                data: {
                    lastUpdated: new Date(),
                },
            })));

            return file;
        });
    }

    async findById(id: string): Promise<any> {
        return this.prisma.file.findUnique({
            where: { 
                id, 
            },
        });
    }

    async findByFolderId(folderId: string): Promise<any> {
        return this.prisma.file.findMany({
            where: {
                folderId,
            },
        });
    }

    async deleteById(id: string, userId: string): Promise<any> {
        return this.prisma.file.delete({
            where: { 
                id,
                userId,
            },
        });
    }

}
