ALTER TABLE "content_chunk"
ALTER COLUMN "courseId" DROP NOT NULL;

CREATE UNIQUE INDEX "content_chunk_standalone_source_sequence_key"
ON "content_chunk"("sourceType", "sourceId", "sequence")
WHERE "courseId" IS NULL;
