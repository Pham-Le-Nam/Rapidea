import { FileRepository } from './file.repository';
import { FolderService } from '../folder/folder.service';
import { StorageService } from '../storage/storage.service';
import { TagsService } from '../tags/tags.service';
import { ContentModerationService } from './content-moderation.service';
import { NotificationService } from '../notification/notification.service';
export declare class FileService {
    private readonly fileRepo;
    private readonly folderService;
    private readonly storage;
    private readonly tagsService;
    private readonly moderation;
    private readonly notifications;
    constructor(fileRepo: FileRepository, folderService: FolderService, storage: StorageService, tagsService: TagsService, moderation: ContentModerationService, notifications: NotificationService);
    createFile(uploadedFile: Express.Multer.File, userId: string, folderId: string): Promise<any>;
    deleteFile(fileId: string, userId: string): Promise<any>;
    updateFile(fileId: string, userId: string, folderId?: string, name?: string): Promise<any>;
    getFileById(fileId: string): Promise<any>;
    getFileUrl(fileId: string): Promise<string>;
    private joinStorageKey;
    private generateFileTags;
}
