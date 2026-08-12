import { PrismaService } from '../../prisma/prisma.service';
import { ProjectRepository } from '../../modules/project/project.repository';
export declare class PrismaProjectRepository implements ProjectRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, name: string, role: string, startedAt?: Date, endedAt?: Date, details?: string, logoId?: number): Promise<any>;
    updateById(id: string, userId: string, name?: string, role?: string, startedAt?: Date, endedAt?: Date, details?: string, logoId?: number): Promise<any>;
    deleteById(id: string, userId: string): Promise<any>;
    swapOrderById(firstId: string, secondId: string): Promise<any>;
    getByUserId(userId: string): Promise<any>;
    checkOwner(id: string, userId: string): Promise<boolean>;
}
