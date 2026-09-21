import { Injectable, NotFoundException } from '@nestjs/common';
import {
    AddAiChatTrustedSource,
    AiChatTrustedSourceType,
} from '../../application/ai-chat/ai-chat-trusted-source.types';
import { PrismaService } from '../database/prisma/prisma.service';

const trustedSourceSelect = {
    id: true,
    conversationId: true,
    createdAt: true,
    course: {
        select: {
            id: true,
            title: true,
            description: true,
        },
    },
    post: {
        select: {
            id: true,
            title: true,
            summary: true,
            courseId: true,
        },
    },
    file: {
        select: {
            id: true,
            name: true,
            mimeType: true,
            summary: true,
        },
    },
} as const;

@Injectable()
export class AiChatTrustedSourceService {
    constructor(private readonly prisma: PrismaService) {}

    async add(
        userId: string,
        conversationId: string,
        input: AddAiChatTrustedSource,
    ) {
        await this.assertConversationOwner(userId, conversationId);
        await this.assertSourceAccessible(userId, input);

        const sourceField = this.sourceField(input);
        const existing = await this.prisma.aiChatTrustedSource.findFirst({
            where: { conversationId, ...sourceField },
            select: trustedSourceSelect,
        });
        if (existing) return this.toApiSource(existing);

        try {
            const created = await this.prisma.aiChatTrustedSource.create({
                data: { conversationId, ...sourceField },
                select: trustedSourceSelect,
            });
            return this.toApiSource(created);
        } catch (error) {
            // A concurrent request may have inserted the same source.
            if ((error as { code?: string })?.code !== 'P2002') throw error;
            const concurrent = await this.prisma.aiChatTrustedSource.findFirst({
                where: { conversationId, ...sourceField },
                select: trustedSourceSelect,
            });
            if (!concurrent) throw error;
            return this.toApiSource(concurrent);
        }
    }

    async list(userId: string, conversationId: string) {
        await this.assertConversationOwner(userId, conversationId);

        const sources = await this.prisma.aiChatTrustedSource.findMany({
            where: {
                conversationId,
                OR: [
                    { courseId: { not: null } },
                    { post: { is: this.accessiblePostWhere(userId) } },
                    { file: { is: this.accessibleFileWhere(userId) } },
                ],
            },
            select: trustedSourceSelect,
            orderBy: { createdAt: 'asc' },
        });
        return sources.map((source) => this.toApiSource(source));
    }

    async remove(userId: string, conversationId: string, sourceId: string) {
        await this.assertConversationOwner(userId, conversationId);
        const source = await this.prisma.aiChatTrustedSource.findFirst({
            where: { id: sourceId, conversationId },
            select: { id: true },
        });
        if (!source) throw new NotFoundException('Trusted source not found');

        await this.prisma.aiChatTrustedSource.delete({ where: { id: source.id } });
        return { id: source.id };
    }

    private async assertConversationOwner(
        userId: string,
        conversationId: string,
    ): Promise<void> {
        const conversation = await this.prisma.aiChatConversation.findFirst({
            where: { id: conversationId, userId },
            select: { id: true },
        });
        if (!conversation) {
            throw new NotFoundException('AI conversation not found');
        }
    }

    private async assertSourceAccessible(
        userId: string,
        input: AddAiChatTrustedSource,
    ): Promise<void> {
        let source: { id: string } | null;
        switch (input.sourceType) {
            case AiChatTrustedSourceType.COURSE:
                // Course metadata is public and can be selected for evaluation.
                source = await this.prisma.course.findUnique({
                    where: { id: input.sourceId },
                    select: { id: true },
                });
                break;
            case AiChatTrustedSourceType.POST:
                source = await this.prisma.post.findFirst({
                    where: {
                        id: input.sourceId,
                        ...this.accessiblePostWhere(userId),
                    },
                    select: { id: true },
                });
                break;
            case AiChatTrustedSourceType.FILE:
                source = await this.prisma.file.findFirst({
                    where: {
                        id: input.sourceId,
                        ...this.accessibleFileWhere(userId),
                    },
                    select: { id: true },
                });
                break;
        }

        if (!source) {
            throw new NotFoundException(
                'Source not found or is not accessible to this learner',
            );
        }
    }

    private sourceField(input: AddAiChatTrustedSource) {
        switch (input.sourceType) {
            case AiChatTrustedSourceType.COURSE:
                return { courseId: input.sourceId };
            case AiChatTrustedSourceType.POST:
                return { postId: input.sourceId };
            case AiChatTrustedSourceType.FILE:
                return { fileId: input.sourceId };
        }
    }

    private accessiblePostWhere(userId: string) {
        return {
            OR: [
                { courseId: null },
                { isPreview: true },
                { userId },
                { course: { is: { subscribers: { some: { userId } } } } },
            ],
        };
    }

    private accessibleFileWhere(userId: string) {
        return {
            OR: [
                { userId },
                {
                    inPosts: {
                        some: { post: this.accessiblePostWhere(userId) },
                    },
                },
                {
                    inCourses: {
                        some: {
                            course: {
                                OR: [
                                    { userId },
                                    { subscribers: { some: { userId } } },
                                ],
                            },
                        },
                    },
                },
            ],
        };
    }

    private toApiSource(source: {
        id: string;
        conversationId: string;
        createdAt: Date;
        course: { id: string; title: string; description: string | null } | null;
        post: {
            id: string;
            title: string | null;
            summary: string | null;
            courseId: string | null;
        } | null;
        file: {
            id: string;
            name: string;
            mimeType: string;
            summary: string | null;
        } | null;
    }) {
        if (source.course) {
            return {
                id: source.id,
                conversationId: source.conversationId,
                sourceType: AiChatTrustedSourceType.COURSE,
                source: source.course,
                createdAt: source.createdAt,
            };
        }
        if (source.post) {
            return {
                id: source.id,
                conversationId: source.conversationId,
                sourceType: AiChatTrustedSourceType.POST,
                source: source.post,
                createdAt: source.createdAt,
            };
        }
        if (source.file) {
            return {
                id: source.id,
                conversationId: source.conversationId,
                sourceType: AiChatTrustedSourceType.FILE,
                source: source.file,
                createdAt: source.createdAt,
            };
        }
        throw new Error('Trusted source has no linked source');
    }
}
