/*
  Warnings:

  - Added the required column `userId` to the `file_in_course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `file_in_post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "file_in_course" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "file_in_post" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "file_in_course" ADD CONSTRAINT "file_in_course_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file_in_post" ADD CONSTRAINT "file_in_post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
