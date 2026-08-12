-- DropForeignKey
ALTER TABLE "post_in_course" DROP CONSTRAINT "post_in_course_courseId_fkey";

-- DropForeignKey
ALTER TABLE "post_in_course" DROP CONSTRAINT "post_in_course_postId_fkey";

-- AddForeignKey
ALTER TABLE "post_in_course" ADD CONSTRAINT "post_in_course_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_in_course" ADD CONSTRAINT "post_in_course_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
