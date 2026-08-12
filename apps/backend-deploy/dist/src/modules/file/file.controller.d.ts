import { FileService } from "./file.service";
import { UpdateFileDto } from "./file-dto/update-file.dto";
export declare class FileController {
    private readonly fileService;
    constructor(fileService: FileService);
    getFileUrl(req: any, id: string): Promise<string>;
    getFile(req: any, id: string): Promise<{
        file: any;
        isOwner: boolean;
    }>;
    uploadFile(file: Express.Multer.File, req: any, data: {
        folderId: string;
    }): Promise<any>;
    deleteFile(req: any, data: {
        fileId: string;
    }): Promise<any>;
    updateFile(req: any, updateFileDto: UpdateFileDto): Promise<any>;
}
