import { Difficulty } from '../../../generated/prisma/enums';
import { CourseProfileService } from './course-profile.service';

describe('CourseProfileService', () => {
    it('atomically replaces the course profile, skills, and vector', async () => {
        const transaction: any = {
            courseAIProfile: { upsert: jest.fn().mockResolvedValue({ id: 1 }) },
            courseSkill: {
                deleteMany: jest.fn().mockResolvedValue({ count: 1 }),
                createMany: jest.fn().mockResolvedValue({ count: 1 }),
            },
            $executeRaw: jest.fn().mockResolvedValue(1),
        };
        const service = new CourseProfileService();
        const profile = {
            summary: 'Course summary',
            difficulty: Difficulty.INTERMEDIATE,
            profileText: 'Course profile text',
            skills: [
                {
                    skillId: 7,
                    outcome: 'Apply TypeScript safely.',
                    importance: 0.9,
                },
            ],
            embedding: [0.1, 0.2],
            embeddingModel: 'test-embedding-model',
            sourceHash: 'source-hash',
        };

        await service.replace(transaction, 'course-1', profile);

        expect(transaction.courseAIProfile.upsert).toHaveBeenCalledWith({
            where: { courseId: 'course-1' },
            create: {
                courseId: 'course-1',
                summary: 'Course summary',
                difficulty: Difficulty.INTERMEDIATE,
                profileText: 'Course profile text',
                embeddingModel: 'test-embedding-model',
                sourceHash: 'source-hash',
            },
            update: {
                summary: 'Course summary',
                difficulty: Difficulty.INTERMEDIATE,
                profileText: 'Course profile text',
                embeddingModel: 'test-embedding-model',
                sourceHash: 'source-hash',
                generatedAt: expect.any(Date),
                profileVersion: { increment: 1 },
            },
        });
        expect(transaction.courseSkill.deleteMany).toHaveBeenCalledWith({
            where: { courseId: 'course-1' },
        });
        expect(transaction.courseSkill.createMany).toHaveBeenCalledWith({
            data: [
                {
                    courseId: 'course-1',
                    skillId: 7,
                    outcome: 'Apply TypeScript safely.',
                    importance: 0.9,
                },
            ],
        });
        expect(transaction.$executeRaw).toHaveBeenCalledTimes(1);
    });
});
