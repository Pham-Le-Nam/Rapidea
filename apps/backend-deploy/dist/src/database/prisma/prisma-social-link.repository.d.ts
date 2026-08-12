import { PrismaService } from '../../prisma/prisma.service';
import { SocialLinkRepository } from '../../modules/social-link/social-link.repository';
import { SocialPlatform } from 'generated/prisma/enums';
export declare class PrismaSocialLinkRepository implements SocialLinkRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(platform: SocialPlatform, url: string, userId: string): Promise<any>;
    deleteById(id: string): Promise<any>;
    updateById(id: string, url?: string): Promise<any>;
    findByUserId(userId: string): Promise<any>;
    findById(id: string): Promise<any>;
}
