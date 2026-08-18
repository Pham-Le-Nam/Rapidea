export const PAYMENT_SERVICE = 'PAYMENT_SERVICE';

export type CheckoutRequest = {
    courseId: string;
    userId: string;
    customerEmail: string;
    courseTitle: string;
    currency: string;
    unitAmount: number;
};

export type CheckoutSession = {
    id: string;
    url: string | null;
    paymentStatus?: string | null;
    metadata?: Record<string, string> | null;
};

export interface PaymentService {
    createCheckoutSession(input: CheckoutRequest): Promise<CheckoutSession>;
    getCheckoutSession(sessionId: string): Promise<CheckoutSession>;
}
