import { IsString } from "class-validator";

export class AddFolderDto {
    @IsString()
    folderName: string;

    @IsString()
    parentId: string;
}