/*
  Warnings:

  - The primary key for the `follow` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `follow` table. All the data in the column will be lost.
  - The primary key for the `in_course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `in_course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "discussion" ALTER COLUMN "rating" SET DEFAULT 5;

-- AlterTable
ALTER TABLE "follow" DROP CONSTRAINT "follow_pkey",
DROP COLUMN "id";

-- AlterTable
ALTER TABLE "in_course" DROP CONSTRAINT "in_course_pkey",
DROP COLUMN "id";

-- AlterTable
ALTER TABLE "rate_dicussion" ALTER COLUMN "rating" DROP DEFAULT;

-- AlterTable
ALTER TABLE "rate_post" ALTER COLUMN "rating" SET DEFAULT 5;
