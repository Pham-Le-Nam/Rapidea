import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { FileRepository } from '../../modules/file/file.repository';

@Injectable()
export class PrismaFileRepository implements FileRepository {
    constructor(private prisma: PrismaService) {}

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

        return this.prisma.file.create({
            data: {
                name,
                mimeType,
                size,
                userId,
                folderId,
            },
        });
    }

    async updateById(id: string, userId: string, folderId?: string, name?: string): Promise<any> {
        return this.prisma.file.update({
            where: {
                id,
                userId,
            },
            data: {
                folderId,
                name,
            },
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