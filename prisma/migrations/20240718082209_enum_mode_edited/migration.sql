/*
  Warnings:

  - The values [Work_From_Home,Work_From_Office] on the enum `mode` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "mode_new" AS ENUM ('Remote', 'Hybrid');
ALTER TABLE "JobPost" ALTER COLUMN "modeOfWork" DROP DEFAULT;
ALTER TABLE "JobPost" ALTER COLUMN "modeOfWork" TYPE "mode_new" USING ("modeOfWork"::text::"mode_new");
ALTER TYPE "mode" RENAME TO "mode_old";
ALTER TYPE "mode_new" RENAME TO "mode";
DROP TYPE "mode_old";
COMMIT;

-- AlterTable
ALTER TABLE "JobPost" ALTER COLUMN "modeOfWork" DROP DEFAULT;
