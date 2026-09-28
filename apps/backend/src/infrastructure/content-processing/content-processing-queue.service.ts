import {
    Inject,
    Injectable,
    Logger,
    OnApplicationBootstrap,
    OnModuleDestroy,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
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
import { CourseProfileService } from './course-profile.service';
import {
    CourseSummaryInput,
    CourseSummaryService,
} from './course-summary.service';
import { FileSummaryService } from './file-summary.service';
import { PostSkillService } from './post-skill.service';
import { PostSummaryInput, PostSummaryService } from './post-summary.service';
import { TextExtractionService } from './text-extraction.service';

const COURSE_SOURCE_TYPE = 'COURSE' as const;
type ProcessingSourceType = ContentSourceType | typeof COURSE_SOURCE_TYPE;

type ContentProcessingJob = {
    sourceType: ProcessingSourceType;
    sourceId: string;
    createdAt: Date;
};

type ProcessingSource = {
    text: string;
    courseIds: string[];
    metadata: Record<string, unknown>;
    fileSummaryInput?: {
        fileName: string;
        mimeType: string;
    };
    postSummaryInput?: PostSummaryInput;
};

const DEFAULT_SCAN_INTERVAL_MS = 5_000;
const DEFAULT_STALE_PROCESSING_TIMEOUT_MS = 15 * 60 * 1_000;
const CONTENT_WRITE_TRANSACTION_TIMEOUT_MS = 30_000;

type AiMaterialPreparationResult = {
    files: number;
    posts: number;
    discussions: number;
    reviews: number;
    courses: number;
};

class PendingContentDependencyError extends Error {}

@Injectable()
export class ContentProcessingQueueService
    implements OnApplicationBootstrap, OnModuleDestroy
{
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
        private readonly fileSummary: FileSummaryService,
        private readonly postSummary: PostSummaryService,
        private readonly postSkills: PostSkillService,
        private readonly courseSummary: CourseSummaryService,
        private readonly courseProfiles: CourseProfileService,
    ) {}

    onApplicationBootstrap(): void {
        void this.prepareAllAiMaterials().catch((error) => {
            this.logger.error('Initial AI material preparation failed', error);
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

    async prepareAllAiMaterials(): Promise<AiMaterialPreparationResult> {
        const result = await this.reconcileIncompleteAiMaterials();
        const queuedCount = Object.values(result).reduce(
            (total, count) => total + count,
            0,
        );

        this.logger.log(
            `AI material preparation queued ${queuedCount} incomplete, failed, or stale source(s) ` +
                `(${result.files} files, ${result.posts} posts, ${result.discussions} discussions, ` +
                `${result.reviews} reviews, ${result.courses} courses)`,
        );

        await this.scanAndProcessPending();
        return result;
    }

    async scanAndProcessPending(): Promise<void> {
        const jobs = await this.findPendingJobs();
        jobs.forEach((job) => this.enqueue(job));
        await this.startDrain();
    }

    private async findPendingJobs(): Promise<ContentProcessingJob[]> {
        const [files, posts, discussions, reviews, courses] = await Promise.all(
            [
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
                this.prisma.course.findMany({
                    where: { aiStatus: AiProcessingStatus.PENDING },
                    select: { id: true, createdAt: true },
                }),
            ],
        );

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
            ...courses.map((item) => ({
                sourceType: COURSE_SOURCE_TYPE,
                sourceId: item.id,
                createdAt: item.createdAt,
            })),
        ].sort(
            (left, right) =>
                left.createdAt.getTime() - right.createdAt.getTime(),
        );
    }

    private async reconcileIncompleteAiMaterials(): Promise<AiMaterialPreparationResult> {
        const embeddingModel = process.env.TEXT_EMBEDDING_MODEL?.trim() ?? '';
        const staleBefore = new Date(
            Date.now() - this.staleProcessingTimeoutMs(),
        );

        const [files, posts, discussions, reviews, courses] = await Promise.all(
            [
                this.prisma.$executeRaw`
                UPDATE "file" AS source
                SET "aiStatus" = 'PENDING'::"AiProcessingStatus",
                    "aiError" = NULL,
                    "aiProcessedAt" = NULL
                WHERE (
                    source."aiStatus" = 'PROCESSING'::"AiProcessingStatus"
                    AND (source."aiProcessedAt" IS NULL OR source."aiProcessedAt" < ${staleBefore})
                ) OR (
                    source."aiStatus" IS DISTINCT FROM 'PROCESSING'::"AiProcessingStatus"
                    AND (
                        source."aiStatus" = 'FAILED'::"AiProcessingStatus"
                        OR source."summary" IS NULL
                        OR NOT EXISTS (
                            SELECT 1
                            FROM "content_chunk" AS chunk
                            WHERE chunk."sourceType" = 'FILE'::"ContentSourceType"
                              AND chunk."sourceId" = source."id"
                        )
                        OR EXISTS (
                            SELECT 1
                            FROM "content_chunk" AS chunk
                            WHERE chunk."sourceType" = 'FILE'::"ContentSourceType"
                              AND chunk."sourceId" = source."id"
                              AND (
                                  chunk."embedding" IS NULL
                                  OR (${embeddingModel} <> '' AND chunk."embeddingModel" IS DISTINCT FROM ${embeddingModel})
                              )
                        )
                    )
                )
            `,
                this.prisma.$executeRaw`
                UPDATE "post" AS source
                SET "aiStatus" = 'PENDING'::"AiProcessingStatus",
                    "aiError" = NULL,
                    "aiProcessedAt" = NULL
                WHERE (
                    source."aiStatus" = 'PROCESSING'::"AiProcessingStatus"
                    AND (source."aiProcessedAt" IS NULL OR source."aiProcessedAt" < ${staleBefore})
                ) OR (
                    source."aiStatus" IS DISTINCT FROM 'PROCESSING'::"AiProcessingStatus"
                    AND (
                        source."aiStatus" = 'FAILED'::"AiProcessingStatus"
                        OR source."summary" IS NULL
                        OR NOT EXISTS (
                            SELECT 1
                            FROM "content_chunk" AS chunk
                            WHERE chunk."sourceType" = 'POST'::"ContentSourceType"
                              AND chunk."sourceId" = source."id"
                        )
                        OR EXISTS (
                            SELECT 1
                            FROM "content_chunk" AS chunk
                            WHERE chunk."sourceType" = 'POST'::"ContentSourceType"
                              AND chunk."sourceId" = source."id"
                              AND (
                                  chunk."embedding" IS NULL
                                  OR (${embeddingModel} <> '' AND chunk."embeddingModel" IS DISTINCT FROM ${embeddingModel})
                              )
                        )
                    )
                )
            `,
                this.prisma.$executeRaw`
                UPDATE "discussion" AS source
                SET "aiStatus" = 'PENDING'::"AiProcessingStatus",
                    "aiError" = NULL,
                    "aiProcessedAt" = NULL
                WHERE (
                    source."aiStatus" = 'PROCESSING'::"AiProcessingStatus"
                    AND (source."aiProcessedAt" IS NULL OR source."aiProcessedAt" < ${staleBefore})
                ) OR (
                    source."aiStatus" IS DISTINCT FROM 'PROCESSING'::"AiProcessingStatus"
                    AND (
                        source."aiStatus" = 'FAILED'::"AiProcessingStatus"
                        OR NOT EXISTS (
                            SELECT 1
                            FROM "content_chunk" AS chunk
                            WHERE chunk."sourceType" = 'DISCUSSION'::"ContentSourceType"
                              AND chunk."sourceId" = source."id"
                        )
                        OR EXISTS (
                            SELECT 1
                            FROM "content_chunk" AS chunk
                            WHERE chunk."sourceType" = 'DISCUSSION'::"ContentSourceType"
                              AND chunk."sourceId" = source."id"
                              AND (
                                  chunk."embedding" IS NULL
                                  OR (${embeddingModel} <> '' AND chunk."embeddingModel" IS DISTINCT FROM ${embeddingModel})
                              )
                        )
                    )
                )
            `,
                this.prisma.$executeRaw`
                UPDATE "subscribe" AS source
                SET "aiStatus" = 'PENDING'::"AiProcessingStatus",
                    "aiError" = NULL,
                    "aiProcessedAt" = NULL
                WHERE source."review" IS NOT NULL
                  AND (
                    (
                        source."aiStatus" = 'PROCESSING'::"AiProcessingStatus"
                        AND (source."aiProcessedAt" IS NULL OR source."aiProcessedAt" < ${staleBefore})
                    ) OR (
                        source."aiStatus" IS DISTINCT FROM 'PROCESSING'::"AiProcessingStatus"
                        AND (
                            source."aiStatus" IS NULL
                            OR source."aiStatus" = 'FAILED'::"AiProcessingStatus"
                            OR NOT EXISTS (
                                SELECT 1
                                FROM "content_chunk" AS chunk
                                WHERE chunk."sourceType" = 'REVIEW'::"ContentSourceType"
                                  AND chunk."sourceId" = source."id"
                            )
                            OR EXISTS (
                                SELECT 1
                                FROM "content_chunk" AS chunk
                                WHERE chunk."sourceType" = 'REVIEW'::"ContentSourceType"
                                  AND chunk."sourceId" = source."id"
                                  AND (
                                      chunk."embedding" IS NULL
                                      OR (${embeddingModel} <> '' AND chunk."embeddingModel" IS DISTINCT FROM ${embeddingModel})
                                  )
                            )
                        )
                    )
                  )
            `,
                this.prisma.$executeRaw`
                UPDATE "course" AS source
                SET "aiStatus" = 'PENDING'::"AiProcessingStatus",
                    "aiError" = NULL,
                    "aiProcessedAt" = NULL
                WHERE (
                    source."aiStatus" = 'PROCESSING'::"AiProcessingStatus"
                    AND (source."aiProcessedAt" IS NULL OR source."aiProcessedAt" < ${staleBefore})
                ) OR (
                    source."aiStatus" IS DISTINCT FROM 'PROCESSING'::"AiProcessingStatus"
                    AND (
                        source."aiStatus" = 'FAILED'::"AiProcessingStatus"
                        OR NOT EXISTS (
                            SELECT 1
                            FROM "course_ai_profile" AS profile
                            WHERE profile."courseId" = source."id"
                        )
                        OR EXISTS (
                            SELECT 1
                            FROM "course_ai_profile" AS profile
                            WHERE profile."courseId" = source."id"
                              AND (
                                  profile."embedding" IS NULL
                                  OR (${embeddingModel} <> '' AND profile."embeddingModel" IS DISTINCT FROM ${embeddingModel})
                              )
                        )
                    )
                )
            `,
            ],
        );

        return {
            files: Number(files),
            posts: Number(posts),
            discussions: Number(discussions),
            reviews: Number(reviews),
            courses: Number(courses),
        };
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
        if (!(await this.claim(job))) return;

        try {
            if (job.sourceType === COURSE_SOURCE_TYPE) {
                await this.processCourse(job.sourceId);
                return;
            }

            const contentSourceType = job.sourceType as ContentSourceType;
            const source = await this.loadSource(
                contentSourceType,
                job.sourceId,
            );

            const shouldCreateChunks = Boolean(source.text.trim());
            const [chunks, fileSummary, postProfile] = await Promise.all([
                shouldCreateChunks
                    ? this.chunkingEmbedding.chunkAndEmbed(source.text, {
                          metadata: source.metadata,
                      })
                    : Promise.resolve([]),
                source.fileSummaryInput
                    ? this.fileSummary.generate({
                          ...source.fileSummaryInput,
                          text: source.text,
                      })
                    : Promise.resolve(undefined),
                source.postSummaryInput
                    ? this.postSummary.generate(source.postSummaryInput)
                    : Promise.resolve(undefined),
            ]);
            if (shouldCreateChunks && chunks.length === 0) {
                throw new Error('Content source has no extractable text');
            }

            const generatedSummary = fileSummary ?? postProfile?.summary;
            const resolvedPostSkills = postProfile
                ? await this.postSkills.resolve(postProfile.skills)
                : undefined;

            await this.prisma.$transaction(
                async (transaction) => {
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
                            ...(generatedSummary === undefined
                                ? {}
                                : { summary: generatedSummary }),
                        },
                    });

                    if (completed.count !== 1) return;

                    await transaction.contentChunk.deleteMany({
                        where: {
                            sourceType: contentSourceType,
                            sourceId: job.sourceId,
                        },
                    });
                    const chunkCourseIds: Array<string | null> =
                        source.courseIds.length > 0 ? source.courseIds : [null];
                    const chunkData = chunkCourseIds.flatMap((courseId) =>
                        chunks.map((chunk) => ({
                            id: randomUUID(),
                            sourceType: contentSourceType,
                            sourceId: job.sourceId,
                            courseId,
                            sequence: chunk.sequence,
                            content: chunk.content,
                            tokenCount: chunk.tokenCount,
                            embedding: chunk.embedding,
                            embeddingModel: chunk.embeddingModel,
                            metadata: chunk.metadata as Prisma.InputJsonObject,
                        })),
                    );
                    if (chunkData.length > 0) {
                        await transaction.contentChunk.createMany({
                            data: chunkData.map(
                                ({ embedding: _embedding, ...chunk }) => chunk,
                            ),
                        });
                        await Promise.all(
                            chunkData.map((chunk) => {
                                const vector = `[${chunk.embedding.join(',')}]`;
                                return transaction.$executeRaw`
                                UPDATE "content_chunk"
                                SET "embedding" = ${vector}::vector
                                WHERE "id" = ${chunk.id}
                            `;
                            }),
                        );
                    }

                    if (resolvedPostSkills) {
                        await this.postSkills.replace(
                            transaction,
                            job.sourceId,
                            resolvedPostSkills,
                        );
                    }

                    if (
                        job.sourceType === ContentSourceType.POST &&
                        source.courseIds.length > 0
                    ) {
                        await transaction.course.updateMany({
                            where: { id: { in: source.courseIds } },
                            data: {
                                aiStatus: AiProcessingStatus.PENDING,
                                aiError: null,
                                aiProcessedAt: null,
                            },
                        });
                    }

                    if (
                        job.sourceType === ContentSourceType.FILE &&
                        fileSummary
                    ) {
                        await transaction.postSkill.deleteMany({
                            where: {
                                post: {
                                    files: { some: { fileId: job.sourceId } },
                                },
                            },
                        });
                        await transaction.post.updateMany({
                            where: {
                                files: { some: { fileId: job.sourceId } },
                            },
                            data: {
                                aiStatus: AiProcessingStatus.PENDING,
                                aiError: null,
                                aiProcessedAt: null,
                                summary: null,
                            },
                        });
                        await transaction.course.updateMany({
                            where: {
                                posts: {
                                    some: {
                                        files: {
                                            some: { fileId: job.sourceId },
                                        },
                                    },
                                },
                            },
                            data: {
                                aiStatus: AiProcessingStatus.PENDING,
                                aiError: null,
                                aiProcessedAt: null,
                            },
                        });
                    }
                },
                { timeout: CONTENT_WRITE_TRANSACTION_TIMEOUT_MS },
            );
        } catch (error) {
            if (error instanceof PendingContentDependencyError) {
                await this.statusDelegate(
                    this.prisma,
                    job.sourceType,
                ).updateMany({
                    where: {
                        id: job.sourceId,
                        aiStatus: AiProcessingStatus.PROCESSING,
                    },
                    data: {
                        aiStatus: AiProcessingStatus.PENDING,
                        aiError: null,
                        aiProcessedAt: null,
                    },
                });
                this.logger.debug(error.message);
                return;
            }

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
                aiProcessedAt: new Date(),
            },
        });

        return result.count === 1;
    }

    private async loadSource(
        sourceType: ContentSourceType,
        sourceId: string,
    ): Promise<ProcessingSource> {
        switch (sourceType) {
            case ContentSourceType.FILE:
                return this.loadFile(sourceId);
            case ContentSourceType.POST:
                return this.loadPost(sourceId);
            case ContentSourceType.DISCUSSION:
                return this.loadDiscussion(sourceId);
            case ContentSourceType.REVIEW:
                return this.loadReview(sourceId);
        }
    }

    private async processCourse(courseId: string): Promise<void> {
        const input = await this.loadCourse(courseId);
        const profile = await this.courseSummary.generate(input);

        await this.prisma.$transaction(
            async (transaction) => {
                const completed = await transaction.course.updateMany({
                    where: {
                        id: courseId,
                        aiStatus: AiProcessingStatus.PROCESSING,
                    },
                    data: {
                        aiStatus: AiProcessingStatus.READY,
                        aiError: null,
                        aiProcessedAt: new Date(),
                    },
                });
                if (completed.count !== 1) return;

                await this.courseProfiles.replace(
                    transaction,
                    courseId,
                    profile,
                );
            },
            { timeout: CONTENT_WRITE_TRANSACTION_TIMEOUT_MS },
        );
    }

    private async loadCourse(courseId: string): Promise<CourseSummaryInput> {
        const course = await this.prisma.course.findUnique({
            where: { id: courseId },
            select: {
                title: true,
                description: true,
                posts: {
                    orderBy: { createdAt: 'asc' },
                    select: {
                        id: true,
                        title: true,
                        summary: true,
                        aiStatus: true,
                        aiError: true,
                        skills: {
                            select: {
                                outcome: true,
                                importance: true,
                                confidence: true,
                                skill: {
                                    select: {
                                        id: true,
                                        name: true,
                                        description: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        if (!course) throw new Error('Course no longer exists');

        const failedPost = course.posts.find(
            (post) => post.aiStatus === AiProcessingStatus.FAILED,
        );
        if (failedPost) {
            throw new Error(
                `Post ${failedPost.title ?? failedPost.id} failed AI processing: ${failedPost.aiError ?? 'unknown error'}`,
            );
        }
        const pendingPost = course.posts.find(
            (post) =>
                post.aiStatus !== AiProcessingStatus.READY || !post.summary,
        );
        if (pendingPost) {
            throw new PendingContentDependencyError(
                `Course ${courseId} is waiting for post ${pendingPost.title ?? pendingPost.id}`,
            );
        }

        return {
            title: course.title,
            description: course.description ?? '',
            posts: course.posts.map((post) => ({
                id: post.id,
                title: post.title ?? '',
                summary: post.summary as string,
                skills: post.skills.map((postSkill) => ({
                    id: postSkill.skill.id,
                    name: postSkill.skill.name,
                    description: postSkill.skill.description,
                    outcome: postSkill.outcome,
                    importance: postSkill.importance,
                    confidence: postSkill.confidence,
                })),
            })),
        };
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
            fileSummaryInput: {
                fileName: file.name,
                mimeType: file.mimeType,
            },
        };
    }

    private async loadPost(sourceId: string): Promise<ProcessingSource> {
        const post = await this.prisma.post.findUnique({
            where: { id: sourceId },
            select: {
                title: true,
                content: true,
                courseId: true,
                files: {
                    orderBy: { createdAt: 'asc' },
                    select: {
                        file: {
                            select: {
                                id: true,
                                name: true,
                                mimeType: true,
                                summary: true,
                                aiStatus: true,
                                aiError: true,
                            },
                        },
                    },
                },
            },
        });
        if (!post) throw new Error('Post no longer exists');

        const failedFile = post.files.find(
            ({ file }) => file.aiStatus === AiProcessingStatus.FAILED,
        );
        if (failedFile) {
            throw new Error(
                `Attached file ${failedFile.file.name} failed AI processing: ${failedFile.file.aiError ?? 'unknown error'}`,
            );
        }

        const pendingFile = post.files.find(
            ({ file }) =>
                file.aiStatus !== AiProcessingStatus.READY || !file.summary,
        );
        if (pendingFile) {
            throw new PendingContentDependencyError(
                `Post ${sourceId} is waiting for attached file ${pendingFile.file.name}`,
            );
        }

        const description = this.jsonText(post.content);

        return {
            text: [post.title, description].filter(Boolean).join('\n\n'),
            courseIds: this.uniqueCourseIds([post.courseId]),
            metadata: {
                sourceType: ContentSourceType.POST,
                attachedFileCount: post.files.length,
            },
            postSummaryInput: {
                title: post.title ?? '',
                description,
                files: post.files.map(({ file }) => ({
                    id: file.id,
                    name: file.name,
                    mimeType: file.mimeType,
                    summary: file.summary as string,
                })),
            },
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

    private statusDelegate(client: any, sourceType: ProcessingSourceType): any {
        switch (sourceType) {
            case COURSE_SOURCE_TYPE:
                return client.course;
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
            return value
                .map((item) => this.jsonText(item))
                .filter(Boolean)
                .join('\n');
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
        return [
            ...new Set(courseIds.filter((id): id is string => Boolean(id))),
        ];
    }

    private jobKey(job: ContentProcessingJob): string {
        return `${job.sourceType}:${job.sourceId}`;
    }

    private scanIntervalMs(): number {
        const configured = Number(
            process.env.CONTENT_PROCESSING_SCAN_INTERVAL_MS,
        );
        return Number.isInteger(configured) && configured >= 1_000
            ? configured
            : DEFAULT_SCAN_INTERVAL_MS;
    }

    private staleProcessingTimeoutMs(): number {
        const configured = Number(
            process.env.CONTENT_PROCESSING_STALE_AFTER_MS,
        );
        return Number.isInteger(configured) && configured >= 60_000
            ? configured
            : DEFAULT_STALE_PROCESSING_TIMEOUT_MS;
    }

    private errorMessage(error: unknown): string {
        const message =
            error instanceof Error
                ? error.message
                : 'Unknown content-processing error';
        return message.slice(0, 2_000);
    }
}
