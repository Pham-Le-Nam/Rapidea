import { SocialLinkService } from "./social-link.service";
import { UsersService } from "../users/users.service";
import { AddSocialLinkDto } from "./social-link-dto/add-social-link.dto";
import { UpdateSocialLinkDto } from "./social-link-dto/update-social-link.dto";
export declare class SocialLinkController {
    private readonly socialLinkService;
    private readonly usersService;
    constructor(socialLinkService: SocialLinkService, usersService: UsersService);
    getSocialLinks(username: string): Promise<{
        socialLinks: any;
    }>;
    addSocialLink(req: any, addSocialLinkDto: AddSocialLinkDto): Promise<{
        socialLink: any;
    }>;
    updateSocialLink(req: any, updateSocialLinkDto: UpdateSocialLinkDto): Promise<{
        socialLink: any;
    }>;
    deleteSocialLink(req: any, data: {
        id: string;
    }): Promise<{
        socialLink: any;
    }>;
}
