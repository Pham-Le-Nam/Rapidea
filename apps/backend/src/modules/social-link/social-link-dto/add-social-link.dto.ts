import { IsString } from "class-validator";

export class AddSocialLinkDto {
    @IsString()
    platform: string;
    
    @IsString()
    url: string;
}