import { FileInPostRepository } from './file-in-post.repository';
import { FileService } from '../file/file.service';
import { PostService } from '../post/post.service';
import { TagsService } from '../tags/tags.service';
export declare class FileInPostService {
    private readonly fileInPostRepo;
    private readonly fileService;
    private readonly postService;
    private readonly tagsService;
    constructor(fileInPostRepo: FileInPostRepository, fileService: FileService, postService: PostService, tagsService: TagsService);
    addFileToPost(fileId: string, postId: string, userId: string): Promise<any>;
    removeFileFromPost(fileId: string, postId: string, userId: string): Promise<any>;
    getPostsByFileId(fileId: string): Promise<any>;
    getFilesByPostId(postId: string): Promise<any>;
}
