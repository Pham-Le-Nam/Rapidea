/*
  Warnings:

  - You are about to drop the `reply_discussion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "reply_discussion" DROP CONSTRAINT "reply_discussion_repliedId_fkey";

-- DropForeignKey
ALTER TABLE "reply_discussion" DROP CONSTRAINT "reply_discussion_replyingId_fkey";

-- AlterTable
ALTER TABLE "discussion" ADD COLUMN     "parentId" TEXT;

-- DropTable
DROP TABLE "reply_discussion";

-- AddForeignKey
ALTER TABLE "discussion" ADD CONSTRAINT "discussion_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "discussion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
