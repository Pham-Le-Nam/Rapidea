import { IsInt, IsString, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateExperienceDto {
    @IsString()
    id: string; 
    
    @IsOptional()
    @IsString()
    name?: string; 
    
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
    @Type(() => Number)
    @IsInt()
    logoId?: number
}