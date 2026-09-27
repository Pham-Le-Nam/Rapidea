ALTER TABLE "content_chunk"
ALTER COLUMN "embedding" TYPE vector(1536)
USING (
    CASE
        WHEN "embedding" IS NULL THEN NULL
        ELSE "embedding"::text::vector(1536)
    END
);

ALTER TABLE "course_ai_profile"
ALTER COLUMN "embedding" TYPE vector(1536)
USING "embedding"::vector(1536);

CREATE INDEX "content_chunk_embedding_hnsw_idx"
ON "content_chunk"
USING hnsw ("embedding" vector_cosine_ops);

CREATE INDEX "course_ai_profile_embedding_hnsw_idx"
ON "course_ai_profile"
USING hnsw ("embedding" vector_cosine_ops);

CREATE INDEX "content_chunk_content_fts_idx"
ON "content_chunk"
USING GIN (to_tsvector('english', "content"));
