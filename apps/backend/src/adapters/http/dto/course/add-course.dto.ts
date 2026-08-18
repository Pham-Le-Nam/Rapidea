import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class AddCourseDto {    
    @IsString()
    title!: string;
    
    @IsOptional()
    @IsString()
    description?: string;
    
    @IsOptional()
    @IsNumber()
    price?: number;
    
    @IsOptional()
    @IsString()
    currency?: string

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags?: string[];
}
