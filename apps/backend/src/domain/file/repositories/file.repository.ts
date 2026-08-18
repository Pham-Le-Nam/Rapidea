export interface FileRepository {
    create(folderId: string, name: string, mimeType: string, size: number, userId: string): Promise<any>;
    updateById(id: string, userId: string, folderId?: string, name?: string): Promise<any>;
    findById(id: string): Promise<any>;
    findByFolderId(folderId: string): Promise<any>;
    deleteById(id: string, userId: string): Promise<any>;
    updateModeration(id: string, moderation: { status: any; score: number | null; categories: any; message?: string | null }): Promise<any>;
    // Copy method should be implemented in the controller
}
