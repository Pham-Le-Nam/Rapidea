import { IsString } from 'class-validator';

export class AddProjectContributorDto {
    @IsString()
    projectId: string;

    @IsString()
    userId: string;
    
    @IsString()
    role: string;
}