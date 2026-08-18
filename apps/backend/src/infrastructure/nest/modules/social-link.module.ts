import { Module } from '@nestjs/common';
import { UsersModule } from './users.module';
import { SocialLinkController } from '../../../adapters/http/controllers/social-link/social-link.controller';
import { SocialLinkService } from '../../../application/social-link/social-link.service';
import { PrismaSocialLinkRepository } from '../../../adapters/repository/prisma/prisma-social-link.repository';

@Module({
    imports: [
        UsersModule,
    ],
    controllers: [
        SocialLinkController,
    ],
    providers: [
        SocialLinkService,
        {
            provide: "SOCIAL_LINK_REPOSITORY",
            useClass: PrismaSocialLinkRepository,
        },
    ]
})
export class SocialLinkModule {}
