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
});
