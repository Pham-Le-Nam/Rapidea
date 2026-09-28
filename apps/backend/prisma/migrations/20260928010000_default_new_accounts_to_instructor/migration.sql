-- Temporarily grant instructor access to every newly created account for testing.
-- Existing accounts keep their current role.
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'INSTRUCTOR';
