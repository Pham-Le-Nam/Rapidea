import { Injectable, Inject, InternalServerErrorException } from '@nestjs/common';
import { ProjectRepository } from './project.repository';

@Injectable()
export class ProjectService {
    constructor(
        @Inject('PROJECT_REPOSITORY')
        private readonly projectRepo: ProjectRepository,
    ) {}

    async createProject(userId: string, name: string, role: string, startedAt?: Date, endedAt?: Date, details?: string, logoId?: number) {
        const project = await this.projectRepo.create(userId, name, role, startedAt, endedAt, details, logoId);

        if (!project) {
            throw new InternalServerErrorException("Couldn't create project");
        }

        return this.projectRepo.getByUserId(userId);
    }

    async deleteProjectById(id: string, userId: string) {
        const project = await this.projectRepo.deleteById(id, userId);

        if (!project) {
            throw new InternalServerErrorException("Couldn't create project");
        }

        return this.projectRepo.getByUserId(userId);
    }

    async updateProjectById(id: string, userId: string, name?: string, role?: string, startedAt?: Date, endedAt?: Date, details?: string, logoId?: number) {
        const project = await this.projectRepo.updateById(id, userId, name, role, startedAt, endedAt, details, logoId);

        if (!project) {
            throw new InternalServerErrorException("Couldn't create project");
        }

        return this.projectRepo.getByUserId(userId);
    }

    async getProjectByUserId(userId: string) {
        return this.projectRepo.getByUserId(userId);
    }

    async isOwner(id: string, userId: string) {
        return this.projectRepo.checkOwner(id, userId);
    }
}
