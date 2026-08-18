import { IsString } from "class-validator";

export class UpdateSocialLinkDto {
    @IsString()
    id: string;
    
    @IsString()
    url?: string;
}