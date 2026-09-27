ALTER TABLE "ai_chat_conversation_summary"
ADD COLUMN "currentLearningPath" JSONB,
ADD COLUMN "interests" JSONB,
ADD COLUMN "learningGoals" JSONB,
ADD COLUMN "learnerPreferences" JSONB,
ADD COLUMN "skills" JSONB,
ADD COLUMN "resourceReferences" JSONB,
ADD COLUMN "summarizedThroughMessageId" TEXT;
