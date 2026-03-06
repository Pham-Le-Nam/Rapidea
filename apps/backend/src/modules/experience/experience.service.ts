import { Injectable, Inject, InternalServerErrorException } from '@nestjs/common';
import { ExperienceRepository } from './experience.repository';

@Injectable()
export class ExperienceService {
    constructor(
        @Inject('EXPERIENCE_REPOSITORY')
        private readonly experienceRepo: ExperienceRepository,
    ) {}

    async createExperience(userId: string, name: string, position?: string, role?: string, startedAt?: Date, endedAt?: Date, location?: string, achievement?: string, logoId?: number) {
        const experience = await this.experienceRepo.create(userId, name, position, role, startedAt, endedAt, location, achievement, logoId);

        if (!experience) {
            throw new InternalServerErrorException("Couldn't create experience");
        }

        return this.experienceRepo.getByUserId(userId);
    }

    async deleteExperienceById(id: string, userId: string) {
        const experience = await this.experienceRepo.deleteById(id, userId);

        if (!experience) {
            throw new InternalServerErrorException("Couldn't create experience");
        }

        return this.experienceRepo.getByUserId(userId);
    }

    async updateExperienceById(userId: string, id: string, name?: string, position?: string, role?: string, startedAt?: Date, endedAt?: Date, location?: string, achievement?: string, logoId?: number) {
        const experience = await this.experienceRepo.updateById(userId, id, name, position, role, startedAt, endedAt, location, achievement, logoId);

        if (!experience) {
            throw new InternalServerErrorException("Couldn't create experience");
        }

        return this.experienceRepo.getByUserId(userId);
    }

    async getExperienceByUserId(userId: string) {
        return this.experienceRepo.getByUserId(userId);
    }
}
