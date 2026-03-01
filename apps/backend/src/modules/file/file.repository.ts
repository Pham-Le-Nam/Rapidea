export interface FileRepository {
    create(folderId: string, name: string, mimeType: string, size: number, userId: string): Promise<any>;
    updateById(id: string, folderId?: string, name?: string): Promise<any>;
    findById(id: string): Promise<any>;
    findByFolderId(folderId: string): Promise<any>;
    deleteById(id: string): Promise<any>;
    // Copy method should be implemented in the controller
}