export interface FileInPostRepository {
    create(fileId: string, postId: string, userId: string): Promise<any>;
    delete(fileId: string, postId: string, userId: string): Promise<any>;
    getPosts(fileId: string): Promise<any>;
    getFiles(postId: string): Promise<any>;
}