CREATE TABLE "chat_conversation" (
    "id" TEXT NOT NULL,
    "userAId" TEXT NOT NULL,
    "userBId" TEXT NOT NULL,
    "lastMessageAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "chat_conversation_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "chat_message" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "chat_message_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "chat_conversation_userAId_userBId_key" ON "chat_conversation"("userAId", "userBId");
CREATE INDEX "chat_conversation_userAId_lastMessageAt_idx" ON "chat_conversation"("userAId", "lastMessageAt");
CREATE INDEX "chat_conversation_userBId_lastMessageAt_idx" ON "chat_conversation"("userBId", "lastMessageAt");
CREATE INDEX "chat_message_conversationId_createdAt_idx" ON "chat_message"("conversationId", "createdAt");
CREATE INDEX "chat_message_senderId_createdAt_idx" ON "chat_message"("senderId", "createdAt");

ALTER TABLE "chat_conversation" ADD CONSTRAINT "chat_conversation_userAId_fkey" FOREIGN KEY ("userAId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "chat_conversation" ADD CONSTRAINT "chat_conversation_userBId_fkey" FOREIGN KEY ("userBId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "chat_message" ADD CONSTRAINT "chat_message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "chat_conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "chat_message" ADD CONSTRAINT "chat_message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
