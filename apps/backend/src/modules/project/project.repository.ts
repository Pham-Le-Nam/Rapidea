export interface ProjectRepository {
    create(userId: string, name: string, role: string, startedAt?: Date, endedAt?: Date, details?: string, logoId?: number): Promise<any>;
    updateById(id: string, name?: string, role?: string, startedAt?: Date, endedAt?: Date, details?: string, logoId?: number): Promise<any>;
    deleteById(id: string): Promise<any>;
    swapOrderById(idOne: string, idTwo: string): Promise<any>;
    getByUserId(userId: string): Promise<any>;
}