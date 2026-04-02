import { IsString } from "class-validator";

export class AddFileInPostDto {
    @IsString()
    fileId: string;

    @IsString()
    postId: string;   
}