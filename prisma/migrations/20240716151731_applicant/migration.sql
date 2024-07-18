/*
  Warnings:

  - You are about to drop the `_AppliedJobs` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `resume` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_AppliedJobs" DROP CONSTRAINT "_AppliedJobs_A_fkey";

-- DropForeignKey
ALTER TABLE "_AppliedJobs" DROP CONSTRAINT "_AppliedJobs_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "resume" TEXT NOT NULL;

-- DropTable
DROP TABLE "_AppliedJobs";

-- CreateTable
CREATE TABLE "Applicant" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "coverLetter" TEXT NOT NULL,
    "availability" TEXT NOT NULL,
    "jobId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Applicant_id_key" ON "Applicant"("id");

-- AddForeignKey
ALTER TABLE "Applicant" ADD CONSTRAINT "Applicant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Applicant" ADD CONSTRAINT "Applicant_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "JobPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
