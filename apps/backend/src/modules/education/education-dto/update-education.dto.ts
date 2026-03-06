import { IsInt, IsString, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateEducationDto {
    @IsString()
    id: string; 
    
    @IsOptional()
    @IsString()
    name?: string; 
    
    @IsOptional()
    @IsString()
    major?: string; 
    
    @IsOptional()
    @IsString()
    degree?: string; 
    
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