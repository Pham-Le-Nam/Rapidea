import {
    AiContentAccessMode,
    AiContentResourceType,
} from '../../application/ai-chat/ai-content-authorization.types';
import { ContentRetrievalService } from './content-retrieval.service';

function createFixture() {
    const prisma = {
        post: { findUniqueOrThrow: jest.fn() },
        file: { findUniqueOrThrow: jest.fn() },
        discussion: {
            findUniqueOrThrow: jest.fn(),
            findMany: jest.fn(),
        },
        subscribe: { findMany: jest.fn() },
    };
    const authorization = {
        assertCanAccess: jest.fn().mockResolvedValue(undefined),
    };
    const hybridSearch = {
        search: jest.fn(),
    };
    return {
        prisma,
        authorization,
        hybridSearch,
        service: new ContentRetrievalService(
            prisma as any,
            authorization as any,
            hybridSearch as any,
        ),
    };
}

describe('ContentRetrievalService', () => {
    it('delegates searches to the authorized hybrid search service', async () => {
        const fixture = createFixture();
        const input = { query: 'dependency injection', limit: 5 };
        fixture.hybridSearch.search.mockResolvedValue([{ chunkId: 'chunk-1' }]);

        await expect(
            fixture.service.search('learner-1', input),
        ).resolves.toEqual([{ chunkId: 'chunk-1' }]);
        expect(fixture.hybridSearch.search).toHaveBeenCalledWith(
            'learner-1',
            input,
        );
    });

    it.each([
        ['getPost', AiContentResourceType.POST, 'post', 'post-1'],
        ['getFile', AiContentResourceType.FILE, 'file', 'file-1'],
        [
            'getDiscussion',
            AiContentResourceType.DISCUSSION,
            'discussion',
            'discussion-1',
        ],
    ] as const)(
        'authorizes %s before loading it',
        async (method, type, delegate, id) => {
            const fixture = createFixture();
            const value = { id };
            fixture.prisma[delegate].findUniqueOrThrow.mockResolvedValue(value);

            await expect(
                fixture.service[method]('learner-1', id),
            ).resolves.toBe(value);
            expect(fixture.authorization.assertCanAccess).toHaveBeenCalledWith(
                'learner-1',
                { type, id },
                AiContentAccessMode.DETAILS,
            );
        },
    );

    it('loads bounded public course reviews through summary authorization', async () => {
        const fixture = createFixture();
        fixture.prisma.subscribe.findMany.mockResolvedValue([]);

        await fixture.service.getCourseReviews(
            'learner-1',
            'course-1',
            500,
        );

        expect(fixture.authorization.assertCanAccess).toHaveBeenCalledWith(
            'learner-1',
            { type: AiContentResourceType.COURSE, id: 'course-1' },
            AiContentAccessMode.SUMMARY,
        );
        expect(fixture.prisma.subscribe.findMany).toHaveBeenCalledWith(
            expect.objectContaining({
                where: { courseId: 'course-1', review: { not: null } },
                take: 50,
            }),
        );
    });

    it('loads a bounded authorized discussion thread for a post', async () => {
        const fixture = createFixture();
        fixture.prisma.post.findUniqueOrThrow.mockResolvedValue({
            id: 'post-1',
            title: 'Post',
            userId: 'author-1',
            courseId: 'course-1',
            course: {
                id: 'course-1',
                title: 'Course',
                userId: 'instructor-1',
            },
        });
        fixture.prisma.discussion.findMany.mockResolvedValue([
            {
                id: 'discussion-1',
                user: { id: 'instructor-1' },
            },
        ]);

        const result = await fixture.service.getPostDiscussions(
            'learner-1',
            'post-1',
            500,
        );

        expect(fixture.authorization.assertCanAccess).toHaveBeenCalledWith(
            'learner-1',
            { type: AiContentResourceType.POST, id: 'post-1' },
            AiContentAccessMode.DETAILS,
        );
        expect(fixture.prisma.discussion.findMany).toHaveBeenCalledWith(
            expect.objectContaining({
                where: { postId: 'post-1' },
                take: 100,
            }),
        );
        expect(result.discussions[0].authorContext).toEqual({
            isPostAuthor: false,
            isCourseInstructor: true,
        });
    });
});
