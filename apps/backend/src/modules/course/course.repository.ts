export interface CourseRepository {
    create(userId: string, title: string, folderId: string, description?: string, price?: number, currency?: string): Promise<any | null>;
    updateById(id: string, userId: string, title?: string, description?: string, price?: number, currency?: string): Promise<any>;
    findById(id: string): Promise<any | null>;
    findByUserId(userId: string, orderByField: string, order: 'asc' | 'desc', amount?: number): Promise<any | null>;
    deleteCourseById(id: string): Promise<any | null>;
}