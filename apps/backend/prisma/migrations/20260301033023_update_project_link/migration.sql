/*
  Warnings:

  - Added the required column `url` to the `project_link` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "folder" DROP CONSTRAINT "folder_parentId_fkey";

-- AlterTable
ALTER TABLE "project_link" ADD COLUMN     "url" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "folder" ADD CONSTRAINT "folder_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
