import { SocialLinkRepository } from './social-link.repository';
import { SocialPlatform } from './social-platform.enum';
export declare class SocialLinkService {
    private readonly socialLinkRepo;
    constructor(socialLinkRepo: SocialLinkRepository);
    createSocialLink(platform: SocialPlatform, url: string, userId: string): Promise<any>;
    updateSocialLinkById(id: string, url?: string): Promise<any>;
    deleteSocialLinkById(id: string): Promise<any>;
    findSocialLinksByUserId(userId: string): Promise<any>;
    findSocialLinkById(id: string): Promise<any>;
}
