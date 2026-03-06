import { Injectable, Inject } from '@nestjs/common';
import { SocialLinkRepository } from './social-link.repository';
import { SocialPlatform } from './social-platform.enum';

@Injectable()
export class SocialLinkService {
    constructor(
        @Inject('SOCIAL_LINK_REPOSITORY')
        private readonly socialLinkRepo: SocialLinkRepository,
    ) {}

    async createSocialLink(platform: SocialPlatform, url: string, userId: string) {
        return this.socialLinkRepo.create(platform, url, userId);
    }

    async updateSocialLinkById(id: string, url?: string) {
        return this.socialLinkRepo.updateById(id, url);
    }

    async deleteSocialLinkById(id: string) {
        return this.socialLinkRepo.deleteById(id);
    }

    async findSocialLinksByUserId(userId: string) {
        return this.socialLinkRepo.findByUserId(userId);
    }

    async findSocialLinkById(id: string) {
        return this.socialLinkRepo.findById(id);
    }
}