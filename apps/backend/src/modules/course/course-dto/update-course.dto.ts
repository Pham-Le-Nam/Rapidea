import { IsOptional, IsString, IsNumber } from "class-validator";

export class UpdateCourseDto {
    @IsOptional()    
    @IsString()
    title?: string;
    
    @IsOptional()
    @IsString()
    description?: string;
    
    @IsOptional()
    @IsNumber()
    price?: number;
    
    @IsOptional()
    @IsString()
    currency?: string
}