import { IsObject, IsString } from "class-validator";

export class AddPostDto {
    @IsString()
    title: string;

    @IsObject()
    content: Record<string, any>;
}