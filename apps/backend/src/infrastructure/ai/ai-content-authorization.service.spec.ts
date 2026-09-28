import { NotFoundException } from '@nestjs/common';
import {
    AiContentAccessMode,
    AiContentResourceType,
} from '../../application/ai-chat/ai-content-authorization.types';
import { AiContentAuthorizationService } from './ai-content-authorization.service';

function createPrismaMock() {
    return {
        course: { findFirst: jest.fn() },
        post: { findFirst: jest.fn() },
        file: { findFirst: jest.fn() },
        discussion: { findFirst: jest.fn() },
        subscribe: { findFirst: jest.fn() },
    };
}

describe('AiContentAuthorizationService', () => {
    it('keeps course summaries public and restricts course details', () => {
        const service = new AiContentAuthorizationService(
            createPrismaMock() as any,
        );

        expect(
            service.courseWhere('learner-1', AiContentAccessMode.SUMMARY),
        ).toEqual({});
        expect(
            service.courseWhere('learner-1', AiContentAccessMode.DETAILS),
        ).toEqual({
            OR: [
                { userId: 'learner-1' },
                { subscribers: { some: { userId: 'learner-1' } } },
            ],
        });
    });

    it('allows standalone and preview posts plus owned or subscribed course posts', () => {
        const service = new AiContentAuthorizationService(
            createPrismaMock() as any,
        );

        expect(service.postWhere('learner-1')).toEqual({
            OR: [
                { courseId: null },
                { isPreview: true },
                { userId: 'learner-1' },
                { course: { is: { userId: 'learner-1' } } },
                {
                    course: {
                        is: {
                            subscribers: {
                                some: { userId: 'learner-1' },
                            },
                        },
                    },
                },
            ],
        });
    });

    it('allows files from the free folder and accessible post or course contexts', () => {
        const service = new AiContentAuthorizationService(
            createPrismaMock() as any,
        );
        const where = service.fileWhere('learner-1');

        expect(where.OR).toEqual(
            expect.arrayContaining([
                { userId: 'learner-1' },
                {
                    folder: {
                        is: { isPublic: true },
                    },
                },
            ]),
        );
        expect(JSON.stringify(where)).toContain('inPosts');
        expect(JSON.stringify(where)).toContain('inCourses');
        expect(JSON.stringify(where)).toContain('subscribers');
    });

    it('inherits discussion access from its post', () => {
        const service = new AiContentAuthorizationService(
            createPrismaMock() as any,
        );

        expect(service.discussionWhere('learner-1')).toEqual({
            post: { is: service.postWhere('learner-1') },
        });
    });

    it('exposes review summaries but restricts review details by course access', () => {
        const service = new AiContentAuthorizationService(
            createPrismaMock() as any,
        );

        expect(
            service.reviewWhere('learner-1', AiContentAccessMode.SUMMARY),
        ).toEqual({ review: { not: null } });
        expect(
            service.reviewWhere('learner-1', AiContentAccessMode.DETAILS),
        ).toEqual({
            review: { not: null },
            course: {
                is: service.courseWhere(
                    'learner-1',
                    AiContentAccessMode.DETAILS,
                ),
            },
        });
    });

    it.each([
        [AiContentResourceType.COURSE, 'course'],
        [AiContentResourceType.POST, 'post'],
        [AiContentResourceType.FILE, 'file'],
        [AiContentResourceType.DISCUSSION, 'discussion'],
        [AiContentResourceType.REVIEW, 'subscribe'],
    ] as const)('checks %s access in the database', async (type, model) => {
        const prisma = createPrismaMock();
        prisma[model].findFirst.mockResolvedValue({ id: 'source-1' });
        const service = new AiContentAuthorizationService(prisma as any);

        await expect(
            service.canAccess(
                'learner-1',
                { type, id: 'source-1' },
                AiContentAccessMode.DETAILS,
            ),
        ).resolves.toBe(true);
        expect(prisma[model].findFirst).toHaveBeenCalledWith(
            expect.objectContaining({
                where: expect.objectContaining({ id: 'source-1' }),
                select: { id: true },
            }),
        );
    });

    it('uses the same not-found response for missing and forbidden resources', async () => {
        const prisma = createPrismaMock();
        prisma.post.findFirst.mockResolvedValue(null);
        const service = new AiContentAuthorizationService(prisma as any);

        await expect(
            service.assertCanAccess(
                'learner-1',
                { type: AiContentResourceType.POST, id: 'private-post' },
                AiContentAccessMode.DETAILS,
            ),
        ).rejects.toBeInstanceOf(NotFoundException);
    });

    it.each([
        [AiContentResourceType.COURSE, AiContentAccessMode.SUMMARY, 'course'],
        [AiContentResourceType.COURSE, AiContentAccessMode.DETAILS, 'course'],
        [AiContentResourceType.POST, AiContentAccessMode.SUMMARY, 'post'],
        [AiContentResourceType.POST, AiContentAccessMode.DETAILS, 'post'],
        [AiContentResourceType.FILE, AiContentAccessMode.SUMMARY, 'file'],
        [AiContentResourceType.FILE, AiContentAccessMode.DETAILS, 'file'],
        [AiContentResourceType.DISCUSSION, AiContentAccessMode.SUMMARY, 'discussion'],
        [AiContentResourceType.DISCUSSION, AiContentAccessMode.DETAILS, 'discussion'],
        [AiContentResourceType.REVIEW, AiContentAccessMode.SUMMARY, 'subscribe'],
        [AiContentResourceType.REVIEW, AiContentAccessMode.DETAILS, 'subscribe'],
    ] as const)(
        'applies the authorization matrix for %s in %s mode',
        async (type, mode, model) => {
            const prisma = createPrismaMock();
            prisma[model].findFirst.mockResolvedValue({ id: 'source-1' });
            const service = new AiContentAuthorizationService(prisma as any);

            await expect(
                service.canAccess(
                    'learner-1',
                    { type, id: 'source-1' },
                    mode,
                ),
            ).resolves.toBe(true);

            const where = prisma[model].findFirst.mock.calls[0][0].where;
            if (type === AiContentResourceType.COURSE) {
                if (mode === AiContentAccessMode.SUMMARY) {
                    expect(where).not.toHaveProperty('OR');
                } else {
                    expect(where.OR).toEqual(expect.any(Array));
                }
            }
            if (type === AiContentResourceType.REVIEW) {
                if (mode === AiContentAccessMode.SUMMARY) {
                    expect(where).not.toHaveProperty('course');
                } else {
                    expect(where.course).toBeDefined();
                }
            }
        },
    );

    it.each([
        [AiContentResourceType.COURSE, 'course'],
        [AiContentResourceType.POST, 'post'],
        [AiContentResourceType.FILE, 'file'],
        [AiContentResourceType.DISCUSSION, 'discussion'],
        [AiContentResourceType.REVIEW, 'subscribe'],
    ] as const)('denies %s when no authorized database row exists', async (type, model) => {
        const prisma = createPrismaMock();
        prisma[model].findFirst.mockResolvedValue(null);
        const service = new AiContentAuthorizationService(prisma as any);

        await expect(
            service.canAccess(
                'learner-1',
                { type, id: 'source-1' },
                AiContentAccessMode.DETAILS,
            ),
        ).resolves.toBe(false);
    });
});
