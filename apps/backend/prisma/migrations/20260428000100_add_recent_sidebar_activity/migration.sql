-- AlterTable
ALTER TABLE "post" ADD COLUMN "lastUpdated" TIMESTAMP(3);
UPDATE "post" SET "lastUpdated" = "createdAt";
ALTER TABLE "post" ALTER COLUMN "lastUpdated" SET NOT NULL;
ALTER TABLE "post" ALTER COLUMN "lastUpdated" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "recent_course_view" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recent_course_view_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recent_post_view" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recent_post_view_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "recent_course_view_courseId_userId_key" ON "recent_course_view"("courseId", "userId");

-- CreateIndex
CREATE INDEX "recent_course_view_userId_viewedAt_idx" ON "recent_course_view"("userId", "viewedAt");

-- CreateIndex
CREATE UNIQUE INDEX "recent_post_view_postId_userId_key" ON "recent_post_view"("postId", "userId");

-- CreateIndex
CREATE INDEX "recent_post_view_userId_viewedAt_idx" ON "recent_post_view"("userId", "viewedAt");

-- AddForeignKey
ALTER TABLE "recent_course_view" ADD CONSTRAINT "recent_course_view_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recent_course_view" ADD CONSTRAINT "recent_course_view_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recent_post_view" ADD CONSTRAINT "recent_post_view_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recent_post_view" ADD CONSTRAINT "recent_post_view_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
