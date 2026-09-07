ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TYPE "AccountRole" RENAME VALUE 'USER' TO 'INSTRUCTOR';
ALTER TYPE "AccountRole" ADD VALUE 'LEARNER' BEFORE 'INSTRUCTOR';
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'LEARNER';

ALTER TYPE "NotificationType" ADD VALUE 'INSTRUCTOR_APPLICATION';
ALTER TYPE "NotificationType" ADD VALUE 'INSTRUCTOR_APPROVED';

CREATE TYPE "InstructorApplicationStatus" AS ENUM ('PENDING', 'APPROVED');

CREATE TABLE "instructor_application" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "InstructorApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "idDocumentKey" TEXT NOT NULL,
    "idDocumentName" TEXT NOT NULL,
    "idDocumentMimeType" TEXT NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewedAt" TIMESTAMP(3),
    "reviewedById" TEXT,
    CONSTRAINT "instructor_application_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "instructor_application_userId_key" ON "instructor_application"("userId");
CREATE INDEX "instructor_application_status_submittedAt_idx" ON "instructor_application"("status", "submittedAt");
ALTER TABLE "instructor_application" ADD CONSTRAINT "instructor_application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
