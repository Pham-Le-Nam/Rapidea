-- Align AI processing fields that were added to schema.prisma without a
-- corresponding database migration.
ALTER TYPE "ContentSourceType" ADD VALUE IF NOT EXISTS 'DISCUSSION';
ALTER TYPE "ContentSourceType" ADD VALUE IF NOT EXISTS 'REVIEW';

ALTER TABLE "content_chunk"
ADD COLUMN IF NOT EXISTS "embeddingModel" TEXT;

ALTER TABLE "tag"
ADD COLUMN IF NOT EXISTS "embeddingModel" TEXT;
