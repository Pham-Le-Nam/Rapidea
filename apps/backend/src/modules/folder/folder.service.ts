import { Injectable, Inject, InternalServerErrorException } from '@nestjs/common';
import { FolderRepository } from './folder.repository';
import { mkdir, rm } from "fs/promises";

@Injectable()
export class FolderService {
    constructor(
        @Inject('FOLDER_REPOSITORY')
        private readonly folderRepo: FolderRepository,
        private rootFolder = process.env.STORAGE_URL,
    ) {}

    async createFolder (userId: string, folderName: string, parentId?: string) {
        const folder = await this.folderRepo.create(userId, folderName, parentId);

        if (!folder) {
            throw new InternalServerErrorException("Couldn't create folder");
        }

        if (parentId) {
            await mkdir(`${this.rootFolder}/${folder.url}/${folderName}`, { recursive: true });
        }
        else {
            await mkdir(`${this.rootFolder}/${folderName}`, { recursive: true });
        }

        return folder;
    }

    async deleteFolder (folderId: string) {
        const folder = await this.folderRepo.delete(folderId);

        if (!folder) {
            throw new InternalServerErrorException("Couldn't delete folder");
        }

        if (folder.url != "") {
            await rm(`${this.rootFolder}/${folder.url}/${folder.name}`);
        }
        else {
            await rm(`${this.rootFolder}/${folder.name}`);
        }

        return folder;
    }

    async findFolderById (folderId: string) {
        return this.folderRepo.findById(folderId);
    }

    async findFolderByLocation (folderUrl: string, folderName: string) {
        return this.folderRepo.findByLocation(folderUrl, folderName);
    }

    async findFolderByUrl (folderUrl: string) {
        return this.folderRepo.findByUrl(folderUrl);
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
