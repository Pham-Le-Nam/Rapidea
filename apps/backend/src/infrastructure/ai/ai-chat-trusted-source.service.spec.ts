import { NotFoundException } from '@nestjs/common';
import { AiChatTrustedSourceType } from '../../application/ai-chat/ai-chat-trusted-source.types';
import { AiChatTrustedSourceService } from './ai-chat-trusted-source.service';

function createPrismaMock() {
    return {
        aiChatConversation: { findFirst: jest.fn() },
        aiChatTrustedSource: {
            findFirst: jest.fn(),
            findMany: jest.fn(),
            delete: jest.fn(),
        },
        course: { findUnique: jest.fn() },
        post: { findFirst: jest.fn() },
        file: { findFirst: jest.fn() },
    };
}

describe('AiChatTrustedSourceService', () => {
    it('validates and deduplicates sources before message creation', async () => {
        const prisma = createPrismaMock();
        prisma.course.findUnique.mockResolvedValue({ id: 'course-1' });

        const result = await new AiChatTrustedSourceService(
            prisma as any,
        ).validateSources('learner-1', [
            {
                sourceType: AiChatTrustedSourceType.COURSE,
                sourceId: 'course-1',
            },
            {
                sourceType: AiChatTrustedSourceType.COURSE,
                sourceId: 'course-1',
            },
        ]);

        expect(result).toEqual([{ courseId: 'course-1' }]);
        expect(prisma.course.findUnique).toHaveBeenCalledTimes(1);
    });

    it('does not list sources from another learner conversation', async () => {
        const prisma = createPrismaMock();
        prisma.aiChatConversation.findFirst.mockResolvedValue(null);

        await expect(
            new AiChatTrustedSourceService(prisma as any).list(
                'learner-1',
                'someone-elses-chat',
            ),
        ).rejects.toBeInstanceOf(NotFoundException);
        expect(prisma.aiChatTrustedSource.findMany).not.toHaveBeenCalled();
    });

    it('rejects a post the learner cannot access', async () => {
        const prisma = createPrismaMock();
        prisma.aiChatConversation.findFirst.mockResolvedValue({ id: 'chat-1' });
        prisma.post.findFirst.mockResolvedValue(null);

        await expect(
            new AiChatTrustedSourceService(prisma as any).validateSources(
                'learner-1',
                [{
                    sourceType: AiChatTrustedSourceType.POST,
                    sourceId: 'private-post',
                }],
            ),
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

        const result = await new AiChatTrustedSourceService(
            prisma as any,
        ).getLearnerQueryContext('learner-1', 'chat-1', [
            {
                sourceType: AiChatTrustedSourceType.POST,
                sourceId: 'post-1',
            },
        ]);

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
});
