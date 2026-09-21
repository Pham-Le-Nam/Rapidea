import { PrismaSubscribeRepository } from './prisma-subscribe.repository';

describe('subscription skill grants', () => {
    it('grants skills inside subscription creation and rolls back on grant failure', async () => {
        const tx = {
            users: { findUnique: jest.fn().mockResolvedValue({ id: 'learner' }), update: jest.fn() },
            subscribe: { create: jest.fn().mockResolvedValue({ id: 'subscription' }) },
            course: { update: jest.fn() },
            $executeRaw: jest.fn().mockRejectedValue(new Error('grant failed')),
        };
        const prisma = {
            course: { findUnique: jest.fn().mockResolvedValue({ userId: 'creator', price: 0, currency: 'AUD' }) },
            $transaction: jest.fn((callback) => callback(tx)),
        };
        const service = new PrismaSubscribeRepository(prisma as any);
        await expect(service.create('course', 'learner')).rejects.toThrow('grant failed');
        expect(tx.subscribe.create).toHaveBeenCalledTimes(1);
        expect(tx.$executeRaw).toHaveBeenCalledWith(expect.any(Array), 'course', 'learner', 'learner');
        expect(tx.course.update).not.toHaveBeenCalled();
    });
});
