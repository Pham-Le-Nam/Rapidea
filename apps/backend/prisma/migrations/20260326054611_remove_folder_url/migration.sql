/*
  Warnings:

  - You are about to drop the column `url` on the `file` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `folder` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[folderId,name]` on the table `file` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[parentId,name]` on the table `folder` will be added. If there are existing duplicate values, this will fail.
  - Made the column `title` on table `course` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "file_url_idx";

-- DropIndex
DROP INDEX "file_url_name_key";

-- DropIndex
DROP INDEX "folder_url_idx";

-- DropIndex
DROP INDEX "folder_url_name_key";

-- AlterTable
ALTER TABLE "course" ALTER COLUMN "title" SET NOT NULL;

-- AlterTable
ALTER TABLE "file" DROP COLUMN "url";

-- AlterTable
ALTER TABLE "folder" DROP COLUMN "url";

-- CreateIndex
CREATE INDEX "file_folderId_idx" ON "file"("folderId");

-- CreateIndex
CREATE UNIQUE INDEX "file_folderId_name_key" ON "file"("folderId", "name");

-- CreateIndex
CREATE INDEX "folder_parentId_idx" ON "folder"("parentId");

-- CreateIndex
CREATE UNIQUE INDEX "folder_parentId_name_key" ON "folder"("parentId", "name");
