import { Injectable, Inject, InternalServerErrorException } from '@nestjs/common';
import { FolderRepository } from './folder.repository';
import { STORAGE_SERVICE } from '../storage/storage.constants';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class FolderService {
    constructor(
        @Inject('FOLDER_REPOSITORY')
        private readonly folderRepo: FolderRepository,
        @Inject(STORAGE_SERVICE)
        private readonly storage: StorageService,
    ) {}

    async createFolder (userId: string, folderName: string, parentId?: string) {
        const folder = await this.folderRepo.create(userId, folderName, parentId);

        if (!folder) {
            throw new InternalServerErrorException("Couldn't create folder");
        }

        const url = await this.folderRepo.getUrl(folder.id);

        await this.storage.ensureDirectory(url);

        return folder;
    }

    async deleteFolder (folderId: string, userId: string) {
        const url = await this.folderRepo.getUrl(folderId);

        const folder = await this.folderRepo.delete(folderId, userId);

        if (!folder) {
            throw new InternalServerErrorException("Couldn't delete folder");
        }

        await this.storage.deleteDirectory(url);

        return folder;
    }

    async renameFolder (folderId: string, userId: string, name: string) {
        const oldUrl = await this.folderRepo.getUrl(folderId);
        const folder = await this.folderRepo.rename(folderId, userId, name);
        const newUrl = await this.folderRepo.getUrl(folder.id);

        if(!newUrl || !oldUrl) {
            throw new InternalServerErrorException("Couldn't rename the folder");
        }

        await this.storage.moveDirectory(oldUrl, newUrl);

        return folder;
    }

    async moveFolder (folderId: string, userId: string, parentId: string) {
        const oldUrl = await this.folderRepo.getUrl(folderId);
        const folder = await this.folderRepo.move(folderId, userId, parentId);
        const newUrl = await this.folderRepo.getUrl(folder.id);

        if(!newUrl || !oldUrl) {
            throw new InternalServerErrorException("Couldn't move the folder");
        }

        await this.storage.moveDirectory(oldUrl, newUrl);

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
