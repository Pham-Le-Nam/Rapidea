import { IsOptional, IsString } from "class-validator";


export class UpdateFileDto {
    @IsString()
    fileId: string;
    
    @IsOptional()
    @IsString()
    folderId?: string;
    
    @IsOptional()
    @IsString()
    name?: string
}