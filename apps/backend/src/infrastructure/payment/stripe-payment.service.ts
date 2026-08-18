import { Injectable, InternalServerErrorException } from '@nestjs/common';
import Stripe from 'stripe';
import {
    CheckoutRequest,
    PaymentService,
} from '../../application/ports/payment.service';

@Injectable()
export class StripePaymentService implements PaymentService {
    async createCheckoutSession(input: CheckoutRequest) {
        const frontend = process.env.FRONTEND_URL ?? 'http://localhost:5173';
        const session = await this.client().checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            customer_email: input.customerEmail,
            line_items: [{
                quantity: 1,
                price_data: {
                    currency: input.currency,
                    unit_amount: input.unitAmount,
                    product_data: {
                        name: input.courseTitle,
                        description: `Course subscription: ${input.courseTitle}`,
                    },
                },
            }],
            metadata: { courseId: input.courseId, userId: input.userId },
            success_url: `${frontend}/course/${input.courseId}?payment=success&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${frontend}/course/${input.courseId}?payment=cancelled`,
        });

        return {
            id: session.id,
            url: session.url,
            paymentStatus: session.payment_status,
            metadata: session.metadata,
        };
    }

    async getCheckoutSession(sessionId: string) {
        const session = await this.client().checkout.sessions.retrieve(sessionId);
        return {
            id: session.id,
            url: session.url,
            paymentStatus: session.payment_status,
            metadata: session.metadata,
        };
    }

    private client() {
        const secretKey = process.env.STRIPE_SECRET_KEY;
        if (!secretKey) throw new InternalServerErrorException('Stripe payments are not configured');
        return new Stripe(secretKey);
    }
}
