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
import { TagsService } from '../tags/tags.service';

@Injectable()
export class FileService {
    constructor (
        @Inject('FILE_REPOSITORY')
        private readonly fileRepo: FileRepository,
        private readonly folderService: FolderService,
        @Inject(STORAGE_SERVICE)
        private readonly storage: StorageService,
        private readonly tagsService: TagsService,
    ) {}

    async createFile (uploadedFile: Express.Multer.File, userId: string, folderId: string) {
        const { originalname, mimetype, size, buffer } = uploadedFile;

        // Check if folder exist then get its url
        const folderUrl = await this.folderService.getFolderUrl(folderId);
        // Add a file value into the database
        const file = await this.fileRepo.create(folderId, originalname, mimetype, size, userId);

        await this.storage.writeFile(this.joinStorageKey(folderUrl, originalname), buffer);
        await this.generateFileTags(file.id, uploadedFile);

        return this.fileRepo.findById(file.id);
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

    private async generateFileTags(fileId: string, uploadedFile: Express.Multer.File) {
        const isTranscribable = uploadedFile.mimetype.startsWith('audio/') || uploadedFile.mimetype.startsWith('video/');
        let transcriptText = '';

        if (isTranscribable) {
            await this.tagsService.createTranscript(fileId);

            try {
                transcriptText = await this.tagsService.transcribeMedia(uploadedFile);
                await this.tagsService.completeTranscript(fileId, transcriptText);
            } catch (error: any) {
                await this.tagsService.failTranscript(fileId, error?.message ?? 'Transcription failed');
            }
        }

        const suggestionText = [
            uploadedFile.originalname,
            uploadedFile.mimetype,
            transcriptText,
        ].filter(Boolean).join('\n');
        const suggestions = await this.tagsService.suggestTags(suggestionText, 5);
        await this.tagsService.setFileSuggestedTags(fileId, suggestions);
    }
}
