import { 
    Injectable, 
    Inject, 
    InternalServerErrorException, 
    NotFoundException 
} from '@nestjs/common';
import { FileRepository } from './file.repository';
import { FolderService } from '../folder/folder.service';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class FileService {
    constructor (
        @Inject('FILE_REPOSITORY')
        private readonly fileRepo: FileRepository,
        private readonly folderService: FolderService,
    ) {}

    private rootFolder = process.env.STORAGE_URL as string;

    async createFile (uploadedFile: Express.Multer.File, userId: string, folderId: string) {
        const { originalname, mimetype, size, buffer } = uploadedFile;

        // Check if folder exist then get its url
        const folderUrl = await this.folderService.getFolderUrl(folderId);
        // Add a file value into the database
        const file = await this.fileRepo.create(folderId, originalname, mimetype, size, userId);

        const url = `${this.rootFolder}/${folderUrl}`;
        
        await fs.mkdir(url, { recursive: true })

        const filePath = path.join(url, originalname);

        await fs.writeFile(filePath, buffer);

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

        const filePath = path.join(this.rootFolder, folderUrl, file.name);
        
        await fs.rm(filePath, { force: true });

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

        const oldPath = path.join(this.rootFolder, oldFolderUrl, oldFile.name);
        const newPath = path.join(this.rootFolder, updatedFolderUrl, newFileName);

        await fs.rename(oldPath, newPath);

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
        const fileUrl = path.join(this.rootFolder, folderUrl, file.name);

        return fileUrl;
    }
}