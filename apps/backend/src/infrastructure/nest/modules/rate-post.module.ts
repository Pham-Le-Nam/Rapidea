import { Module } from '@nestjs/common';
import { RatePostService } from '../../../application/rate-post/rate-post.service';
import { RatePostController } from '../../../adapters/http/controllers/rate-post/rate-post.controller';
import { PrismaRatePostRepository } from '../../../adapters/repository/prisma/prisma-rate-post.repository';

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
