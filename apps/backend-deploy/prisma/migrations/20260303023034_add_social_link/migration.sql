-- CreateEnum
CREATE TYPE "SocialPlatform" AS ENUM ('FACEBOOK', 'INSTAGRAM', 'TWITTER', 'LINKEDIN', 'GITHUB', 'TIKTOK', 'YOUTUBE', 'DISCORD', 'TELEGRAM', 'WEBSITE');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "headline" TEXT;

-- CreateTable
CREATE TABLE "social_link" (
    "id" TEXT NOT NULL,
    "platform" "SocialPlatform" NOT NULL,
    "url" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "social_link_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "social_link_userId_idx" ON "social_link"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "social_link_userId_platform_key" ON "social_link"("userId", "platform");

-- AddForeignKey
ALTER TABLE "social_link" ADD CONSTRAINT "social_link_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
