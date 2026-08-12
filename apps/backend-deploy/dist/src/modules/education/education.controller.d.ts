import { EducationService } from "./education.service";
import { UsersService } from "../users/users.service";
import { AddEducationDto } from "./education-dto/add-education.dto";
import { UpdateEducationDto } from "./education-dto/update-education.dto";
export declare class EducationController {
    private readonly educationService;
    private readonly userService;
    constructor(educationService: EducationService, userService: UsersService);
    getEducations(username: string, req: any): Promise<{
        education: any;
        isOwner: boolean;
    }>;
    addEducation(req: any, addEducationDto: AddEducationDto): Promise<any>;
    updateEducation(req: any, updateEducationDto: UpdateEducationDto): Promise<any>;
    deleteEducation(req: any, id: string): Promise<any>;
}
