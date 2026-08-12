export interface PhotoRepository {
    create(userId: string, extension: string, url?: string): Promise<any>;
    delete(id: number): Promise<any>;
    findById(id: number): Promise<any>;
}
