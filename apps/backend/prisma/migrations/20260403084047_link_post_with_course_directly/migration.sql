-- AlterTable
ALTER TABLE "post" ADD COLUMN     "courseId" TEXT;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
