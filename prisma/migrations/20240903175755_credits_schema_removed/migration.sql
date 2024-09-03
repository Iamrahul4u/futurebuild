/*
  Warnings:

  - You are about to drop the `Credits` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Credits" DROP CONSTRAINT "Credits_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "credits" INTEGER NOT NULL DEFAULT 10;

-- DropTable
DROP TABLE "Credits";
