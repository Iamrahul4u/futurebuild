-- CreateEnum
CREATE TYPE "ApprovalStatus" AS ENUM ('Pending', 'Rejected', 'Accepted');

-- AlterTable
ALTER TABLE "Applicant" ADD COLUMN     "approvalStatus" "ApprovalStatus" DEFAULT 'Pending';
