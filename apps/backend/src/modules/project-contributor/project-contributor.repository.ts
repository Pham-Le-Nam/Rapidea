export interface ProjectContributorRepository {
    create(projectId: string, userId: string, role: string): Promise<any>;
    updateRole(projectId: string, userId: string, role?: string): Promise<any>;
    deleteOne(projectId: string, userId: string): Promise<any>;
    deleteNotIn(projectId: string, userIds: string[]): Promise<boolean>;
    findContributors(projectId: string): Promise<any>;
    findContributor(projectId: string, userId: string): Promise<any>;
}