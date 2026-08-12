import { PrismaService } from '../../prisma/prisma.service';
import { ProjectLinkRepository } from '../../modules/project-link/project-link.repository';
export declare class PrismaProjectLinkRepository implements ProjectLinkRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(projectId: string, name: string, url: string): Promise<any>;
    update(id: string, name?: string, url?: string): Promise<any>;
    delete(id: string): Promise<any>;
    findById(id: string): Promise<any>;
    findLinks(projectId: string): Promise<any>;
}
