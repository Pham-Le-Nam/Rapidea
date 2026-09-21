CREATE TYPE "UserSkillSource" AS ENUM ('SELF_REPORTED', 'COURSE_SUBSCRIPTION', 'ASSESSMENT');
CREATE TYPE "UserSkillStatus" AS ENUM ('ASSUMED', 'DEMONSTRATED');

ALTER TABLE "user_skill"
ADD COLUMN "source" "UserSkillSource" NOT NULL DEFAULT 'SELF_REPORTED',
ADD COLUMN "status" "UserSkillStatus" NOT NULL DEFAULT 'ASSUMED';

-- Existing subscriptions use the same rule as new subscriptions.
-- Preserve any existing user skill, including demonstrated skills.
INSERT INTO "user_skill" ("userId", "skillId", "source", "status")
SELECT DISTINCT s."userId", cs."skillId",
    'COURSE_SUBSCRIPTION'::"UserSkillSource", 'ASSUMED'::"UserSkillStatus"
FROM "subscribe" s
JOIN "course_skill" cs ON cs."courseId" = s."courseId"
ON CONFLICT ("userId", "skillId") DO NOTHING;
