import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

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

    @IsOptional()
    @IsNumber()
    thumbnailId?: number;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags?: string[];
}
