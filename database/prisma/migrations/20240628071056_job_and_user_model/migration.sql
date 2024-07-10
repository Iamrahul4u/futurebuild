-- CreateTable
CREATE TABLE "JobPost" (
    "id" SERIAL NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "jobDescription" TEXT NOT NULL,
    "postedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "JobPost_id_key" ON "JobPost"("id");

-- AddForeignKey
ALTER TABLE "JobPost" ADD CONSTRAINT "JobPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
