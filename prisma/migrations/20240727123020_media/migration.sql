/*
  Warnings:

  - A unique constraint covering the columns `[applicantId]` on the table `Media` will be added. If there are existing duplicate values, this will fail.
  - Made the column `approvalStatus` on table `Applicant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `jobType` on table `JobPost` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Applicant" DROP CONSTRAINT "Applicant_userId_fkey";

-- DropForeignKey
ALTER TABLE "JobPost" DROP CONSTRAINT "JobPost_userId_fkey";

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_cityId_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_userId_fkey";

-- AlterTable
ALTER TABLE "Applicant" ALTER COLUMN "approvalStatus" SET NOT NULL;

-- AlterTable
ALTER TABLE "JobPost" ALTER COLUMN "jobType" SET NOT NULL,
ALTER COLUMN "jobType" SET DEFAULT 'Full_Time';

-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "applicantId" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Media_applicantId_key" ON "Media"("applicantId");

-- AddForeignKey
ALTER TABLE "JobPost" ADD CONSTRAINT "JobPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Applicant" ADD CONSTRAINT "Applicant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;
