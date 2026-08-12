-- AlterTable
ALTER TABLE "discussion" ADD COLUMN     "parentId" TEXT;

-- AddForeignKey
ALTER TABLE "discussion" ADD CONSTRAINT "discussion_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "discussion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
