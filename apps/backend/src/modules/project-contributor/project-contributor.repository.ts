export interface ProjectContributorRepository {
    create(projectId: string, userId: string, role: string): Promise<any>;
    updateRole(projectId: string, userId: string, role?: string): Promise<any>;
    delete(projectId: string, userId: string): Promise<any>;
    findContributors(projectId: string): Promise<any>;
}