export interface FolderRepository {
    create(userId: string, name: string, parentId?: string): Promise<any>;
    delete(id: string): Promise<any>;
    findById(id: string): Promise<any>;
    findByLocation(url: string, name: string): Promise<any>;
    findByUrl(url: string): Promise<any>;
    findChildrenFolders(id: string): Promise<any>;
    findChildrenFiles(id: string): Promise<any>;
    findAllChildren(id: string): Promise<any>;
}