import { IsInt, IsString, IsDate } from 'class-validator';

export class AddEducationDto {
    @IsString()
    name: string;

    @IsString()
    major?: string;
    
    @IsString()
    degree?: string;
    
    @IsDate()
    startedAt?: Date;
    
    @IsDate()
    endedAt?: Date;
    
    @IsString()
    location?: string;
    
    @IsString()
    achievement?: string;
    
    @IsInt()
    logoId?: number
}