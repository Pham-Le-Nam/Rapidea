import { TagsRepository } from '../../modules/tags/tags.repository';
import { PrismaService } from '../../prisma/prisma.service';
export declare class PrismaTagsRepository implements TagsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    ensure(names: readonly string[]): Promise<void>;
    list(): import("../../../generated/prisma/internal/prismaNamespace").PrismaPromise<{
        id: string;
        name: string;
    }[]>;
    listWithEmbeddings(): import("../../../generated/prisma/internal/prismaNamespace").PrismaPromise<{
        id: string;
        name: string;
        embedding: import("@prisma/client/runtime/client").JsonValue;
    }[]>;
    replaceCourseTags(courseId: string, tags: any[], isSuggested: boolean): Promise<void>;
    replacePostTags(postId: string, tags: any[], isSuggested: boolean): Promise<void>;
    replaceFileTags(fileId: string, tags: any[], scores: Map<string, number>): Promise<void>;
    findFileTags(fileIds: string[]): import("../../../generated/prisma/internal/prismaNamespace").PrismaPromise<({
        tag: {
            id: string;
            createdAt: Date;
            name: string;
            embedding: import("@prisma/client/runtime/client").JsonValue | null;
        };
    } & {
        createdAt: Date;
        fileId: string;
        tagId: string;
        isSuggested: boolean;
        score: number | null;
    })[]>;
    addFileTagsToPost(postId: string, fileTags: any[]): Promise<void>;
    createTranscript(fileId: string): import("../../../generated/prisma/models").Prisma__FileTranscriptClient<{
        id: string;
        createdAt: Date;
        provider: string | null;
        status: import("../../../generated/prisma/enums").TranscriptStatus;
        updatedAt: Date;
        text: string | null;
        fileId: string;
        language: string | null;
        durationSec: number | null;
        model: string | null;
        errorMessage: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    completeTranscript(fileId: string, text: string, language?: string, durationSec?: number): import("../../../generated/prisma/models").Prisma__FileTranscriptClient<{
        id: string;
        createdAt: Date;
        provider: string | null;
        status: import("../../../generated/prisma/enums").TranscriptStatus;
        updatedAt: Date;
        text: string | null;
        fileId: string;
        language: string | null;
        durationSec: number | null;
        model: string | null;
        errorMessage: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    failTranscript(fileId: string, errorMessage: string): import("../../../generated/prisma/models").Prisma__FileTranscriptClient<{
        id: string;
        createdAt: Date;
        provider: string | null;
        status: import("../../../generated/prisma/enums").TranscriptStatus;
        updatedAt: Date;
        text: string | null;
        fileId: string;
        language: string | null;
        durationSec: number | null;
        model: string | null;
        errorMessage: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    findByNames(names: string[]): import("../../../generated/prisma/internal/prismaNamespace").PrismaPromise<{
        id: string;
        name: string;
    }[]>;
    updateEmbeddings(tags: {
        id: string;
    }[], embeddings: number[][]): Promise<void>;
}
