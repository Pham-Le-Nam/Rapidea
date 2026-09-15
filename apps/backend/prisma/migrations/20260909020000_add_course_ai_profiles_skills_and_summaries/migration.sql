CREATE EXTENSION IF NOT EXISTS vector;

CREATE TYPE "Difficulty" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

ALTER TABLE "post"
ADD COLUMN "summary" TEXT;

ALTER TABLE "file"
ADD COLUMN "summary" TEXT;

CREATE TABLE "course_ai_profile" (
    "id" SERIAL NOT NULL,
    "courseId" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "profileText" TEXT NOT NULL,
    "embedding" vector,
    "embeddingModel" TEXT,
    "profileVersion" INTEGER NOT NULL DEFAULT 1,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sourceHash" TEXT,

    CONSTRAINT "course_ai_profile_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "skill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "skill_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "course_skill" (
    "courseId" TEXT NOT NULL,
    "skillId" INTEGER NOT NULL,
    "importance" DOUBLE PRECISION NOT NULL DEFAULT 1,

    CONSTRAINT "course_skill_pkey" PRIMARY KEY ("courseId", "skillId")
);

CREATE UNIQUE INDEX "course_ai_profile_courseId_key"
ON "course_ai_profile"("courseId");

CREATE UNIQUE INDEX "skill_name_key"
ON "skill"("name");

CREATE INDEX "course_skill_skillId_idx"
ON "course_skill"("skillId");

ALTER TABLE "course_ai_profile"
ADD CONSTRAINT "course_ai_profile_courseId_fkey"
FOREIGN KEY ("courseId") REFERENCES "course"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "course_skill"
ADD CONSTRAINT "course_skill_courseId_fkey"
FOREIGN KEY ("courseId") REFERENCES "course"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "course_skill"
ADD CONSTRAINT "course_skill_skillId_fkey"
FOREIGN KEY ("skillId") REFERENCES "skill"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
