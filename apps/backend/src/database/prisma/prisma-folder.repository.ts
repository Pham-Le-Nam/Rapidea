import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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

        return this.prisma.folder.create({
            data: {
                userId,
                parentId,
                name,
            },
        });
    }

    async delete(id: string, userId: string): Promise<any> {
        return this.prisma.folder.delete({
            where: {
                id,
                userId,
            },
        });
    }

    async rename(id: string, userId: string, name: string): Promise<any> {
        const folder = this.prisma.folder.update({
            where: {
                id,
                userId,
            },
            data: {
                name,
            },
        });

        if(!folder) {
            throw new InternalServerErrorException("Couldn't update the folder");
        }

        return folder;
    }

    async move(id: string, userId: string, parentId: string): Promise<any> {
        const folder = this.prisma.folder.update({
            where: {
                id,
            },
            data: {
                parentId,
            },
        });

        if(!folder) {
            throw new InternalServerErrorException("Couldn't update the folder");
        }

        return folder;
    }

    async getUrl(id: string): Promise<string> {
        const folder = await this.prisma.folder.findUnique({
            where: {
                id,
            },
        });

        if(!folder) {
            throw new NotFoundException("Folder not found");
        }

        if(folder.parentId) {
            const parentUrl = this.getUrl(folder.parentId);
            const url = `${parentUrl}/${folder.name}`;
            return url;
        }
        else {
            return folder.name;
        }
    }

    async findById(id: string): Promise<any> {
        return this.prisma.folder.findUnique({
            where: {
                id,
            },
        });
    }

    async findByLocation(parentId: string, name: string): Promise<any> {
        return this.prisma.folder.findUnique({
            where: {
                parentId_name: {
                    parentId,
                    name,
                },
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