import { ExperienceRepository } from './experience.repository';
export declare class ExperienceService {
    private readonly experienceRepo;
    constructor(experienceRepo: ExperienceRepository);
    createExperience(userId: string, name: string, position?: string, role?: string, startedAt?: Date, endedAt?: Date, location?: string, achievement?: string, logoId?: number): Promise<any>;
    deleteExperienceById(id: string, userId: string): Promise<any>;
    updateExperienceById(userId: string, id: string, name?: string, position?: string, role?: string, startedAt?: Date, endedAt?: Date, location?: string, achievement?: string, logoId?: number): Promise<any>;
    getExperienceByUserId(userId: string): Promise<any>;
}
