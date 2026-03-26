import { IsString } from "class-validator";

export class RenameFolderDto {
    @IsString()
    folderId: string;

    @IsString()
    name: string;
}