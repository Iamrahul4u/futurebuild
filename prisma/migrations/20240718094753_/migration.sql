/*
  Warnings:

  - The `whoCanApply` column on the `JobPost` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ExperienceEnum" AS ENUM ('Anyone', 'Fresher', 'Intermediate', 'Experienced');

-- AlterTable
ALTER TABLE "JobPost" DROP COLUMN "whoCanApply",
ADD COLUMN     "whoCanApply" "ExperienceEnum" NOT NULL DEFAULT 'Anyone';
