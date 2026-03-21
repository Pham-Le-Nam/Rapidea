import { IsOptional, IsString, IsNumber } from "class-validator";

export class AddCourseDto {    
    @IsString()
    title: string;
    
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