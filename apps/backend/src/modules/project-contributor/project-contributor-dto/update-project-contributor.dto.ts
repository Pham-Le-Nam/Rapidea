import { IsString, IsOptional } from 'class-validator';

export class UpdateProjectContributorDto {
    @IsString()
    projectId: string;

    @IsString()
    userId: string;
    
    @IsOptional()
    @IsString()
    role?: string;
}