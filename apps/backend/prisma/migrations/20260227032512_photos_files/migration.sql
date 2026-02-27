/*
  Warnings:

  - You are about to drop the column `postCount` on the `course` table. All the data in the column will be lost.
  - You are about to drop the column `subscriberId` on the `subscribe` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[courseId,userId]` on the table `subscribe` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `subscribe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "subscribe" DROP CONSTRAINT "subscribe_subscriberId_fkey";

-- DropIndex
DROP INDEX "subscribe_courseId_subscriberId_key";

-- AlterTable
ALTER TABLE "course" DROP COLUMN "postCount",
ADD COLUMN     "postsCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "subscribersCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "subscribe" DROP COLUMN "subscriberId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "subscribe_courseId_userId_key" ON "subscribe"("courseId", "userId");

-- AddForeignKey
ALTER TABLE "subscribe" ADD CONSTRAINT "subscribe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
