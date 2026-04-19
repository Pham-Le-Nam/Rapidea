/*
  Warnings:

  - You are about to drop the column `parentId` on the `discussion` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "discussion" DROP CONSTRAINT "discussion_parentId_fkey";

-- AlterTable
ALTER TABLE "discussion" DROP COLUMN "parentId",
ADD COLUMN     "repliedId" TEXT;

-- AddForeignKey
ALTER TABLE "discussion" ADD CONSTRAINT "discussion_repliedId_fkey" FOREIGN KEY ("repliedId") REFERENCES "discussion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
