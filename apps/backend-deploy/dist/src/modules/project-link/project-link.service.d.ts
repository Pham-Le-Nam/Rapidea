import { ProjectLinkRepository } from './project-link.repository';
export declare class ProjectLinkService {
    private readonly projectLinkRepo;
    constructor(projectLinkRepo: ProjectLinkRepository);
    createProjectLink(projectId: string, name: string, url: string): Promise<any>;
    updateProjectLink(id: string, name?: string, url?: string): Promise<any>;
    deleteProjectLink(id: string): Promise<any>;
    getProjectLinks(projectId: string): Promise<any>;
    getProjectLinkById(id: string): Promise<any>;
}
