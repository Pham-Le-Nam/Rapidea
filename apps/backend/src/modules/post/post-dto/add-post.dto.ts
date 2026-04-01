import { IsJSON, IsString } from "class-validator";


export class AddPostDto {
    @IsString()
    title: string;

    @IsJSON()
    content: JSON;
}