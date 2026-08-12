import { PrismaService } from '../../prisma/prisma.service';
import { FileInPostRepository } from '../../modules/file-in-post/file-in-post.repository';
export declare class PrismaFileInPostRepository implements FileInPostRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(fileId: string, postId: string, userId: string): Promise<any>;
    delete(fileId: string, postId: string, userId: string): Promise<any>;
    getPosts(fileId: string): Promise<any>;
    getFiles(postId: string): Promise<any>;
}
