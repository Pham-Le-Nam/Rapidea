export interface EducationRepository {
    create(userId: string, name: string, major?: string, degree?: string, startedAt?: Date, endedAt?: Date, location?: string, achievement?: string, logoId?: number): Promise<any>;
    updateById(id: string, userId: string, name?: string, major?: string, degree?: string, startedAt?: Date, endedAt?: Date, location?: string, achievement?: string, logoId?: number): Promise<any>;
    deleteById(id: string, userId: string): Promise<any>;
    swapOrderById(idOne: string, idTwo: string): Promise<any>;
    getByUserId(userId: string): Promise<any>;
}