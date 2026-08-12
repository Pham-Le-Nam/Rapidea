import { FileInPostService } from './file-in-post.service';
import { AddFileInPostDto } from './file-in-post-dto/add-file-in-post.dto';
import { DeleteFileInPostDto } from './file-in-post-dto/delete-file-in-post.dto';
export declare class FileInPostController {
    private readonly fileInPostService;
    constructor(fileInPostService: FileInPostService);
    addFileToPost(req: any, addFileInPostDto: AddFileInPostDto): Promise<any>;
    deleteFileFromPost(req: any, deleteFileInPostDto: DeleteFileInPostDto): Promise<any>;
    getFilesOfPost(req: any, data: {
        postId: string;
    }): Promise<any>;
}
