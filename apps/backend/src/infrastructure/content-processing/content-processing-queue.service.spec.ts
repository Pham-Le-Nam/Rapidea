import { Readable } from 'stream';
import { ContentSourceType } from '../../../generated/prisma/enums';
import { ContentProcessingQueueService } from './content-processing-queue.service';

describe('ContentProcessingQueueService', () => {
    function createFixture() {
        const createdAt = new Date('2026-01-01T00:00:00.000Z');
        const contentChunk = {
            deleteMany: jest.fn().mockResolvedValue({ count: 0 }),
            createMany: jest.fn().mockResolvedValue({ count: 1 }),
        };
        const prisma: any = {
            file: {
                findMany: jest.fn().mockResolvedValue([
                    { id: 'file-1', createdAt },
                ]),
                findUnique: jest.fn().mockResolvedValue({
                    name: 'lesson.pdf',
                    mimeType: 'application/pdf',
                    folderId: 'folder-1',
                    inCourses: [{ courseId: 'course-1' }],
                    inPosts: [{ post: { courseId: 'course-1' } }],
                }),
                updateMany: jest.fn().mockResolvedValue({ count: 1 }),
            },
            post: {
                findMany: jest.fn().mockResolvedValue([
                    { id: 'post-1', createdAt: new Date(createdAt.getTime() + 1) },
                ]),
                findUnique: jest.fn().mockResolvedValue({
                    title: 'Post title',
                    content: {
                        type: 'doc',
                        content: [{
                            type: 'paragraph',
                            content: [{ type: 'text', text: 'Post body' }],
                        }],
                    },
                    courseId: 'course-2',
                }),
                updateMany: jest.fn().mockResolvedValue({ count: 1 }),
            },
            discussion: {
                findMany: jest.fn().mockResolvedValue([
                    {
                        id: 'discussion-1',
                        createdAt: new Date(createdAt.getTime() + 2),
                    },
                ]),
                findUnique: jest.fn().mockResolvedValue({
                    discussion: {
                        type: 'doc',
                        content: [{ type: 'text', text: 'Discussion body' }],
                    },
                    post: { courseId: 'course-3' },
                }),
                updateMany: jest.fn().mockResolvedValue({ count: 1 }),
            },
            subscribe: {
                findMany: jest.fn().mockResolvedValue([
                    {
                        id: 'review-1',
                        createdAt: new Date(createdAt.getTime() + 3),
                    },
                ]),
                findUnique: jest.fn().mockResolvedValue({
                    review: 'Helpful course review',
                    rating: 5,
                    courseId: 'course-4',
                }),
                updateMany: jest.fn().mockResolvedValue({ count: 1 }),
            },
            contentChunk,
        };
        prisma.$transaction = jest.fn(async (callback) => callback(prisma));

        const folderService = {
            getFolderUrl: jest.fn().mockResolvedValue('courses/lesson'),
        };
        const storage = {
            readFile: jest.fn().mockResolvedValue(Readable.from('file bytes')),
        };
        const textExtraction = {
            extract: jest.fn().mockResolvedValue({
                text: 'Extracted file text',
                format: 'pdf',
                method: 'document',
            }),
        };

        let activeJobs = 0;
        let maximumActiveJobs = 0;
        const chunkingEmbedding = {
            chunkAndEmbed: jest.fn().mockImplementation(async (text, options) => {
                activeJobs += 1;
                maximumActiveJobs = Math.max(maximumActiveJobs, activeJobs);
                await Promise.resolve();
                activeJobs -= 1;
                return [{
                    sequence: 0,
                    content: text,
                    tokenCount: 4,
                    embedding: [0.1, 0.2],
                    embeddingModel: 'test-embedding-model',
                    metadata: options.metadata,
                }];
            }),
        };

        const service = new ContentProcessingQueueService(
            prisma,
            folderService as any,
            storage as any,
            textExtraction as any,
            chunkingEmbedding as any,
        );

        return {
            service,
            prisma,
            contentChunk,
            storage,
            textExtraction,
            chunkingEmbedding,
            maximumActiveJobs: () => maximumActiveJobs,
        };
    }

    it('processes pending files, posts, discussions, and reviews one by one', async () => {
        const fixture = createFixture();

        await fixture.service.scanAndProcessPending();

        expect(fixture.maximumActiveJobs()).toBe(1);
        expect(fixture.chunkingEmbedding.chunkAndEmbed).toHaveBeenCalledTimes(4);
        expect(fixture.storage.readFile).toHaveBeenCalledWith(
            'courses/lesson/lesson.pdf',
        );
        expect(fixture.textExtraction.extract).toHaveBeenCalledWith({
            originalname: 'lesson.pdf',
            mimetype: 'application/pdf',
            buffer: Buffer.from('file bytes'),
        });

        const sourceTypes = fixture.contentChunk.createMany.mock.calls.map(
            ([request]) => request.data[0].sourceType,
        );
        expect(sourceTypes).toEqual([
            ContentSourceType.FILE,
            ContentSourceType.POST,
            ContentSourceType.DISCUSSION,
            ContentSourceType.REVIEW,
        ]);
        expect(fixture.prisma.subscribe.findMany).toHaveBeenCalledWith({
            where: {
                aiStatus: 'PENDING',
                review: { not: null },
            },
            select: { id: true, createdAt: true },
        });
    });

    it('marks a source failed when the pipeline fails', async () => {
        const fixture = createFixture();
        fixture.prisma.file.findMany.mockResolvedValue([]);
        fixture.prisma.discussion.findMany.mockResolvedValue([]);
        fixture.prisma.subscribe.findMany.mockResolvedValue([]);
        fixture.chunkingEmbedding.chunkAndEmbed.mockRejectedValue(
            new Error('Embedding unavailable'),
        );
        (fixture.service as any).logger.error = jest.fn();

        await fixture.service.scanAndProcessPending();

        expect(fixture.prisma.post.updateMany).toHaveBeenLastCalledWith({
            where: { id: 'post-1', aiStatus: 'PROCESSING' },
            data: {
                aiStatus: 'FAILED',
                aiError: 'Embedding unavailable',
                aiProcessedAt: expect.any(Date),
            },
        });
        expect(fixture.contentChunk.createMany).not.toHaveBeenCalled();
    });
});
