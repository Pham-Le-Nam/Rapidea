import { Injectable, Inject, InternalServerErrorException } from '@nestjs/common';
import { EducationRepository } from './education.repository';

@Injectable()
export class EducationService {
    constructor(
        @Inject('EDUCATION_REPOSITORY')
        private readonly educationRepo: EducationRepository,
    ) {}

    async createEducation(userId: string, name: string, major?: string, degree?: string, startedAt?: Date, endedAt?: Date, location?: string, achievement?: string, logoId?: number) {
        const education = await this.educationRepo.create(userId, name, major, degree, startedAt, endedAt, location, achievement, logoId);

        if (!education) {
            throw new InternalServerErrorException("Couldn't create education");
        }

        return this.educationRepo.getByUserId(userId);
    }

    async deleteEducationById(id: string, userId: string) {
        const education = await this.educationRepo.deleteById(id, userId);

        if (!education) {
            throw new InternalServerErrorException("Couldn't create education");
        }

        return this.educationRepo.getByUserId(userId);
    }

    async updateEducationById(userId: string, id: string, name?: string, major?: string, degree?: string, startedAt?: Date, endedAt?: Date, location?: string, achievement?: string, logoId?: number) {
        const education = await this.educationRepo.updateById(userId, id, name, major, degree, startedAt, endedAt, location, achievement, logoId);

        if (!education) {
            throw new InternalServerErrorException("Couldn't create education");
        }

        return this.educationRepo.getByUserId(userId);
    }

    async getEducationByUserId(userId: string) {
        return this.educationRepo.getByUserId(userId);
    }
}
