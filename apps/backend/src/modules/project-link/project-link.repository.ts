export interface ProjectLinkRepository {
    create(projectId: string, name: string, url: string): Promise<any>;
    update(id:string, projectId: string, name?: string, url?: string): Promise<any>;
    delete(id: string): Promise<any>;
    findById(id: string): Promise<any>
    findLinks(projectId: string): Promise<any>;
}