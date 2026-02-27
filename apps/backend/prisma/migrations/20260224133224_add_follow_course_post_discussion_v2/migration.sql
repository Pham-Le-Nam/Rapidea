/*
  Warnings:

  - You are about to drop the `inCourse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rateDicussion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ratePost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `replyDiscussion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "inCourse" DROP CONSTRAINT "inCourse_courseId_fkey";

-- DropForeignKey
ALTER TABLE "inCourse" DROP CONSTRAINT "inCourse_postId_fkey";

-- DropForeignKey
ALTER TABLE "rateDicussion" DROP CONSTRAINT "rateDicussion_discussionId_fkey";

-- DropForeignKey
ALTER TABLE "rateDicussion" DROP CONSTRAINT "rateDicussion_userId_fkey";

-- DropForeignKey
ALTER TABLE "ratePost" DROP CONSTRAINT "ratePost_postId_fkey";

-- DropForeignKey
ALTER TABLE "ratePost" DROP CONSTRAINT "ratePost_userId_fkey";

-- DropForeignKey
ALTER TABLE "replyDiscussion" DROP CONSTRAINT "replyDiscussion_repliedId_fkey";

-- DropForeignKey
ALTER TABLE "replyDiscussion" DROP CONSTRAINT "replyDiscussion_replyingId_fkey";

-- DropTable
DROP TABLE "inCourse";

-- DropTable
DROP TABLE "rateDicussion";

-- DropTable
DROP TABLE "ratePost";

-- DropTable
DROP TABLE "replyDiscussion";

-- CreateTable
CREATE TABLE "in_course" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "in_course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rate_post" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rate_post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reply_discussion" (
    "id" TEXT NOT NULL,
    "repliedId" TEXT NOT NULL,
    "replyingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reply_discussion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rate_dicussion" (
    "id" TEXT NOT NULL,
    "discussionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rate_dicussion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "in_course_courseId_idx" ON "in_course"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "in_course_courseId_postId_key" ON "in_course"("courseId", "postId");

-- CreateIndex
CREATE UNIQUE INDEX "rate_post_postId_userId_key" ON "rate_post"("postId", "userId");

-- CreateIndex
CREATE INDEX "reply_discussion_repliedId_idx" ON "reply_discussion"("repliedId");

-- CreateIndex
CREATE UNIQUE INDEX "rate_dicussion_discussionId_userId_key" ON "rate_dicussion"("discussionId", "userId");

-- AddForeignKey
ALTER TABLE "in_course" ADD CONSTRAINT "in_course_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "in_course" ADD CONSTRAINT "in_course_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rate_post" ADD CONSTRAINT "rate_post_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rate_post" ADD CONSTRAINT "rate_post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reply_discussion" ADD CONSTRAINT "reply_discussion_repliedId_fkey" FOREIGN KEY ("repliedId") REFERENCES "discussion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reply_discussion" ADD CONSTRAINT "reply_discussion_replyingId_fkey" FOREIGN KEY ("replyingId") REFERENCES "discussion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rate_dicussion" ADD CONSTRAINT "rate_dicussion_discussionId_fkey" FOREIGN KEY ("discussionId") REFERENCES "discussion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rate_dicussion" ADD CONSTRAINT "rate_dicussion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
