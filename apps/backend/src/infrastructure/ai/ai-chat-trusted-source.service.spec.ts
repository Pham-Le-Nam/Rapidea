import { NotFoundException } from '@nestjs/common';
import { AiChatTrustedSourceType } from '../../application/ai-chat/ai-chat-trusted-source.types';
import { AiContentAuthorizationService } from './ai-content-authorization.service';
import { AiChatTrustedSourceService } from './ai-chat-trusted-source.service';

function createPrismaMock() {
    return {
        aiChatConversation: { findFirst: jest.fn() },
        aiChatTrustedSource: {
            findFirst: jest.fn(),
            findMany: jest.fn(),
            delete: jest.fn(),
        },
        course: { findFirst: jest.fn() },
        post: { findFirst: jest.fn() },
        file: { findFirst: jest.fn() },
        discussion: { findFirst: jest.fn() },
        subscribe: { findFirst: jest.fn() },
    };
}

function createService(prisma: ReturnType<typeof createPrismaMock>) {
    return new AiChatTrustedSourceService(
        prisma as any,
        new AiContentAuthorizationService(prisma as any),
    );
}

describe('AiChatTrustedSourceService', () => {
    it('validates and deduplicates sources before message creation', async () => {
        const prisma = createPrismaMock();
        prisma.course.findFirst.mockResolvedValue({ id: 'course-1' });

        const result = await createService(prisma).validateSources(
            'learner-1',
            [
                {
                    sourceType: AiChatTrustedSourceType.COURSE,
                    sourceId: 'course-1',
                },
                {
                    sourceType: AiChatTrustedSourceType.COURSE,
                    sourceId: 'course-1',
                },
            ],
        );

        expect(result).toEqual([{ courseId: 'course-1' }]);
        expect(prisma.course.findFirst).toHaveBeenCalledTimes(1);
    });

    it('does not list sources from another learner conversation', async () => {
        const prisma = createPrismaMock();
        prisma.aiChatConversation.findFirst.mockResolvedValue(null);

        await expect(
            createService(prisma).list('learner-1', 'someone-elses-chat'),
        ).rejects.toBeInstanceOf(NotFoundException);
        expect(prisma.aiChatTrustedSource.findMany).not.toHaveBeenCalled();
    });

    it('rejects a post the learner cannot access', async () => {
        const prisma = createPrismaMock();
        prisma.aiChatConversation.findFirst.mockResolvedValue({ id: 'chat-1' });
        prisma.post.findFirst.mockResolvedValue(null);

        await expect(
            createService(prisma).validateSources('learner-1', [
                {
                    sourceType: AiChatTrustedSourceType.POST,
                    sourceId: 'private-post',
                },
            ]),
        ).rejects.toBeInstanceOf(NotFoundException);
        expect(prisma.post.findFirst).toHaveBeenCalledWith(
            expect.objectContaining({
                where: expect.objectContaining({
                    id: 'private-post',
                    OR: expect.any(Array),
                }),
            }),
        );
    });

    it('builds minimal classifier context from authorized database sources', async () => {
        const prisma = createPrismaMock();
        prisma.aiChatConversation.findFirst.mockResolvedValue({ id: 'chat-1' });
        prisma.aiChatTrustedSource.findMany.mockResolvedValue([
            {
                id: 'trusted-1',
                conversationId: 'chat-1',
                createdAt: new Date('2026-09-22T00:00:00Z'),
                course: null,
                post: {
                    id: 'post-1',
                    title: 'Closures',
                    summary: 'This must not be sent to the classifier.',
                    courseId: 'course-1',
                },
                file: null,
            },
        ]);

        const result = await createService(prisma).getLearnerQueryContext(
            'learner-1',
            'chat-1',
            [
                {
                    sourceType: AiChatTrustedSourceType.POST,
                    sourceId: 'post-1',
                },
            ],
        );

        expect(result).toEqual([
            {
                type: 'POST',
                id: 'post-1',
                name: 'Closures',
                courseScope: 'course-1',
                current: true,
            },
        ]);
        expect(JSON.stringify(result)).not.toContain('must not be sent');
    });

    it('removes a trusted source only from the learner-owned conversation', async () => {
        const prisma = createPrismaMock();
        prisma.aiChatConversation.findFirst.mockResolvedValue({ id: 'chat-1' });
        prisma.aiChatTrustedSource.findFirst.mockResolvedValue({
            id: 'trusted-1',
        });
        prisma.aiChatTrustedSource.delete.mockResolvedValue({ id: 'trusted-1' });

        await expect(
            createService(prisma).remove(
                'learner-1',
                'chat-1',
                'trusted-1',
            ),
        ).resolves.toEqual({ id: 'trusted-1' });
        expect(prisma.aiChatConversation.findFirst).toHaveBeenCalledWith({
            where: { id: 'chat-1', userId: 'learner-1' },
            select: { id: true },
        });
        expect(prisma.aiChatTrustedSource.findFirst).toHaveBeenCalledWith({
            where: { id: 'trusted-1', conversationId: 'chat-1' },
            select: { id: true },
        });
        expect(prisma.aiChatTrustedSource.delete).toHaveBeenCalledWith({
            where: { id: 'trusted-1' },
        });
    });

    it('does not remove an unknown trusted source', async () => {
        const prisma = createPrismaMock();
        prisma.aiChatConversation.findFirst.mockResolvedValue({ id: 'chat-1' });
        prisma.aiChatTrustedSource.findFirst.mockResolvedValue(null);

        await expect(
            createService(prisma).remove(
                'learner-1',
                'chat-1',
                'missing-source',
            ),
        ).rejects.toBeInstanceOf(NotFoundException);
        expect(prisma.aiChatTrustedSource.delete).not.toHaveBeenCalled();
    });
});
