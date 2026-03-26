import { Injectable, Inject, InternalServerErrorException } from '@nestjs/common';
import { FolderRepository } from './folder.repository';
import { mkdir, rm } from "fs/promises";

@Injectable()
export class FolderService {
    private rootFolder = process.env.STORAGE_URL;

    constructor(
        @Inject('FOLDER_REPOSITORY')
        private readonly folderRepo: FolderRepository,
    ) {}

    async createFolder (userId: string, folderName: string, parentId?: string) {
        const folder = await this.folderRepo.create(userId, folderName, parentId);

        if (!folder) {
            throw new InternalServerErrorException("Couldn't create folder");
        }

        const url = await this.folderRepo.getUrl(folder.id);

        await mkdir(`${this.rootFolder}/${url}`, { recursive: true });

        return folder;
    }

    async deleteFolder (folderId: string, userId: string) {
        const url = await this.folderRepo.getUrl(folderId);

        const folder = await this.folderRepo.delete(folderId, userId);

        if (!folder) {
            throw new InternalServerErrorException("Couldn't delete folder");
        }

        await rm(`${this.rootFolder}/${url}`, {
            recursive: true,
            force: true,
        });

        return folder;
    }

    async renameFolder (folderId: string, userId: string, name: string) {
        const folder = await this.folderRepo.rename(folderId, userId, name);

        if(!folder) {
            throw new InternalServerErrorException("Couldn't rename the folder");
        }

        return folder;
    }

    async moveFolder (folderId: string, userId: string, parentId: string) {
        const folder = await this.folderRepo.move(folderId, userId, parentId);

        if(!folder) {
            throw new InternalServerErrorException("Couldn't move the folder");
        }

        return folder;
    }

    async findFolderById (folderId: string) {
        return this.folderRepo.findById(folderId);
    }

    async findFolderByLocation (parentId: string, folderName: string) {
        return this.folderRepo.findByLocation(parentId, folderName);
    }

    async findChildrenFolders (folderId: string) {
        return this.folderRepo.findChildrenFolders(folderId);
    }

    async findChildrenFiles (folderId: string) {
        return this.folderRepo.findChildrenFiles(folderId);
    }

    async findAllChildren (folderId: string) {
        return this.folderRepo.findAllChildren(folderId);
    }
}
