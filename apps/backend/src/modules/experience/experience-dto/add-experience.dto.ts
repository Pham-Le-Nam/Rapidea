import { IsInt, IsString, IsDate } from 'class-validator';

export class AddExperienceDto {
    @IsString()
    name: string;

    @IsString()
    position?: string;
    
    @IsString()
    role?: string;
    
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