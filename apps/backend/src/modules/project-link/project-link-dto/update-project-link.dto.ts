import { IsString } from "class-validator";

export class UpdateProjectLinkDto {
    @IsString()
    id: string;
    
    @IsString()
    name?: string;
    
    @IsString()
    url?: string
}