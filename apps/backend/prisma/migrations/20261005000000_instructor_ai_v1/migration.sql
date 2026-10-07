CREATE TYPE "AiAssistantMode" AS ENUM ('LEARNER', 'INSTRUCTOR');
ALTER TABLE "ai_chat_conversation" ADD COLUMN "mode" "AiAssistantMode" NOT NULL DEFAULT 'LEARNER';
CREATE INDEX "ai_chat_conversation_userId_mode_lastMessageAt_idx" ON "ai_chat_conversation"("userId", "mode", "lastMessageAt");
ALTER TABLE "course_skill" ADD COLUMN "instructorConfirmed" BOOLEAN NOT NULL DEFAULT false;
CREATE TABLE "course_learning_outcome" (
  "id" TEXT NOT NULL, "courseId" TEXT NOT NULL, "text" TEXT NOT NULL, "sequence" INTEGER NOT NULL,
  CONSTRAINT "course_learning_outcome_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "course_learning_outcome_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "course_learning_outcome_courseId_sequence_key" ON "course_learning_outcome"("courseId", "sequence");
CREATE TABLE "course_prerequisite_skill" (
  "courseId" TEXT NOT NULL, "skillId" INTEGER NOT NULL, "reason" TEXT NOT NULL,
  CONSTRAINT "course_prerequisite_skill_pkey" PRIMARY KEY ("courseId", "skillId"),
  CONSTRAINT "course_prerequisite_skill_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "course_prerequisite_skill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX "course_prerequisite_skill_skillId_idx" ON "course_prerequisite_skill"("skillId");
CREATE TABLE "course_teaching_plan" (
  "courseId" TEXT NOT NULL, "structure" JSONB NOT NULL, "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "course_teaching_plan_pkey" PRIMARY KEY ("courseId"),
  CONSTRAINT "course_teaching_plan_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
