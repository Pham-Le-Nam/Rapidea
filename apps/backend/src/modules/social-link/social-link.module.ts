import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { SocialLinkController } from './social-link.controller';
import { SocialLinkService } from './social-link.service';
import { PrismaSocialLinkRepository } from 'src/database/prisma/prisma-social-link.repository';

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
