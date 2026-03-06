import { IsInt, IsString, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class AddProjectDto {
    @IsString()
    name: string;
    
    @IsString()
    role: string;
    
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