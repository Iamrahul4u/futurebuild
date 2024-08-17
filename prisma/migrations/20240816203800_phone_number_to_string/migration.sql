/*
  Warnings:

  - You are about to drop the column `jobPostId` on the `UserSkill` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Location" ALTER COLUMN "phoneNumber" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "UserSkill" DROP COLUMN "jobPostId";
