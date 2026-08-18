import { Module } from '@nestjs/common';
import { PrismaSubscribeRepository } from '../../../adapters/repository/prisma/prisma-subscribe.repository';
import { SubscribeController } from '../../../adapters/http/controllers/subscribe/subscribe.controller';
import { SubscribeService } from '../../../application/subscribe/subscribe.service';
import { PAYMENT_SERVICE } from '../../../application/ports/payment.service';
import { StripePaymentService } from '../../payment/stripe-payment.service';

@Module({
    controllers: [
        SubscribeController,
    ],
    providers: [
        SubscribeService,
        { provide: PAYMENT_SERVICE, useClass: StripePaymentService },
        {
            provide: 'SUBSCRIBE_REPOSITORY',
            useClass: PrismaSubscribeRepository,
        },
    ],
})
export class SubscribeModule {}
