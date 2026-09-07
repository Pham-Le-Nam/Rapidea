import { ForbiddenException } from '@nestjs/common';
import { PostController } from './post.controller';

describe('PostController creator permissions', () => {
    const postService = { createPost: jest.fn() } as any;
    const controller = new PostController(postService, {} as any, {} as any);

    beforeEach(() => jest.clearAllMocks());

    it('blocks learners from creating posts', async () => {
        await expect(controller.createPost(
            { user: { userId: 'learner-1', role: 'LEARNER' } },
            { title: 'No access' } as any,
        )).rejects.toBeInstanceOf(ForbiddenException);
        expect(postService.createPost).not.toHaveBeenCalled();
    });

    it('allows instructors to create posts', async () => {
        postService.createPost.mockResolvedValue({ id: 'post-1' });
        await expect(controller.createPost(
            { user: { userId: 'instructor-1', role: 'INSTRUCTOR' } },
            { title: 'Allowed' } as any,
        )).resolves.toEqual({ id: 'post-1' });
    });
});
