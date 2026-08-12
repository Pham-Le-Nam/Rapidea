import { PrismaService } from '../../prisma/prisma.service';
import { ExperienceRepository } from '../../modules/experience/experience.repository';
export declare class PrismaExperienceRepository implements ExperienceRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, name: string, position?: string, role?: string, startedAt?: Date, endedAt?: Date, location?: string, achievement?: string, logoId?: number): Promise<any>;
    updateById(userId: string, id: string, name?: string, position?: string, role?: string, startedAt?: Date, endedAt?: Date, location?: string, achievement?: string, logoId?: number): Promise<any>;
    deleteById(id: string, userId: string): Promise<any>;
    swapOrderById(firstId: string, secondId: string): Promise<any>;
    getByUserId(userId: string): Promise<any>;
}
