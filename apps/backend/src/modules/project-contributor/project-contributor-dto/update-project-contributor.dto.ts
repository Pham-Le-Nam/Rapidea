import { IsString } from 'class-validator';

export class UpdateProjectContributorDto {
    @IsString()
    projectId: string;

    @IsString()
    userId: string;
    
    @IsString()
    role?: string;
}