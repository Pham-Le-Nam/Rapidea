import { Injectable, Inject, InternalServerErrorException } from '@nestjs/common';
import { FolderRepository } from './folder.repository';
import { mkdir, rm, rename } from "fs/promises";
import path from 'path';

@Injectable()
export class FolderService {
    private rootFolder = process.env.STORAGE_URL as string;

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
        const oldUrl = await this.folderRepo.getUrl(folderId);
        const folder = await this.folderRepo.rename(folderId, userId, name);
        const newUrl = await this.folderRepo.getUrl(folder.id);

        if(!newUrl || !oldUrl) {
            throw new InternalServerErrorException("Couldn't rename the folder");
        }

        const oldPath = path.join(this.rootFolder, oldUrl);
        const newPath = path.join(this.rootFolder, newUrl);

        await rename(oldPath, newPath);        

        return folder;
    }

    async moveFolder (folderId: string, userId: string, parentId: string) {
        const oldUrl = await this.folderRepo.getUrl(folderId);
        const folder = await this.folderRepo.move(folderId, userId, parentId);
        const newUrl = await this.folderRepo.getUrl(folder.id);

        if(!newUrl || !oldUrl) {
            throw new InternalServerErrorException("Couldn't move the folder");
        }

        const oldPath = path.join(this.rootFolder, oldUrl);
        const newPath = path.join(this.rootFolder, newUrl);

        await rename(oldPath, newPath); 

        return folder;
    }

    async findFolderById (folderId: string) {
        return this.folderRepo.findById(folderId);
    }

    async findFolderByLocation ( folderName: string, parentId?: string) {
        return this.folderRepo.findByLocation(folderName, parentId);
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

    async getFolderUrl (folderId: string) {
        return this.folderRepo.getUrl(folderId);
    }
}
