import { PrismaService } from '../../prisma/prisma.service';
import { EducationRepository } from '../../modules/education/education.repository';
export declare class PrismaEducationRepository implements EducationRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, name: string, major?: string, degree?: string, startedAt?: Date, endedAt?: Date, location?: string, achievement?: string, logoId?: number): Promise<any>;
    updateById(userId: string, id: string, name?: string, major?: string, degree?: string, startedAt?: Date, endedAt?: Date, location?: string, achievement?: string, logoId?: number): Promise<any>;
    deleteById(id: string, userId: string): Promise<any>;
    swapOrderById(firstId: string, secondId: string): Promise<any>;
    getByUserId(userId: string): Promise<any>;
}
