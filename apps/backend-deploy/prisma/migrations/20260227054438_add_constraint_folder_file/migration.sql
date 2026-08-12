/*
  Warnings:

  - A unique constraint covering the columns `[url,name]` on the table `file` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[url,name]` on the table `folder` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "file_url_name_key" ON "file"("url", "name");

-- CreateIndex
CREATE UNIQUE INDEX "folder_url_name_key" ON "folder"("url", "name");
