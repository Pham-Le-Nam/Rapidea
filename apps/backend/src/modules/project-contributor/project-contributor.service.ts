import { Injectable, Inject } from '@nestjs/common';
import { ProjectContributorRepository } from './project-contributor.repository';

@Injectable()
export class ProjectContributorService {
    constructor(
        @Inject('PROJECT_CONTRIBUTOR_REPOSITORY')
        private readonly projectContributorRepo: ProjectContributorRepository,
    ){}

    async createProjectContributor (projectId: string, userId: string, role: string) {
        return this.projectContributorRepo.create(projectId, userId, role);
    }

    async updateProjectContributor (projectId: string, userId: string, role?: string) {
        return this.projectContributorRepo.updateRole(projectId, userId, role);
    }

    async deleteProjectContributor (projectId: string, userId: string) {
        return this.projectContributorRepo.deleteOne(projectId, userId);
    }

    async getProjectContributors (projectId: string) {
        return this.projectContributorRepo.findContributors(projectId);
    }

    // async updateProjectContributors (updateProjectContributors: UpdateProjectContributorDto[], projectId: string) {
    //     let projectContributors: any[] = [];

    //     // Add all project contributors
    //     for (const updateProjectContributor of updateProjectContributors) {
    //         let projectContributor = await this.projectContributorRepo.findContributor(projectId, updateProjectContributor.userId);

    //         // If the contributor exists, update it
    //         if(projectContributor) {
    //             projectContributor = await this.updateProjectContributor(projectId, updateProjectContributor.userId, updateProjectContributor.role);
    //         }
    //         // Create new contributor if not exists
    //         else {
    //             if (!updateProjectContributor.role) {
    //                 throw new InternalServerErrorException("Missing Argument");
    //             }

    //             projectContributor = await this.createProjectContributor(projectId, updateProjectContributor.userId, updateProjectContributor.role);
    //         }

    //         // Delete the ones that does not exist
    //         const userIds = projectContributors.map(projectContributor => projectContributor.userId);
    //         await this.projectContributorRepo.deleteNotIn(projectId, userIds);

    //         projectContributors.push(projectContributor);
    //     }


    //     return this.projectContributorRepo.findContributors(projectId);
    // }

    
}