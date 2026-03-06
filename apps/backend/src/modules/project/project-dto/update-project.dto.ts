import { IsInt, IsString, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProjectDto {
    @IsString()
    id: string;
    
    @IsOptional()
    @IsString()
    name?: string;
    
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
    details?: string;
    
    @IsOptional()
    @IsInt()
    logoId?: number
}