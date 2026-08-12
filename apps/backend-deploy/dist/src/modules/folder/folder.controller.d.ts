import { FolderService } from "./folder.service";
import { AddFolderDto } from "./folder-dto/add-folder.dto";
import { RenameFolderDto } from "./folder-dto/rename-folder.dto";
import { MoveFolderDto } from "./folder-dto/move-folder.dto";
export declare class FolderController {
    private readonly folderService;
    constructor(folderService: FolderService);
    getUserFolders(username: string, req: any): Promise<{
        rootFolder: any;
        freeFolder: any;
        isOwner: boolean;
    }>;
    getFolderById(id: string, req: any): Promise<{
        folder: any;
        isOwner: boolean;
        childrenFolders: any;
        childrenFiles: any;
    }>;
    addFolder(req: any, addFolderdto: AddFolderDto): Promise<any>;
    renameFolder(req: any, renameFolderDto: RenameFolderDto): Promise<any>;
    moveFolder(req: any, moveFolderDto: MoveFolderDto): Promise<any>;
    deleteFolder(req: any, data: {
        folderId: string;
    }): Promise<any>;
}
