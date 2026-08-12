/*
  Warnings:

  - You are about to drop the `folder_in_course` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[folderId]` on the table `course` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `folderId` to the `course` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "folder_in_course" DROP CONSTRAINT "folder_in_course_courseId_fkey";

-- DropForeignKey
ALTER TABLE "folder_in_course" DROP CONSTRAINT "folder_in_course_folderId_fkey";

-- AlterTable
ALTER TABLE "course" ADD COLUMN     "folderId" TEXT NOT NULL;

-- DropTable
DROP TABLE "folder_in_course";

-- CreateIndex
CREATE UNIQUE INDEX "course_folderId_key" ON "course"("folderId");

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
