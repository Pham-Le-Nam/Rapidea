ALTER TABLE "course"
ADD COLUMN "aiStatus" "AiProcessingStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN "aiError" TEXT,
ADD COLUMN "aiProcessedAt" TIMESTAMP(3);

ALTER TABLE "discussion"
ADD COLUMN "aiStatus" "AiProcessingStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN "aiError" TEXT,
ADD COLUMN "aiProcessedAt" TIMESTAMP(3);

ALTER TABLE "subscribe"
ADD COLUMN "aiStatus" "AiProcessingStatus",
ADD COLUMN "aiError" TEXT,
ADD COLUMN "aiProcessedAt" TIMESTAMP(3);

UPDATE "course" SET "aiStatus" = 'PENDING';
UPDATE "discussion" SET "aiStatus" = 'PENDING';
UPDATE "subscribe" SET "aiStatus" = 'PENDING' WHERE "review" IS NOT NULL;
