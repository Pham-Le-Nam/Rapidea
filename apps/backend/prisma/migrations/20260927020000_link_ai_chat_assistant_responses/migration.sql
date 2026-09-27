ALTER TABLE "ai_chat_message"
ADD COLUMN "responseToMessageId" TEXT;

CREATE UNIQUE INDEX "ai_chat_message_responseToMessageId_key"
ON "ai_chat_message"("responseToMessageId");
