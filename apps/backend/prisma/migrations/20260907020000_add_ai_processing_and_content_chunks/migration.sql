CREATE TYPE "AiProcessingStatus" AS ENUM ('PENDING', 'PROCESSING', 'READY', 'FAILED');
CREATE TYPE "ContentSourceType" AS ENUM ('FILE', 'POST');

ALTER TABLE "file"
ADD COLUMN "aiStatus" "AiProcessingStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN "aiError" TEXT,
ADD COLUMN "aiProcessedAt" TIMESTAMP(3);

ALTER TABLE "post"
ADD COLUMN "aiStatus" "AiProcessingStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN "aiError" TEXT,
ADD COLUMN "aiProcessedAt" TIMESTAMP(3);

UPDATE "file" SET "aiStatus" = 'PENDING';
UPDATE "post" SET "aiStatus" = 'PENDING';

CREATE TABLE "content_chunk" (
    "id" TEXT NOT NULL,
    "sourceType" "ContentSourceType" NOT NULL,
    "sourceId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "tokenCount" INTEGER NOT NULL,
    "embedding" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "content_chunk_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "content_chunk_sourceType_sourceId_courseId_sequence_key"
ON "content_chunk"("sourceType", "sourceId", "courseId", "sequence");

CREATE INDEX "content_chunk_courseId_idx" ON "content_chunk"("courseId");
CREATE INDEX "content_chunk_sourceType_sourceId_idx" ON "content_chunk"("sourceType", "sourceId");

ALTER TABLE "content_chunk"
ADD CONSTRAINT "content_chunk_courseId_fkey"
FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
