import { Injectable } from '@nestjs/common';
import { Prisma } from '../../../generated/prisma/client';
import { GeneratedCourseProfile } from './course-summary.service';
import { grantSubscriptionSkills } from './subscription-skills';

@Injectable()
export class CourseProfileService {
    async replace(
        transaction: Prisma.TransactionClient,
        courseId: string,
        profile: GeneratedCourseProfile,
    ): Promise<void> {
        await transaction.courseAIProfile.upsert({
            where: { courseId },
            create: {
                courseId,
                summary: profile.summary,
                difficulty: profile.difficulty,
                profileText: profile.profileText,
                embeddingModel: profile.embeddingModel,
                sourceHash: profile.sourceHash,
            },
            update: {
                summary: profile.summary,
                difficulty: profile.difficulty,
                profileText: profile.profileText,
                embeddingModel: profile.embeddingModel,
                sourceHash: profile.sourceHash,
                generatedAt: new Date(),
                profileVersion: { increment: 1 },
            },
        });

        await transaction.courseSkill.deleteMany({ where: { courseId, instructorConfirmed: false } });
        if (profile.skills.length > 0) {
            await transaction.courseSkill.createMany({
                skipDuplicates: true,
                data: profile.skills.map((skill) => ({
                    courseId,
                    skillId: skill.skillId,
                    outcome: skill.outcome,
                    importance: skill.importance,
                })),
            });
        }

        await grantSubscriptionSkills(transaction, courseId);

        const vector = `[${profile.embedding.join(',')}]`;
        await transaction.$executeRaw`
            UPDATE "course_ai_profile"
            SET "embedding" = ${vector}::vector
            WHERE "courseId" = ${courseId}
        `;
    }
}
