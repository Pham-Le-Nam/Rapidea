import { PrismaService } from '../../prisma/prisma.service';
import { FileRepository } from '../../modules/file/file.repository';
export declare class PrismaFileRepository implements FileRepository {
    private prisma;
    constructor(prisma: PrismaService);
    updateModeration(id: string, moderation: {
        status: any;
        score: number | null;
        categories: any;
        message?: string | null;
    }): import("../../../generated/prisma/models").Prisma__FileClient<{
        id: string;
        createdAt: Date;
        userId: string;
        folderId: string;
        name: string;
        mimeType: string;
        size: number;
        moderationStatus: import("../../../generated/prisma/enums").ModerationStatus;
        moderationScore: number | null;
        moderationCategories: import("@prisma/client/runtime/client").JsonValue | null;
        moderationMessage: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    private findCourseIdByFolderId;
    create(folderId: string, name: string, mimeType: string, size: number, userId: string): Promise<any>;
    updateById(id: string, userId: string, folderId?: string, name?: string): Promise<any>;
    findById(id: string): Promise<any>;
    findByFolderId(folderId: string): Promise<any>;
    deleteById(id: string, userId: string): Promise<any>;
}
