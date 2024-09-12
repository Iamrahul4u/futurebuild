/*
  Warnings:

  - You are about to drop the `JobProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "JobProfile";

-- CreateTable
CREATE TABLE "RoadMap" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "mermaidSyntax" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "RoadMap_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RoadMap_userId_idx" ON "RoadMap"("userId");

-- AddForeignKey
ALTER TABLE "RoadMap" ADD CONSTRAINT "RoadMap_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
