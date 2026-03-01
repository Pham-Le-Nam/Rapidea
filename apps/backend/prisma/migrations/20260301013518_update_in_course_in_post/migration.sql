/*
  Warnings:

  - The primary key for the `file_in_course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `file_in_course` table. All the data in the column will be lost.
  - The primary key for the `file_in_post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `file_in_post` table. All the data in the column will be lost.
  - The primary key for the `folder_in_course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `folder_in_course` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fileId,courseId]` on the table `file_in_course` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fileId,postId]` on the table `file_in_post` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[folderId,courseId]` on the table `folder_in_course` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "file_in_course" DROP CONSTRAINT "file_in_course_pkey",
DROP COLUMN "id";

-- AlterTable
ALTER TABLE "file_in_post" DROP CONSTRAINT "file_in_post_pkey",
DROP COLUMN "id";

-- AlterTable
ALTER TABLE "folder_in_course" DROP CONSTRAINT "folder_in_course_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "file_in_course_fileId_courseId_key" ON "file_in_course"("fileId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "file_in_post_fileId_postId_key" ON "file_in_post"("fileId", "postId");

-- CreateIndex
CREATE UNIQUE INDEX "folder_in_course_folderId_courseId_key" ON "folder_in_course"("folderId", "courseId");
