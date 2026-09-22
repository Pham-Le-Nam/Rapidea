ALTER TABLE "ai_chat_message"
ADD COLUMN "clientRequestId" TEXT;

CREATE UNIQUE INDEX "ai_chat_message_clientRequestId_key"
ON "ai_chat_message"("clientRequestId");
