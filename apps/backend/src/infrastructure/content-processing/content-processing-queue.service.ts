import {
    Inject,
    Injectable,
    Logger,
    OnApplicationBootstrap,
    OnModuleDestroy,
} from '@nestjs/common';
import path from 'path';
import { Readable } from 'stream';
import {
    AiProcessingStatus,
    ContentSourceType,
} from '../../../generated/prisma/enums';
import { Prisma } from '../../../generated/prisma/client';
import {
    STORAGE_SERVICE,
    StorageService,
} from '../../application/ports/storage.service';
import { PrismaService } from '../database/prisma/prisma.service';
import { FolderService } from '../../application/folder/folder.service';
import { ChunkingEmbeddingService } from './chunking-embedding.service';
import { TextExtractionService } from './text-extraction.service';

type ContentProcessingJob = {
    sourceType: ContentSourceType;
    sourceId: string;
    createdAt: Date;
};

type ProcessingSource = {
    text: string;
    courseIds: string[];
    metadata: Record<string, unknown>;
};

const DEFAULT_SCAN_INTERVAL_MS = 5_000;

@Injectable()
export class ContentProcessingQueueService
implements OnApplicationBootstrap, OnModuleDestroy {
    private readonly logger = new Logger(ContentProcessingQueueService.name);
    private readonly queue: ContentProcessingJob[] = [];
    private readonly queuedKeys = new Set<string>();
    private drainPromise?: Promise<void>;
    private scanTimer?: NodeJS.Timeout;

    constructor(
        private readonly prisma: PrismaService,
        private readonly folderService: FolderService,
        @Inject(STORAGE_SERVICE)
        private readonly storage: StorageService,
        private readonly textExtraction: TextExtractionService,
        private readonly chunkingEmbedding: ChunkingEmbeddingService,
    ) {}

    onApplicationBootstrap(): void {
        void this.scanAndProcessPending().catch((error) => {
            this.logger.error('Initial content-processing scan failed', error);
        });

        this.scanTimer = setInterval(() => {
            void this.scanAndProcessPending().catch((error) => {
                this.logger.error('Content-processing scan failed', error);
            });
        }, this.scanIntervalMs());
        this.scanTimer.unref();
    }

    onModuleDestroy(): void {
        if (this.scanTimer) clearInterval(this.scanTimer);
    }

    async scanAndProcessPending(): Promise<void> {
        const jobs = await this.findPendingJobs();
        jobs.forEach((job) => this.enqueue(job));
        await this.startDrain();
    }

    private async findPendingJobs(): Promise<ContentProcessingJob[]> {
        const [files, posts, discussions, reviews] = await Promise.all([
            this.prisma.file.findMany({
                where: { aiStatus: AiProcessingStatus.PENDING },
                select: { id: true, createdAt: true },
            }),
            this.prisma.post.findMany({
                where: { aiStatus: AiProcessingStatus.PENDING },
                select: { id: true, createdAt: true },
            }),
            this.prisma.discussion.findMany({
                where: { aiStatus: AiProcessingStatus.PENDING },
                select: { id: true, createdAt: true },
            }),
            this.prisma.subscribe.findMany({
                where: {
                    aiStatus: AiProcessingStatus.PENDING,
                    review: { not: null },
                },
                select: { id: true, createdAt: true },
            }),
        ]);

        return [
            ...files.map((item) => ({
                sourceType: ContentSourceType.FILE,
                sourceId: item.id,
                createdAt: item.createdAt,
            })),
            ...posts.map((item) => ({
                sourceType: ContentSourceType.POST,
                sourceId: item.id,
                createdAt: item.createdAt,
            })),
            ...discussions.map((item) => ({
                sourceType: ContentSourceType.DISCUSSION,
                sourceId: item.id,
                createdAt: item.createdAt,
            })),
            ...reviews.map((item) => ({
                sourceType: ContentSourceType.REVIEW,
                sourceId: item.id,
                createdAt: item.createdAt,
            })),
        ].sort((left, right) => left.createdAt.getTime() - right.createdAt.getTime());
    }

    private enqueue(job: ContentProcessingJob): void {
        const key = this.jobKey(job);
        if (this.queuedKeys.has(key)) return;

        this.queuedKeys.add(key);
        this.queue.push(job);
    }

    private startDrain(): Promise<void> {
        if (!this.drainPromise) {
            this.drainPromise = this.drain().finally(() => {
                this.drainPromise = undefined;
                if (this.queue.length > 0) void this.startDrain();
            });
        }

        return this.drainPromise;
    }

    private async drain(): Promise<void> {
        let job = this.queue.shift();

        while (job) {
            try {
                await this.process(job);
            } catch (error) {
                this.logger.error(
                    `Queue error for ${job.sourceType}:${job.sourceId}: ${this.errorMessage(error)}`,
                );
            } finally {
                this.queuedKeys.delete(this.jobKey(job));
            }

            job = this.queue.shift();
        }
    }

    private async process(job: ContentProcessingJob): Promise<void> {
        if (!await this.claim(job)) return;

        try {
            const source = await this.loadSource(job);
            if (source.courseIds.length === 0) {
                throw new Error('Content source is not associated with a course');
            }

            const chunks = await this.chunkingEmbedding.chunkAndEmbed(
                source.text,
                { metadata: source.metadata },
            );
            if (chunks.length === 0) {
                throw new Error('Content source has no extractable text');
            }

            await this.prisma.$transaction(async (transaction) => {
                const completed = await this.statusDelegate(
                    transaction,
                    job.sourceType,
                ).updateMany({
                    where: {
                        id: job.sourceId,
                        aiStatus: AiProcessingStatus.PROCESSING,
                    },
                    data: {
                        aiStatus: AiProcessingStatus.READY,
                        aiError: null,
                        aiProcessedAt: new Date(),
                    },
                });

                if (completed.count !== 1) return;

                await transaction.contentChunk.deleteMany({
                    where: {
                        sourceType: job.sourceType,
                        sourceId: job.sourceId,
                    },
                });
                await transaction.contentChunk.createMany({
                    data: source.courseIds.flatMap((courseId) =>
                        chunks.map((chunk) => ({
                            sourceType: job.sourceType,
                            sourceId: job.sourceId,
                            courseId,
                            sequence: chunk.sequence,
                            content: chunk.content,
                            tokenCount: chunk.tokenCount,
                            embedding: chunk.embedding,
                            embeddingModel: chunk.embeddingModel,
                            metadata: chunk.metadata as Prisma.InputJsonObject,
                        })),
                    ),
                });
            });
        } catch (error) {
            const message = this.errorMessage(error);
            await this.statusDelegate(this.prisma, job.sourceType).updateMany({
                where: {
                    id: job.sourceId,
                    aiStatus: AiProcessingStatus.PROCESSING,
                },
                data: {
                    aiStatus: AiProcessingStatus.FAILED,
                    aiError: message,
                    aiProcessedAt: new Date(),
                },
            });
            this.logger.error(
                `Failed to process ${job.sourceType}:${job.sourceId}: ${message}`,
            );
        }
    }

    private async claim(job: ContentProcessingJob): Promise<boolean> {
        const result = await this.statusDelegate(
            this.prisma,
            job.sourceType,
        ).updateMany({
            where: {
                id: job.sourceId,
                aiStatus: AiProcessingStatus.PENDING,
            },
            data: {
                aiStatus: AiProcessingStatus.PROCESSING,
                aiError: null,
                aiProcessedAt: null,
            },
        });

        return result.count === 1;
    }

    private async loadSource(job: ContentProcessingJob): Promise<ProcessingSource> {
        switch (job.sourceType) {
            case ContentSourceType.FILE:
                return this.loadFile(job.sourceId);
            case ContentSourceType.POST:
                return this.loadPost(job.sourceId);
            case ContentSourceType.DISCUSSION:
                return this.loadDiscussion(job.sourceId);
            case ContentSourceType.REVIEW:
                return this.loadReview(job.sourceId);
        }
    }

    private async loadFile(sourceId: string): Promise<ProcessingSource> {
        const file = await this.prisma.file.findUnique({
            where: { id: sourceId },
            select: {
                name: true,
                mimeType: true,
                folderId: true,
                inCourses: { select: { courseId: true } },
                inPosts: {
                    select: {
                        post: { select: { courseId: true } },
                    },
                },
            },
        });
        if (!file) throw new Error('File no longer exists');

        const folderUrl = await this.folderService.getFolderUrl(file.folderId);
        const stream = await this.storage.readFile(
            path.posix.join(folderUrl.replace(/\\/g, '/'), file.name),
        );
        const extracted = await this.textExtraction.extract({
            originalname: file.name,
            mimetype: file.mimeType,
            buffer: await this.readBuffer(stream),
        });

        return {
            text: extracted.text,
            courseIds: this.uniqueCourseIds([
                ...file.inCourses.map((entry) => entry.courseId),
                ...file.inPosts.map((entry) => entry.post.courseId),
            ]),
            metadata: {
                sourceType: ContentSourceType.FILE,
                fileName: file.name,
                mimeType: file.mimeType,
                extractionFormat: extracted.format,
                extractionMethod: extracted.method,
                ...(extracted.model
                    ? { transcriptionModel: extracted.model }
                    : {}),
            },
        };
    }

    private async loadPost(sourceId: string): Promise<ProcessingSource> {
        const post = await this.prisma.post.findUnique({
            where: { id: sourceId },
            select: { title: true, content: true, courseId: true },
        });
        if (!post) throw new Error('Post no longer exists');

        return {
            text: [post.title, this.jsonText(post.content)]
                .filter(Boolean)
                .join('\n\n'),
            courseIds: this.uniqueCourseIds([post.courseId]),
            metadata: { sourceType: ContentSourceType.POST },
        };
    }

    private async loadDiscussion(sourceId: string): Promise<ProcessingSource> {
        const discussion = await this.prisma.discussion.findUnique({
            where: { id: sourceId },
            select: {
                discussion: true,
                post: { select: { courseId: true } },
            },
        });
        if (!discussion) throw new Error('Discussion no longer exists');

        return {
            text: this.jsonText(discussion.discussion),
            courseIds: this.uniqueCourseIds([discussion.post.courseId]),
            metadata: { sourceType: ContentSourceType.DISCUSSION },
        };
    }

    private async loadReview(sourceId: string): Promise<ProcessingSource> {
        const subscription = await this.prisma.subscribe.findUnique({
            where: { id: sourceId },
            select: { review: true, rating: true, courseId: true },
        });
        if (!subscription?.review) throw new Error('Review no longer exists');

        return {
            text: subscription.review,
            courseIds: [subscription.courseId],
            metadata: {
                sourceType: ContentSourceType.REVIEW,
                rating: subscription.rating,
            },
        };
    }

    private statusDelegate(client: any, sourceType: ContentSourceType): any {
        switch (sourceType) {
            case ContentSourceType.FILE:
                return client.file;
            case ContentSourceType.POST:
                return client.post;
            case ContentSourceType.DISCUSSION:
                return client.discussion;
            case ContentSourceType.REVIEW:
                return client.subscribe;
        }
    }

    private async readBuffer(stream: Readable): Promise<Buffer> {
        const chunks: Buffer[] = [];
        for await (const chunk of stream) {
            chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        }
        return Buffer.concat(chunks);
    }

    private jsonText(value: unknown): string {
        if (typeof value === 'string') return value.trim();
        if (Array.isArray(value)) {
            return value.map((item) => this.jsonText(item)).filter(Boolean).join('\n');
        }
        if (!value || typeof value !== 'object') return '';

        const record = value as Record<string, unknown>;
        if (typeof record.text === 'string') return record.text.trim();

        return Object.entries(record)
            .filter(([key]) => !['type', 'attrs', 'marks'].includes(key))
            .map(([, item]) => this.jsonText(item))
            .filter(Boolean)
            .join('\n');
    }

    private uniqueCourseIds(courseIds: Array<string | null>): string[] {
        return [...new Set(courseIds.filter((id): id is string => Boolean(id)))];
    }

    private jobKey(job: ContentProcessingJob): string {
        return `${job.sourceType}:${job.sourceId}`;
    }

    private scanIntervalMs(): number {
        const configured = Number(process.env.CONTENT_PROCESSING_SCAN_INTERVAL_MS);
        return Number.isInteger(configured) && configured >= 1_000
            ? configured
            : DEFAULT_SCAN_INTERVAL_MS;
    }

    private errorMessage(error: unknown): string {
        const message = error instanceof Error
            ? error.message
            : 'Unknown content-processing error';
        return message.slice(0, 2_000);
    }
}
