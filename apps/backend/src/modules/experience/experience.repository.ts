export interface ExperienceRepository {
    create(userId: string, name: string, position?: string, role?: string, startedAt?: Date, endedAt?: Date, location?: string, achievement?: string, logoId?: number): Promise<any>;
    updateById(id: string, name?: string, position?: string, role?: string, startedAt?: Date, endedAt?: Date, location?: string, achievement?: string, logoId?: number): Promise<any>;
    deleteById(id: string): Promise<any>;
    swapOrderById(idOne: string, idTwo: string): Promise<any>;
    getByUserId(userId: string): Promise<any>;
}