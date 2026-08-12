import { ProjectRepository } from './project.repository';
export declare class ProjectService {
    private readonly projectRepo;
    constructor(projectRepo: ProjectRepository);
    createProject(userId: string, name: string, role: string, startedAt?: Date, endedAt?: Date, details?: string, logoId?: number): Promise<any>;
    deleteProjectById(id: string, userId: string): Promise<any>;
    updateProjectById(id: string, userId: string, name?: string, role?: string, startedAt?: Date, endedAt?: Date, details?: string, logoId?: number): Promise<any>;
    getProjectByUserId(userId: string): Promise<any>;
    isOwner(id: string, userId: string): Promise<boolean>;
}
