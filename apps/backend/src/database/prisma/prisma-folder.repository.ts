import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { FolderRepository } from '../../modules/folder/folder.repository';

@Injectable()
export class PrismaFolderRepository implements FolderRepository {
    constructor(private prisma: PrismaService) {}

    async create(userId: string, name: string, parentId?: string): Promise<any> {
        const user = await this.prisma.users.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) {
            throw new InternalServerErrorException("User not found");
        }

        let url = "";

        if (parentId) {
            const parentFolder = await this.prisma.folder.findUnique({
                where: {
                    id: parentId,
                },
                select: {
                    url: true,
                    name: true,
                },
            });

            if (!parentFolder) {
                throw new InternalServerErrorException("Parent folder not found");
            }

            url = `${parentFolder.url}/${parentFolder.name}`;
        }

        return this.prisma.folder.create({
            data: {
                userId,
                parentId,
                url,
                name,
            },
        });
    }

    async delete(id: string): Promise<any> {
        return this.prisma.folder.delete({
            where: {
                id,
            },
        });
    }

    async findById(id: string): Promise<any> {
        return this.prisma.folder.findUnique({
            where: {
                id,
            },
        });
    }

    async findByLocation(url: string, name: string): Promise<any> {
        return this.prisma.folder.findUnique({
            where: {
                url_name: {
                    url,
                    name,
                },
            },
        });
    }

    async findByUrl(url: string): Promise<any> {
        return this.prisma.folder.findMany({
            where: {
                url,
            },
        });
    }

    async findChildrenFolders(id: string): Promise<any> {
        const folder = await this.prisma.folder.findUnique({
            where: {
                id,
            },
            include: {
                childrenFolders: true,
            },
        });

        if (!folder) {
            throw new InternalServerErrorException("Folder not found");
        }

        return {
            childrenFolders: folder.childrenFolders,
        };
    }

    async findChildrenFiles(id: string): Promise<any> {
        const folder = await this.prisma.folder.findUnique({
            where: {
                id,
            },
            include: {
                files: true,
            },
        });

        if (!folder) {
            throw new InternalServerErrorException("Folder not found");
        }

        return {
            childrenFiles: folder.files,
        };
    }

    async findAllChildren(id: string): Promise<any> {
        const folder = await this.prisma.folder.findUnique({
            where: {
                id,
            },
            include: {
                childrenFolders: true,
                files: true,
            },
        });

        if (!folder) {
            throw new InternalServerErrorException("Folder not found");
        }

        return {
            childrenFolders: folder.childrenFolders,
            childrenFiles: folder.files,
        };
    }

}