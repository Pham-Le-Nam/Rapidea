DROP INDEX "instructor_application_userId_key";
CREATE INDEX "instructor_application_userId_submittedAt_idx" ON "instructor_application"("userId", "submittedAt");
CREATE UNIQUE INDEX "instructor_application_pending_userId_key" ON "instructor_application"("userId") WHERE "status" = 'PENDING';
