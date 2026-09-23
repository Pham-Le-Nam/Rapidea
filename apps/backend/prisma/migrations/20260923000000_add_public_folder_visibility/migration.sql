ALTER TABLE "folder"
ADD COLUMN "isPublic" BOOLEAN NOT NULL DEFAULT false;

WITH RECURSIVE "public_folders" AS (
    SELECT "free_folder"."id"
    FROM "folder" AS "free_folder"
    INNER JOIN "folder" AS "root_folder"
        ON "root_folder"."id" = "free_folder"."parentId"
    WHERE LOWER("free_folder"."name") = 'free'
      AND "root_folder"."parentId" IS NULL

    UNION ALL

    SELECT "child"."id"
    FROM "folder" AS "child"
    INNER JOIN "public_folders" AS "parent"
        ON "parent"."id" = "child"."parentId"
)
UPDATE "folder"
SET "isPublic" = true
WHERE "id" IN (SELECT "id" FROM "public_folders");

CREATE INDEX "folder_isPublic_idx" ON "folder"("isPublic");
