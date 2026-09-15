CREATE INDEX "subscribe_aiStatus_createdAt_idx"
ON "subscribe"("aiStatus", "createdAt");

CREATE INDEX "post_aiStatus_createdAt_idx"
ON "post"("aiStatus", "createdAt");

CREATE INDEX "discussion_aiStatus_createdAt_idx"
ON "discussion"("aiStatus", "createdAt");

CREATE INDEX "file_aiStatus_createdAt_idx"
ON "file"("aiStatus", "createdAt");
