/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "contents_viewed" DROP CONSTRAINT "contents_viewed_user_id_fkey";

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "Role";
