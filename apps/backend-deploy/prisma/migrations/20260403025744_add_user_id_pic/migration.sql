/*
  Warnings:

  - Added the required column `userId` to the `post_in_course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "post_in_course" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "post_in_course" ADD CONSTRAINT "post_in_course_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
