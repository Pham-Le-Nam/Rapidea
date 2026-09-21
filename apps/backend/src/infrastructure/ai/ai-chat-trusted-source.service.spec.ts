import { NotFoundException } from '@nestjs/common';
import { AiChatTrustedSourceType } from '../../application/ai-chat/ai-chat-trusted-source.types';
import { AiChatTrustedSourceService } from './ai-chat-trusted-source.service';

function createPrismaMock() {
    return {
        aiChatConversation: { findFirst: jest.fn() },
        aiChatTrustedSource: {
            findFirst: jest.fn(),
            findMany: jest.fn(),
            create: jest.fn(),
            delete: jest.fn(),
        },
        course: { findUnique: jest.fn() },
        post: { findFirst: jest.fn() },
        file: { findFirst: jest.fn() },
    };
}

describe('AiChatTrustedSourceService', () => {
    it('adds a course to a conversation owned by the learner', async () => {
        const prisma = createPrismaMock();
        prisma.aiChatConversation.findFirst.mockResolvedValue({ id: 'chat-1' });
        prisma.course.findUnique.mockResolvedValue({ id: 'course-1' });
        prisma.aiChatTrustedSource.findFirst.mockResolvedValue(null);
        prisma.aiChatTrustedSource.create.mockResolvedValue({
            id: 'trusted-1',
            conversationId: 'chat-1',
            createdAt: new Date('2026-09-21T00:00:00.000Z'),
            course: {
                id: 'course-1',
                title: 'Course',
                description: null,
            },
            post: null,
            file: null,
        });

        const result = await new AiChatTrustedSourceService(
            prisma as any,
        ).add('learner-1', 'chat-1', {
            sourceType: AiChatTrustedSourceType.COURSE,
            sourceId: 'course-1',
        });

        expect(result).toEqual(
            expect.objectContaining({
                sourceType: AiChatTrustedSourceType.COURSE,
                source: expect.objectContaining({ id: 'course-1' }),
            }),
        );
        expect(prisma.aiChatTrustedSource.create).toHaveBeenCalledWith(
            expect.objectContaining({
                data: { conversationId: 'chat-1', courseId: 'course-1' },
            }),
        );
    });

    it('does not allow a source to be added to another learner conversation', async () => {
        const prisma = createPrismaMock();
        prisma.aiChatConversation.findFirst.mockResolvedValue(null);

        await expect(
            new AiChatTrustedSourceService(prisma as any).add(
                'learner-1',
                'someone-elses-chat',
                {
                    sourceType: AiChatTrustedSourceType.COURSE,
                    sourceId: 'course-1',
                },
            ),
        ).rejects.toBeInstanceOf(NotFoundException);
        expect(prisma.course.findUnique).not.toHaveBeenCalled();
    });

    it('rejects a post the learner cannot access', async () => {
        const prisma = createPrismaMock();
        prisma.aiChatConversation.findFirst.mockResolvedValue({ id: 'chat-1' });
        prisma.post.findFirst.mockResolvedValue(null);

        await expect(
            new AiChatTrustedSourceService(prisma as any).add(
                'learner-1',
                'chat-1',
                {
                    sourceType: AiChatTrustedSourceType.POST,
                    sourceId: 'private-post',
                },
            ),
        ).rejects.toBeInstanceOf(NotFoundException);
        expect(prisma.aiChatTrustedSource.create).not.toHaveBeenCalled();
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
