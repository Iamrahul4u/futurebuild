/*
  Warnings:

  - Added the required column `mediaName` to the `Media` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MediaName" AS ENUM ('Resume', 'Profile_Img');

-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "mediaName" TEXT NOT NULL;
