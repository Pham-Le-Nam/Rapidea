import { IsString } from 'class-validator';

export class DeleteProjectContributorDto {
    @IsString()
    projectId: string;

    @IsString()
    userId: string;
}