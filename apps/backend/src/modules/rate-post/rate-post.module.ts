import { Module } from '@nestjs/common';
import { RatePostService } from './rate-post.service';
import { RatePostController } from './rate-post.controller';
import { PrismaRatePostRepository } from 'src/database/prisma/prisma-rate-post.repository';

@Module({
    imports: [

    ],
    providers: [
        RatePostService,
        {
            provide: "RATE_POST_REPOSITORY",
            useClass: PrismaRatePostRepository,
        }
    ],
    controllers: [
        RatePostController,
    ],
    exports: [

    ],
})
export class RatePostModule {}
