-- AlterTable
ALTER TABLE "User" ADD COLUMN     "onboardingCompleted" BOOLEAN DEFAULT false,
ALTER COLUMN "profileCompleted" DROP NOT NULL;
