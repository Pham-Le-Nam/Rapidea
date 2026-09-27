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
                findMany: jest
                    .fn()
                    .mockResolvedValue([{ id: 'file-1', createdAt }]),
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
                    {
                        id: 'post-1',
                        createdAt: new Date(createdAt.getTime() + 1),
                    },
                ]),
                findUnique: jest.fn().mockResolvedValue({
                    title: 'Post title',
                    content: {
                        type: 'doc',
                        content: [
                            {
                                type: 'paragraph',
                                content: [{ type: 'text', text: 'Post body' }],
                            },
                        ],
                    },
                    courseId: 'course-2',
                    files: [
                        {
                            file: {
                                id: 'attached-file-1',
                                name: 'attachment.pdf',
                                mimeType: 'application/pdf',
                                summary: 'Attached file summary',
                                aiStatus: 'READY',
                                aiError: null,
                            },
                        },
                    ],
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
            course: {
                findMany: jest.fn().mockResolvedValue([]),
                findUnique: jest.fn(),
                updateMany: jest.fn().mockResolvedValue({ count: 1 }),
            },
            contentChunk,
            postSkill: {
                deleteMany: jest.fn().mockResolvedValue({ count: 0 }),
                createMany: jest.fn().mockResolvedValue({ count: 1 }),
            },
            $executeRaw: jest.fn().mockResolvedValue(1),
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
            chunkAndEmbed: jest
                .fn()
                .mockImplementation(async (text, options) => {
                    activeJobs += 1;
                    maximumActiveJobs = Math.max(maximumActiveJobs, activeJobs);
                    await Promise.resolve();
                    activeJobs -= 1;
                    return [
                        {
                            sequence: 0,
                            content: text,
                            tokenCount: 4,
                            embedding: [0.1, 0.2],
                            embeddingModel: 'test-embedding-model',
                            metadata: options.metadata,
                        },
                    ];
                }),
        };
        const fileSummary = {
            generate: jest
                .fn()
                .mockResolvedValue(
                    '## Overview\n\nLearner-friendly file summary.',
                ),
        };
        const postSummary = {
            generate: jest.fn().mockResolvedValue({
                summary: '## Overview\n\nLearner-friendly post summary.',
                skills: [
                    {
                        name: 'TypeScript',
                        description:
                            'Use TypeScript to create typed applications.',
                        outcome: 'Apply TypeScript types to application code.',
                        importance: 0.9,
                        confidence: 0.95,
                    },
                ],
            }),
        };
        const postSkills = {
            replace: jest.fn().mockResolvedValue(undefined),
        };
        const courseSummary = {
            generate: jest.fn().mockResolvedValue({
                summary: '## Overview\n\nCourse summary.',
                difficulty: 'INTERMEDIATE',
                profileText: 'Course profile text',
                skills: [
                    {
                        skillId: 7,
                        outcome: 'Apply TypeScript.',
                        importance: 0.9,
                    },
                ],
                embedding: [0.1, 0.2],
                embeddingModel: 'test-embedding-model',
                sourceHash: 'source-hash',
            }),
        };
        const courseProfiles = {
            replace: jest.fn().mockResolvedValue(undefined),
        };

        const service = new ContentProcessingQueueService(
            prisma,
            folderService as any,
            storage as any,
            textExtraction as any,
            chunkingEmbedding as any,
            fileSummary as any,
            postSummary as any,
            postSkills as any,
            courseSummary as any,
            courseProfiles as any,
        );

        return {
            service,
            prisma,
            contentChunk,
            storage,
            textExtraction,
            chunkingEmbedding,
            fileSummary,
            postSummary,
            postSkills,
            courseSummary,
            courseProfiles,
            maximumActiveJobs: () => maximumActiveJobs,
        };
    }

    it('processes pending files, posts, discussions, and reviews one by one', async () => {
        const fixture = createFixture();

        await fixture.service.scanAndProcessPending();

        expect(fixture.maximumActiveJobs()).toBe(1);
        expect(fixture.chunkingEmbedding.chunkAndEmbed).toHaveBeenCalledTimes(
            4,
        );
        expect(fixture.storage.readFile).toHaveBeenCalledWith(
            'courses/lesson/lesson.pdf',
        );
        expect(fixture.textExtraction.extract).toHaveBeenCalledWith({
            originalname: 'lesson.pdf',
            mimetype: 'application/pdf',
            buffer: Buffer.from('file bytes'),
        });
        expect(fixture.fileSummary.generate).toHaveBeenCalledTimes(1);
        expect(fixture.fileSummary.generate).toHaveBeenCalledWith({
            fileName: 'lesson.pdf',
            mimeType: 'application/pdf',
            text: 'Extracted file text',
        });
        expect(fixture.postSummary.generate).toHaveBeenCalledWith({
            title: 'Post title',
            description: 'Post body',
            files: [
                {
                    id: 'attached-file-1',
                    name: 'attachment.pdf',
                    mimeType: 'application/pdf',
                    summary: 'Attached file summary',
                },
            ],
        });
        expect(fixture.postSkills.replace).toHaveBeenCalledWith(
            fixture.prisma,
            'post-1',
            [
                {
                    name: 'TypeScript',
                    description: 'Use TypeScript to create typed applications.',
                    outcome: 'Apply TypeScript types to application code.',
                    importance: 0.9,
                    confidence: 0.95,
                },
            ],
        );
        expect(fixture.prisma.file.updateMany).toHaveBeenLastCalledWith({
            where: { id: 'file-1', aiStatus: 'PROCESSING' },
            data: {
                aiStatus: 'READY',
                aiError: null,
                aiProcessedAt: expect.any(Date),
                summary: '## Overview\n\nLearner-friendly file summary.',
            },
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
        expect(fixture.prisma.$executeRaw).toHaveBeenCalledTimes(4);
        expect(fixture.prisma.subscribe.findMany).toHaveBeenCalledWith({
            where: {
                aiStatus: 'PENDING',
                review: { not: null },
            },
            select: { id: true, createdAt: true },
        });
    });

    it('creates course-independent chunks for standalone content', async () => {
        const fixture = createFixture();
        fixture.prisma.subscribe.findMany.mockResolvedValue([]);
        fixture.prisma.file.findUnique.mockResolvedValue({
            name: 'public.pdf',
            mimeType: 'application/pdf',
            folderId: 'public-folder',
            inCourses: [],
            inPosts: [],
        });
        fixture.prisma.post.findUnique.mockResolvedValue({
            title: 'Standalone post',
            content: 'Standalone post body',
            courseId: null,
            files: [],
        });
        fixture.prisma.discussion.findUnique.mockResolvedValue({
            discussion: 'Standalone discussion',
            post: { courseId: null },
        });

        await fixture.service.scanAndProcessPending();

        expect(fixture.chunkingEmbedding.chunkAndEmbed).toHaveBeenCalledTimes(
            3,
        );
        const createdChunks = fixture.contentChunk.createMany.mock.calls.map(
            ([request]) => request.data[0],
        );
        expect(createdChunks).toEqual([
            expect.objectContaining({
                sourceType: ContentSourceType.FILE,
                courseId: null,
            }),
            expect.objectContaining({
                sourceType: ContentSourceType.POST,
                courseId: null,
            }),
            expect.objectContaining({
                sourceType: ContentSourceType.DISCUSSION,
                courseId: null,
            }),
        ]);
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

    it('defers a post while an attached file is still processing', async () => {
        const fixture = createFixture();
        fixture.prisma.file.findMany.mockResolvedValue([]);
        fixture.prisma.discussion.findMany.mockResolvedValue([]);
        fixture.prisma.subscribe.findMany.mockResolvedValue([]);
        fixture.prisma.post.findUnique.mockResolvedValue({
            title: 'Post title',
            content: 'Post body',
            courseId: 'course-2',
            files: [
                {
                    file: {
                        id: 'file-2',
                        name: 'pending.pdf',
                        mimeType: 'application/pdf',
                        summary: null,
                        aiStatus: 'PROCESSING',
                        aiError: null,
                    },
                },
            ],
        });
        (fixture.service as any).logger.debug = jest.fn();

        await fixture.service.scanAndProcessPending();

        expect(fixture.postSummary.generate).not.toHaveBeenCalled();
        expect(fixture.chunkingEmbedding.chunkAndEmbed).not.toHaveBeenCalled();
        expect(fixture.prisma.post.updateMany).toHaveBeenLastCalledWith({
            where: { id: 'post-1', aiStatus: 'PROCESSING' },
            data: {
                aiStatus: 'PENDING',
                aiError: null,
                aiProcessedAt: null,
            },
        });
        expect(fixture.postSkills.replace).not.toHaveBeenCalled();
    });

    it('generates a course profile from ready post summaries and skills', async () => {
        const fixture = createFixture();
        fixture.prisma.file.findMany.mockResolvedValue([]);
        fixture.prisma.post.findMany.mockResolvedValue([]);
        fixture.prisma.discussion.findMany.mockResolvedValue([]);
        fixture.prisma.subscribe.findMany.mockResolvedValue([]);
        fixture.prisma.course.findMany.mockResolvedValue([
            {
                id: 'course-1',
                createdAt: new Date('2026-01-01T00:00:00.000Z'),
            },
        ]);
        fixture.prisma.course.findUnique.mockResolvedValue({
            title: 'TypeScript course',
            description: 'Build typed applications.',
            posts: [
                {
                    id: 'post-1',
                    title: 'Type narrowing',
                    summary: 'Learn type narrowing.',
                    aiStatus: 'READY',
                    aiError: null,
                    skills: [
                        {
                            outcome: 'Apply type narrowing.',
                            importance: 0.9,
                            confidence: 0.95,
                            skill: {
                                id: 7,
                                name: 'TypeScript',
                                description: 'Develop typed applications.',
                            },
                        },
                    ],
                },
            ],
        });

        await fixture.service.scanAndProcessPending();

        expect(fixture.courseSummary.generate).toHaveBeenCalledWith({
            title: 'TypeScript course',
            description: 'Build typed applications.',
            posts: [
                {
                    id: 'post-1',
                    title: 'Type narrowing',
                    summary: 'Learn type narrowing.',
                    skills: [
                        {
                            id: 7,
                            name: 'TypeScript',
                            description: 'Develop typed applications.',
                            outcome: 'Apply type narrowing.',
                            importance: 0.9,
                            confidence: 0.95,
                        },
                    ],
                },
            ],
        });
        expect(fixture.courseProfiles.replace).toHaveBeenCalledWith(
            fixture.prisma,
            'course-1',
            expect.objectContaining({ sourceHash: 'source-hash' }),
        );
        expect(fixture.prisma.course.updateMany).toHaveBeenLastCalledWith({
            where: { id: 'course-1', aiStatus: 'PROCESSING' },
            data: {
                aiStatus: 'READY',
                aiError: null,
                aiProcessedAt: expect.any(Date),
            },
        });
    });

    it('defers a course while one of its posts is pending', async () => {
        const fixture = createFixture();
        fixture.prisma.file.findMany.mockResolvedValue([]);
        fixture.prisma.post.findMany.mockResolvedValue([]);
        fixture.prisma.discussion.findMany.mockResolvedValue([]);
        fixture.prisma.subscribe.findMany.mockResolvedValue([]);
        fixture.prisma.course.findMany.mockResolvedValue([
            {
                id: 'course-1',
                createdAt: new Date('2026-01-01T00:00:00.000Z'),
            },
        ]);
        fixture.prisma.course.findUnique.mockResolvedValue({
            title: 'TypeScript course',
            description: null,
            posts: [
                {
                    id: 'post-1',
                    title: 'Pending post',
                    summary: null,
                    aiStatus: 'PENDING',
                    aiError: null,
                    skills: [],
                },
            ],
        });
        (fixture.service as any).logger.debug = jest.fn();

        await fixture.service.scanAndProcessPending();

        expect(fixture.courseSummary.generate).not.toHaveBeenCalled();
        expect(fixture.courseProfiles.replace).not.toHaveBeenCalled();
        expect(fixture.prisma.course.updateMany).toHaveBeenLastCalledWith({
            where: { id: 'course-1', aiStatus: 'PROCESSING' },
            data: {
                aiStatus: 'PENDING',
                aiError: null,
                aiProcessedAt: null,
            },
        });
    });
});
