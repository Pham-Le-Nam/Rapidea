import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { FolderRepository } from '../../../domain/folder/repositories/folder.repository';

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

        if (folder.parentId) {
            const parentUrl = await this.getUrl(folder.parentId);
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

    async findByLocation(name: string, parentId?: string): Promise<any> {
        const normalizedParentId = parentId?.trim() || null;

        return this.prisma.folder.findFirst({
            where: {
                name,
                parentId: normalizedParentId,
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

    async findPostUsages(id: string, userId: string): Promise<any | null> {
        const rootFolder = await this.prisma.folder.findUnique({
            where: {
                id,
                userId,
            },
            select: {
                id: true,
                name: true,
            },
        });

        if (!rootFolder) {
            return null;
        }

        const folderIds = [rootFolder.id];
        const folderPaths = new Map<string, string>([
            [rootFolder.id, rootFolder.name],
        ]);
        let pendingParentIds = [rootFolder.id];

        while (pendingParentIds.length > 0) {
            const children = await this.prisma.folder.findMany({
                where: {
                    parentId: {
                        in: pendingParentIds,
                    },
                    userId,
                },
                select: {
                    id: true,
                    name: true,
                    parentId: true,
                },
            });

            children.forEach((child) => {
                const parentPath = child.parentId
                    ? folderPaths.get(child.parentId)
                    : undefined;

                folderPaths.set(
                    child.id,
                    parentPath ? `${parentPath}/${child.name}` : child.name,
                );
            });

            pendingParentIds = children.map(({ id: childId }) => childId);
            folderIds.push(...pendingParentIds);
        }

        const files = await this.prisma.file.findMany({
            where: {
                userId,
                folderId: {
                    in: folderIds,
                },
                inPosts: {
                    some: {},
                },
            },
            orderBy: [
                { name: 'asc' },
                { id: 'asc' },
            ],
            select: {
                id: true,
                name: true,
                folderId: true,
                inPosts: {
                    orderBy: {
                        post: {
                            createdAt: 'desc',
                        },
                    },
                    select: {
                        post: {
                            select: {
                                id: true,
                                title: true,
                            },
                        },
                    },
                },
            },
        });

        return files
            .map(({ folderId, inPosts, ...file }) => {
                const folderPath = folderPaths.get(folderId);

                return {
                    ...file,
                    path: folderPath ? `${folderPath}/${file.name}` : file.name,
                    posts: inPosts.map(({ post }) => post),
                };
            })
            .sort((left, right) => left.path.localeCompare(right.path));
    }

}
