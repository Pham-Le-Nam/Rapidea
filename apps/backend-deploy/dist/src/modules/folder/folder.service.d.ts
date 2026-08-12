import { FolderRepository } from './folder.repository';
import { StorageService } from '../storage/storage.service';
export declare class FolderService {
    private readonly folderRepo;
    private readonly storage;
    constructor(folderRepo: FolderRepository, storage: StorageService);
    createFolder(userId: string, folderName: string, parentId?: string): Promise<any>;
    deleteFolder(folderId: string, userId: string): Promise<any>;
    renameFolder(folderId: string, userId: string, name: string): Promise<any>;
    moveFolder(folderId: string, userId: string, parentId: string): Promise<any>;
    findFolderById(folderId: string): Promise<any>;
    findFolderByLocation(folderName: string, parentId?: string): Promise<any>;
    findChildrenFolders(folderId: string): Promise<any>;
    findChildrenFiles(folderId: string): Promise<any>;
    findAllChildren(folderId: string): Promise<any>;
    getFolderUrl(folderId: string): Promise<string>;
}
