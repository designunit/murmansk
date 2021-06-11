/*
  Warnings:

  - A unique constraint covering the columns `[vkid]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User.vkid_unique" ON "User"("vkid");
