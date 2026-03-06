import { Injectable, Inject } from '@nestjs/common';
import { ProjectLinkRepository } from './project-link.repository';

@Injectable()
export class ProjectLinkService {
    constructor(
        @Inject('PROJECT_LINK_REPOSITORY')
        private readonly projectLinkRepo: ProjectLinkRepository,
    ){}

    async createProjectLink (projectId: string, name: string, url: string) {
        return this.projectLinkRepo.create(projectId, name, url);
    }

    async updateProjectLink (id: string, name?: string, url?: string) {
        return this.projectLinkRepo.update(id, name, url);
    }

    async deleteProjectLink (id: string) {
        return this.projectLinkRepo.delete(id)
    }

    async getProjectLinks (projectId: string) {
        return this.projectLinkRepo.findLinks(projectId);
    }

    async getProjectLinkById(id: string) {
        return this.projectLinkRepo.findById(id);
    }
}