import { IsString, IsOptional } from "class-validator";

export class UpdateProjectLinkDto {
    @IsString()
    id: string;
    
    @IsOptional()
    @IsString()
    name?: string;
    
    @IsOptional()
    @IsString()
    url?: string
}