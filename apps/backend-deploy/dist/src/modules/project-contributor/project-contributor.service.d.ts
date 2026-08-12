import { ProjectContributorRepository } from './project-contributor.repository';
export declare class ProjectContributorService {
    private readonly projectContributorRepo;
    constructor(projectContributorRepo: ProjectContributorRepository);
    createProjectContributor(projectId: string, userId: string, role: string): Promise<any>;
    updateProjectContributor(projectId: string, userId: string, role?: string): Promise<any>;
    deleteProjectContributor(projectId: string, userId: string): Promise<any>;
    getProjectContributors(projectId: string): Promise<any>;
}
