import { IsString } from "class-validator";

export class DeleteFileInPostDto {
    @IsString()
    fileId: string;

    @IsString()
    postId: string;   
}