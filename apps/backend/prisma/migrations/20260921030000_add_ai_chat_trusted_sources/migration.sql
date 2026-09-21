CREATE TABLE "ai_chat_trusted_source" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "courseId" TEXT,
    "postId" TEXT,
    "fileId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_chat_trusted_source_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "ai_chat_trusted_source_exactly_one_source_check"
        CHECK (num_nonnulls("courseId", "postId", "fileId") = 1)
);

CREATE UNIQUE INDEX "ai_chat_trusted_source_conversationId_courseId_key"
ON "ai_chat_trusted_source"("conversationId", "courseId");

CREATE UNIQUE INDEX "ai_chat_trusted_source_conversationId_postId_key"
ON "ai_chat_trusted_source"("conversationId", "postId");

CREATE UNIQUE INDEX "ai_chat_trusted_source_conversationId_fileId_key"
ON "ai_chat_trusted_source"("conversationId", "fileId");

CREATE INDEX "ai_chat_trusted_source_conversationId_createdAt_idx"
ON "ai_chat_trusted_source"("conversationId", "createdAt");

CREATE INDEX "ai_chat_trusted_source_courseId_idx"
ON "ai_chat_trusted_source"("courseId");

CREATE INDEX "ai_chat_trusted_source_postId_idx"
ON "ai_chat_trusted_source"("postId");

CREATE INDEX "ai_chat_trusted_source_fileId_idx"
ON "ai_chat_trusted_source"("fileId");

ALTER TABLE "ai_chat_trusted_source"
ADD CONSTRAINT "ai_chat_trusted_source_conversationId_fkey"
FOREIGN KEY ("conversationId") REFERENCES "ai_chat_conversation"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ai_chat_trusted_source"
ADD CONSTRAINT "ai_chat_trusted_source_courseId_fkey"
FOREIGN KEY ("courseId") REFERENCES "course"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ai_chat_trusted_source"
ADD CONSTRAINT "ai_chat_trusted_source_postId_fkey"
FOREIGN KEY ("postId") REFERENCES "post"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ai_chat_trusted_source"
ADD CONSTRAINT "ai_chat_trusted_source_fileId_fkey"
FOREIGN KEY ("fileId") REFERENCES "file"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
