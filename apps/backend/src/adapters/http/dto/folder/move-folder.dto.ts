import { IsString } from "class-validator";

export class MoveFolderDto {
    @IsString()
    folderId: string;
    
    @IsString()
    parentId: string;
}