import { ExperienceService } from "./experience.service";
import { UsersService } from "../users/users.service";
import { AddExperienceDto } from "./experience-dto/add-experience.dto";
import { UpdateExperienceDto } from "./experience-dto/update-experience.dto";
export declare class ExperienceController {
    private readonly experienceService;
    private readonly userService;
    constructor(experienceService: ExperienceService, userService: UsersService);
    getExperience(username: string, req: any): Promise<{
        experience: any;
        isOwner: boolean;
    }>;
    addExperience(req: any, addExperienceDto: AddExperienceDto): Promise<any>;
    updateExperience(req: any, updateExperienceDto: UpdateExperienceDto): Promise<any>;
    deleteExperience(req: any, id: string): Promise<any>;
}
