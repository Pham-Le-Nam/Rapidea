import { IsString } from "class-validator";

export class AddProjectLinkDto {
    @IsString()
    projectId: string;
    
    @IsString()
    name: string;
    
    @IsString()
    url: string
}