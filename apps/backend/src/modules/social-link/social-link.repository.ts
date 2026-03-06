import { SocialPlatform } from './social-platform.enum';

export interface SocialLinkRepository {
    create(platform: SocialPlatform, url: string, userId: string): Promise<any>;
    deleteById(id: string): Promise<any>;
    updateById(id: string, url?: string): Promise<any>;
    findByUserId(userId: string): Promise<any>;
    findById(id: string): Promise<any>;
}