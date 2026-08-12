/*
  Warnings:

  - The `thumbnailId` column on the `course` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `logoId` column on the `education` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `logoId` column on the `experience` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `logoId` column on the `project` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `avatarId` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `backgroundId` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `File` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `in_course` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_postId_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_userId_fkey";

-- DropForeignKey
ALTER TABLE "course" DROP CONSTRAINT "course_thumbnailId_fkey";

-- DropForeignKey
ALTER TABLE "education" DROP CONSTRAINT "education_logoId_fkey";

-- DropForeignKey
ALTER TABLE "experience" DROP CONSTRAINT "experience_logoId_fkey";

-- DropForeignKey
ALTER TABLE "in_course" DROP CONSTRAINT "in_course_courseId_fkey";

-- DropForeignKey
ALTER TABLE "in_course" DROP CONSTRAINT "in_course_postId_fkey";

-- DropForeignKey
ALTER TABLE "project" DROP CONSTRAINT "project_logoId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_avatarId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_backgroundId_fkey";

-- AlterTable
ALTER TABLE "course" DROP COLUMN "thumbnailId",
ADD COLUMN     "thumbnailId" INTEGER;

-- AlterTable
ALTER TABLE "education" DROP COLUMN "logoId",
ADD COLUMN     "logoId" INTEGER;

-- AlterTable
ALTER TABLE "experience" DROP COLUMN "logoId",
ADD COLUMN     "logoId" INTEGER;

-- AlterTable
ALTER TABLE "project" DROP COLUMN "logoId",
ADD COLUMN     "logoId" INTEGER;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "avatarId",
ADD COLUMN     "avatarId" INTEGER,
DROP COLUMN "backgroundId",
ADD COLUMN     "backgroundId" INTEGER;

-- DropTable
DROP TABLE "File";

-- DropTable
DROP TABLE "in_course";

-- CreateTable
CREATE TABLE "post_in_course" (
    "courseId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "folder" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "url" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "folder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "folder_in_course" (
    "id" TEXT NOT NULL,
    "folderId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "folder_in_course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "file" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "file_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "file_in_course" (
    "id" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "file_in_course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "file_in_post" (
    "id" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "file_in_post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photo" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "url" TEXT NOT NULL DEFAULT 'photo',
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "photo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "post_in_course_courseId_idx" ON "post_in_course"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "post_in_course_courseId_postId_key" ON "post_in_course"("courseId", "postId");

-- CreateIndex
CREATE INDEX "folder_url_idx" ON "folder"("url");

-- CreateIndex
CREATE INDEX "folder_in_course_courseId_idx" ON "folder_in_course"("courseId");

-- CreateIndex
CREATE INDEX "file_url_idx" ON "file"("url");

-- CreateIndex
CREATE INDEX "file_in_course_courseId_idx" ON "file_in_course"("courseId");

-- CreateIndex
CREATE INDEX "file_in_post_postId_idx" ON "file_in_post"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "course_thumbnailId_key" ON "course"("thumbnailId");

-- CreateIndex
CREATE UNIQUE INDEX "education_logoId_key" ON "education"("logoId");

-- CreateIndex
CREATE UNIQUE INDEX "experience_logoId_key" ON "experience"("logoId");

-- CreateIndex
CREATE UNIQUE INDEX "project_logoId_key" ON "project"("logoId");

-- CreateIndex
CREATE UNIQUE INDEX "users_avatarId_key" ON "users"("avatarId");

-- CreateIndex
CREATE UNIQUE INDEX "users_backgroundId_key" ON "users"("backgroundId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "photo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_backgroundId_fkey" FOREIGN KEY ("backgroundId") REFERENCES "photo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_thumbnailId_fkey" FOREIGN KEY ("thumbnailId") REFERENCES "photo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_in_course" ADD CONSTRAINT "post_in_course_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_in_course" ADD CONSTRAINT "post_in_course_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience" ADD CONSTRAINT "experience_logoId_fkey" FOREIGN KEY ("logoId") REFERENCES "photo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "education" ADD CONSTRAINT "education_logoId_fkey" FOREIGN KEY ("logoId") REFERENCES "photo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_logoId_fkey" FOREIGN KEY ("logoId") REFERENCES "photo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "folder_in_course" ADD CONSTRAINT "folder_in_course_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "folder_in_course" ADD CONSTRAINT "folder_in_course_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file" ADD CONSTRAINT "file_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file_in_course" ADD CONSTRAINT "file_in_course_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file_in_course" ADD CONSTRAINT "file_in_course_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file_in_post" ADD CONSTRAINT "file_in_post_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file_in_post" ADD CONSTRAINT "file_in_post_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photo" ADD CONSTRAINT "photo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
