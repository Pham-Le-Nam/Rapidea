CREATE TYPE "AiChatMessageRole" AS ENUM ('USER', 'ASSISTANT');

CREATE TABLE "ai_chat_conversation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT,
    "lastMessageAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_chat_conversation_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ai_chat_message" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "role" "AiChatMessageRole" NOT NULL,
    "content" TEXT NOT NULL,
    "model" TEXT,
    "tokenCount" INTEGER,
    "citations" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_chat_message_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ai_chat_conversation_summary" (
    "id" SERIAL NOT NULL,
    "conversationId" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "topics" JSONB,
    "decisions" JSONB,
    "openQuestions" JSONB,
    "nextSteps" JSONB,
    "salientFacts" JSONB,
    "summarizedThroughAt" TIMESTAMP(3),
    "sourceMessageCount" INTEGER NOT NULL DEFAULT 0,
    "summaryVersion" INTEGER NOT NULL DEFAULT 1,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_chat_conversation_summary_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "user_learning_profile" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "currentLearningPath" JSONB,
    "interests" JSONB,
    "learningGoals" JSONB,
    "knownSkills" JSONB,
    "targetSkills" JSONB,
    "knowledgeGaps" JSONB,
    "learningPreferences" JSONB,
    "constraints" JSONB,
    "progress" JSONB,
    "recommendedNextSteps" JSONB,
    "evidence" JSONB,
    "sourceHash" TEXT,
    "profileVersion" INTEGER NOT NULL DEFAULT 1,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_learning_profile_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "ai_chat_conversation_userId_lastMessageAt_idx"
ON "ai_chat_conversation"("userId", "lastMessageAt");

CREATE INDEX "ai_chat_message_conversationId_createdAt_idx"
ON "ai_chat_message"("conversationId", "createdAt");

CREATE UNIQUE INDEX "ai_chat_conversation_summary_conversationId_key"
ON "ai_chat_conversation_summary"("conversationId");

CREATE UNIQUE INDEX "user_learning_profile_userId_key"
ON "user_learning_profile"("userId");

ALTER TABLE "ai_chat_conversation"
ADD CONSTRAINT "ai_chat_conversation_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "users"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ai_chat_message"
ADD CONSTRAINT "ai_chat_message_conversationId_fkey"
FOREIGN KEY ("conversationId") REFERENCES "ai_chat_conversation"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ai_chat_conversation_summary"
ADD CONSTRAINT "ai_chat_conversation_summary_conversationId_fkey"
FOREIGN KEY ("conversationId") REFERENCES "ai_chat_conversation"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "user_learning_profile"
ADD CONSTRAINT "user_learning_profile_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "users"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
