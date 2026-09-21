import { Prisma } from '../../../generated/prisma/client';

/** Add newly available skills; never downgrade existing evidence of ability.
 * Skills remain in a learner's history after unsubscribing or course edits.
 */
export async function grantSubscriptionSkills(
    transaction: Prisma.TransactionClient,
    courseId: string,
    userId?: string,
): Promise<void> {
    await transaction.$executeRaw`
        INSERT INTO "user_skill" ("userId", "skillId", "source", "status")
        SELECT DISTINCT s."userId", cs."skillId",
            'COURSE_SUBSCRIPTION'::"UserSkillSource", 'ASSUMED'::"UserSkillStatus"
        FROM "subscribe" s
        JOIN "course_skill" cs ON cs."courseId" = s."courseId"
        WHERE s."courseId" = ${courseId}
          AND (${userId ?? null}::text IS NULL OR s."userId" = ${userId ?? null})
        ON CONFLICT ("userId", "skillId") DO NOTHING
    `;
}
