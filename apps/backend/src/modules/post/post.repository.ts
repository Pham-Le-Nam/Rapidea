export interface PostRepository {
    create(userId: string, title?: string, content?: any): Promise<any | null>;
    deleteById(id: string): Promise<any | null>;
    updateById(id: string, title?: string, content?: any): Promise<any | null>;
    findById(id: string): Promise<any | null>;
}