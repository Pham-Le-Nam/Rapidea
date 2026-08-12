CREATE TYPE "AccountRole" AS ENUM ('USER', 'ADMIN');
CREATE TYPE "ModerationStatus" AS ENUM ('PASSED', 'WARNING', 'SERIOUS_WARNING', 'BLOCKED', 'NOT_SCANNED');

ALTER TABLE "users"
ADD COLUMN "role" "AccountRole" NOT NULL DEFAULT 'USER',
ADD COLUMN "isBanned" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "bannedAt" TIMESTAMP(3),
ADD COLUMN "banReason" TEXT,
ADD COLUMN "creatorPrompt" TEXT;

ALTER TABLE "file"
ADD COLUMN "moderationStatus" "ModerationStatus" NOT NULL DEFAULT 'PASSED',
ADD COLUMN "moderationScore" DOUBLE PRECISION,
ADD COLUMN "moderationCategories" JSONB,
ADD COLUMN "moderationMessage" TEXT;

ALTER TYPE "NotificationType" ADD VALUE 'MODERATION_ALERT';
ALTER TYPE "NotificationType" ADD VALUE 'ADMIN_WARNING';

CREATE INDEX "users_role_isBanned_idx" ON "users"("role", "isBanned");
