-- Complete the shared skill taxonomy fields represented by the Prisma schema.
ALTER TABLE "skill"
ADD COLUMN "description" TEXT,
ADD COLUMN "embedding" vector,
ADD COLUMN "embeddingModel" TEXT;

ALTER TABLE "course_skill"
ADD COLUMN "outcome" TEXT NOT NULL DEFAULT '';

ALTER TABLE "course_skill"
ALTER COLUMN "outcome" DROP DEFAULT;

CREATE TABLE "skill_alias" (
    "id" SERIAL NOT NULL,
    "skillId" INTEGER NOT NULL,
    "alias" TEXT NOT NULL,

    CONSTRAINT "skill_alias_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "skill_alias_alias_key" ON "skill_alias"("alias");

ALTER TABLE "skill_alias"
ADD CONSTRAINT "skill_alias_skillId_fkey"
FOREIGN KEY ("skillId") REFERENCES "skill"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE TABLE "post_skill" (
    "postId" TEXT NOT NULL,
    "skillId" INTEGER NOT NULL,
    "outcome" TEXT NOT NULL,
    "importance" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "confidence" DOUBLE PRECISION,

    CONSTRAINT "post_skill_pkey" PRIMARY KEY ("postId", "skillId")
);

CREATE INDEX "post_skill_skillId_idx" ON "post_skill"("skillId");

ALTER TABLE "post_skill"
ADD CONSTRAINT "post_skill_postId_fkey"
FOREIGN KEY ("postId") REFERENCES "post"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "post_skill"
ADD CONSTRAINT "post_skill_skillId_fkey"
FOREIGN KEY ("skillId") REFERENCES "skill"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

-- Backfill AI artifacts introduced after existing content may already be READY.
UPDATE "file"
SET "aiStatus" = 'PENDING', "aiError" = NULL, "aiProcessedAt" = NULL
WHERE "summary" IS NULL;

UPDATE "post"
SET "aiStatus" = 'PENDING', "aiError" = NULL, "aiProcessedAt" = NULL
WHERE "summary" IS NULL;
