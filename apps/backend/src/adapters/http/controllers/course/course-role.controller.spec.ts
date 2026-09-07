import { ForbiddenException } from '@nestjs/common';
import { CourseController } from './course.controller';

describe('CourseController creator permissions', () => {
    const courseService = { createCourse: jest.fn() } as any;
    const controller = new CourseController(courseService, {} as any);

    beforeEach(() => jest.clearAllMocks());

    it('blocks learners from creating courses', async () => {
        await expect(controller.addCourse(
            { user: { userId: 'learner-1', role: 'LEARNER' } },
            { title: 'No access' } as any,
        )).rejects.toBeInstanceOf(ForbiddenException);
        expect(courseService.createCourse).not.toHaveBeenCalled();
    });

    it('allows administrators to create courses', async () => {
        courseService.createCourse.mockResolvedValue({ id: 'course-1' });
        await expect(controller.addCourse(
            { user: { userId: 'admin-1', role: 'ADMIN' } },
            { title: 'Allowed' } as any,
        )).resolves.toEqual({ id: 'course-1' });
    });
});
