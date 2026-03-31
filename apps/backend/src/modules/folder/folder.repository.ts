export interface FolderRepository {
    create(userId: string, name: string, parentId?: string): Promise<any>;
    delete(id: string, userId: string): Promise<any>;
    rename(id: string, userId: string, name: string): Promise<any>;
    move(id: string, userId: string, parentId: string): Promise<any>;
    getUrl(id: string): Promise<string>;
    findById(id: string): Promise<any>;
    findByLocation(name: string, parentId?: string): Promise<any>;
    findChildrenFolders(id: string): Promise<any>;
    findChildrenFiles(id: string): Promise<any>;
    findAllChildren(id: string): Promise<any>;
}