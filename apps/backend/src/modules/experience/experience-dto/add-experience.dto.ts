import { IsInt, IsString, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class AddExperienceDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    position?: string;
    
    @IsOptional()
    @IsString()
    role?: string;
    
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    startedAt?: Date;
    
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    endedAt?: Date;
    
    @IsOptional()
    @IsString()
    location?: string;
    
    @IsOptional()
    @IsString()
    achievement?: string;
    
    @IsOptional()
    @IsInt()
    logoId?: number
}