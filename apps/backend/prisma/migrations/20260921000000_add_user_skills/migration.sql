CREATE TABLE "user_skill" (
    "userId" TEXT NOT NULL,
    "skillId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_skill_pkey" PRIMARY KEY ("userId", "skillId")
);

CREATE INDEX "user_skill_skillId_idx" ON "user_skill"("skillId");

ALTER TABLE "user_skill"
ADD CONSTRAINT "user_skill_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "users"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "user_skill"
ADD CONSTRAINT "user_skill_skillId_fkey"
FOREIGN KEY ("skillId") REFERENCES "skill"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
