import { 
    Injectable, 
    Inject, 
    InternalServerErrorException, 
    NotFoundException 
} from '@nestjs/common';
import { FileRepository } from './file.repository';
import { FolderService } from '../folder/folder.service';
import path from 'path';
import { STORAGE_SERVICE } from '../storage/storage.constants';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class FileService {
    constructor (
        @Inject('FILE_REPOSITORY')
        private readonly fileRepo: FileRepository,
        private readonly folderService: FolderService,
        @Inject(STORAGE_SERVICE)
        private readonly storage: StorageService,
    ) {}

    async createFile (uploadedFile: Express.Multer.File, userId: string, folderId: string) {
        const { originalname, mimetype, size, buffer } = uploadedFile;

        // Check if folder exist then get its url
        const folderUrl = await this.folderService.getFolderUrl(folderId);
        // Add a file value into the database
        const file = await this.fileRepo.create(folderId, originalname, mimetype, size, userId);

        await this.storage.writeFile(this.joinStorageKey(folderUrl, originalname), buffer);

        return file;
    }

    async deleteFile (fileId: string, userId: string) {
        const file = await this.fileRepo.deleteById(fileId, userId);

        if (!file) {
            throw new NotFoundException("","File not found");
        }

        const folderUrl = await this.folderService.getFolderUrl(file.folderId);

        if (!folderUrl) {
            throw new InternalServerErrorException("", "Couldn't get folder URL");
        }

        await this.storage.deleteFile(this.joinStorageKey(folderUrl, file.name));

        return file;
    }

    async updateFile (fileId: string, userId: string, folderId?: string, name?: string) {
        const oldFile = await this.fileRepo.findById(fileId);

        const ext = path.extname(oldFile.name); // ".png", ".pdf", etc.

        const newFileName = name
            ? name.endsWith(ext)
            ? name
            : `${name}${ext}`
            : oldFile.name;

        const updatedFile = await this.fileRepo.updateById(fileId, userId, folderId, newFileName);

        const oldFolderUrl = await this.folderService.getFolderUrl(oldFile.folderId);
        const updatedFolderUrl = await this.folderService.getFolderUrl(updatedFile.folderId);

        if (!oldFolderUrl || !updatedFolderUrl) {
            throw new InternalServerErrorException("", "Couldn't update file");
        }

        await this.storage.moveFile(
            this.joinStorageKey(oldFolderUrl, oldFile.name),
            this.joinStorageKey(updatedFolderUrl, newFileName),
        );

        return updatedFile;
    }

    async getFileById (fileId: string) {
        const file = await this.fileRepo.findById(fileId);

        if (!file) {
            throw new NotFoundException("", "File not found");
        }
        
        return file;
    }

    async getFileUrl (fileId: string) {
        const file = await this.fileRepo.findById(fileId);
        const folderUrl = await this.folderService.getFolderUrl(file.folderId);
        const fileUrl = this.storage.getPublicUrl(this.joinStorageKey(folderUrl, file.name));

        return fileUrl;
    }

    private joinStorageKey(...parts: string[]) {
        return path.posix.join(...parts.map((part) => part.replace(/\\/g, '/')));
    }
}
