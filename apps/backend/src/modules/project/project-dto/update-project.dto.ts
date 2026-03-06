import { IsInt, IsString, IsDate } from 'class-validator';

export class UpdateProjectDto {
    @IsString()
    id: string;
    
    @IsString()
    name?: string;
    
    @IsString()
    role?: string;
    
    @IsDate()
    startedAt?: Date;
    
    @IsDate()
    endedAt?: Date;
    
    @IsString()
    details?: string;
    
    @IsInt()
    logoId?: number
}