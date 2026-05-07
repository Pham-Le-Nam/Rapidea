CREATE TYPE "NotificationType" AS ENUM (
    'FOLLOW',
    'COURSE_SUBSCRIBE',
    'COURSE_REVIEW',
    'POST_RATE',
    'POST_DISCUSSION',
    'FOLLOWING_NEW_COURSE',
    'FOLLOWING_NEW_POST',
    'SUBSCRIBED_CREATOR_NEW_COURSE',
    'SUBSCRIBED_CREATOR_NEW_POST'
);

CREATE TABLE "notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "actorId" TEXT,
    "type" "NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "link" TEXT,
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "notification_userId_readAt_createdAt_idx" ON "notification"("userId", "readAt", "createdAt");
CREATE INDEX "notification_actorId_idx" ON "notification"("actorId");

ALTER TABLE "notification" ADD CONSTRAINT "notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "notification" ADD CONSTRAINT "notification_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
