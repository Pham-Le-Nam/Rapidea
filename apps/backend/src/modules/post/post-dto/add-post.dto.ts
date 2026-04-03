import { IsObject, IsOptional, IsString } from "class-validator";

export class AddPostDto {
    @IsString()
    title: string;

    @IsObject()
    content: Record<string, any>;

    @IsOptional()
    @IsString()
    courseId?: string;
}