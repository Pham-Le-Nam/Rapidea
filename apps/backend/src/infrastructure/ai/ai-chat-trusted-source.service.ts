import { Injectable, NotFoundException } from '@nestjs/common';
import {
    AiChatTrustedSourceCreateData,
    AiChatTrustedSourceInput,
    AiChatTrustedSourceType,
} from '../../application/ai-chat/ai-chat-trusted-source.types';
import {
    AiContentAccessMode,
    AiContentResourceType,
} from '../../application/ai-chat/ai-content-authorization.types';
import { LearnerQueryTrustedContext } from '../../application/ai-chat/learner-query.types';
import { PrismaService } from '../database/prisma/prisma.service';
import { AiContentAuthorizationService } from './ai-content-authorization.service';

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

type TrustedSourceView =
    | {
          id: string;
          conversationId: string;
          sourceType: AiChatTrustedSourceType.COURSE;
          source: { id: string; title: string; description: string | null };
          createdAt: Date;
      }
    | {
          id: string;
          conversationId: string;
          sourceType: AiChatTrustedSourceType.POST;
          source: {
              id: string;
              title: string | null;
              summary: string | null;
              courseId: string | null;
          };
          createdAt: Date;
      }
    | {
          id: string;
          conversationId: string;
          sourceType: AiChatTrustedSourceType.FILE;
          source: {
              id: string;
              name: string;
              mimeType: string;
              summary: string | null;
          };
          createdAt: Date;
      };

@Injectable()
export class AiChatTrustedSourceService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly authorization: AiContentAuthorizationService,
    ) {}

    async validateSources(
        userId: string,
        inputs: readonly AiChatTrustedSourceInput[],
    ): Promise<AiChatTrustedSourceCreateData[]> {
        const uniqueInputs = Array.from(
            new Map(
                inputs.map((input) => [
                    `${input.sourceType}:${input.sourceId}`,
                    input,
                ]),
            ).values(),
        );
        await Promise.all(
            uniqueInputs.map((input) =>
                this.assertSourceAccessible(userId, input),
            ),
        );
        return uniqueInputs.map((input) => this.sourceField(input));
    }

    async list(userId: string, conversationId: string) {
        await this.assertConversationOwner(userId, conversationId);

        const sources = await this.prisma.aiChatTrustedSource.findMany({
            where: {
                conversationId,
                OR: [
                    { courseId: { not: null } },
                    { post: { is: this.authorization.postWhere(userId) } },
                    { file: { is: this.authorization.fileWhere(userId) } },
                ],
            },
            select: trustedSourceSelect,
            orderBy: { createdAt: 'asc' },
        });
        return sources.map((source) => this.toApiSource(source));
    }

    async getLearnerQueryContext(
        userId: string,
        conversationId: string,
        currentSources: readonly AiChatTrustedSourceInput[] = [],
    ): Promise<LearnerQueryTrustedContext[]> {
        const currentKeys = new Set(
            currentSources.map(
                (source) => `${source.sourceType}:${source.sourceId}`,
            ),
        );
        const sources = await this.list(userId, conversationId);

        return sources.map((source) => {
            const key = `${source.sourceType}:${source.source.id}`;
            switch (source.sourceType) {
                case AiChatTrustedSourceType.COURSE:
                    return {
                        type: 'COURSE',
                        id: source.source.id,
                        name: source.source.title,
                        courseScope: source.source.id,
                        current: currentKeys.has(key),
                    };
                case AiChatTrustedSourceType.POST:
                    return {
                        type: 'POST',
                        id: source.source.id,
                        name: source.source.title,
                        courseScope: source.source.courseId,
                        current: currentKeys.has(key),
                    };
                case AiChatTrustedSourceType.FILE:
                    return {
                        type: 'FILE',
                        id: source.source.id,
                        name: source.source.name,
                        courseScope: null,
                        current: currentKeys.has(key),
                    };
            }
        });
    }

    async remove(userId: string, conversationId: string, sourceId: string) {
        await this.assertConversationOwner(userId, conversationId);
        const source = await this.prisma.aiChatTrustedSource.findFirst({
            where: { id: sourceId, conversationId },
            select: { id: true },
        });
        if (!source) throw new NotFoundException('Trusted source not found');

        await this.prisma.aiChatTrustedSource.delete({
            where: { id: source.id },
        });
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
        input: AiChatTrustedSourceInput,
    ): Promise<void> {
        switch (input.sourceType) {
            case AiChatTrustedSourceType.COURSE:
                return this.authorization.assertCanAccess(
                    userId,
                    {
                        type: AiContentResourceType.COURSE,
                        id: input.sourceId,
                    },
                    AiContentAccessMode.SUMMARY,
                );
            case AiChatTrustedSourceType.POST:
                return this.authorization.assertCanAccess(
                    userId,
                    {
                        type: AiContentResourceType.POST,
                        id: input.sourceId,
                    },
                    AiContentAccessMode.DETAILS,
                );
            case AiChatTrustedSourceType.FILE:
                return this.authorization.assertCanAccess(
                    userId,
                    {
                        type: AiContentResourceType.FILE,
                        id: input.sourceId,
                    },
                    AiContentAccessMode.DETAILS,
                );
        }
    }

    private sourceField(
        input: AiChatTrustedSourceInput,
    ): AiChatTrustedSourceCreateData {
        switch (input.sourceType) {
            case AiChatTrustedSourceType.COURSE:
                return { courseId: input.sourceId };
            case AiChatTrustedSourceType.POST:
                return { postId: input.sourceId };
            case AiChatTrustedSourceType.FILE:
                return { fileId: input.sourceId };
        }
    }

    private toApiSource(source: {
        id: string;
        conversationId: string;
        createdAt: Date;
        course: {
            id: string;
            title: string;
            description: string | null;
        } | null;
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
    }): TrustedSourceView {
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
