-- AlterTable
ALTER TABLE "User" ADD COLUMN     "about" TEXT NOT NULL DEFAULT 'About Me',
ADD COLUMN     "profileCompleted" BOOLEAN NOT NULL DEFAULT false;
