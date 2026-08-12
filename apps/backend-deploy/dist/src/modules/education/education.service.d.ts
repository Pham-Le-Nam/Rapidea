import { EducationRepository } from './education.repository';
export declare class EducationService {
    private readonly educationRepo;
    constructor(educationRepo: EducationRepository);
    createEducation(userId: string, name: string, major?: string, degree?: string, startedAt?: Date, endedAt?: Date, location?: string, achievement?: string, logoId?: number): Promise<any>;
    deleteEducationById(id: string, userId: string): Promise<any>;
    updateEducationById(userId: string, id: string, name?: string, major?: string, degree?: string, startedAt?: Date, endedAt?: Date, location?: string, achievement?: string, logoId?: number): Promise<any>;
    getEducationByUserId(userId: string): Promise<any>;
}
