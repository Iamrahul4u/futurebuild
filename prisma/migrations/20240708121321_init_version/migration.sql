-- CreateEnum
CREATE TYPE "mode" AS ENUM ('Work_From_Home', 'Work_From_Office');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('Full_Time', 'Part_Time', 'InternShip', 'Project_Work', 'Volunteering');

-- CreateTable
CREATE TABLE "JobPost" (
    "id" SERIAL NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "jobDescription" TEXT NOT NULL,
    "organisationName" TEXT NOT NULL,
    "modeOfWork" "mode" NOT NULL DEFAULT 'Work_From_Office',
    "minExperience" INTEGER NOT NULL DEFAULT 0,
    "maxExperience" INTEGER NOT NULL,
    "minSalary" INTEGER NOT NULL DEFAULT 0,
    "maxSalary" INTEGER NOT NULL,
    "jobType" "JobType" NOT NULL,
    "postedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "whoCanApply" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "JobPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER,
    "jobPostId" INTEGER
);

-- CreateTable
CREATE TABLE "Perk" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "jobPostId" INTEGER
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "secondName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "address" TEXT,
    "postalCode" INTEGER NOT NULL,
    "cityId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "state" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "JobProfile" (
    "id" SERIAL NOT NULL,
    "jobProfileName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AppliedJobs" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "JobPost_id_key" ON "JobPost"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_id_key" ON "Skill"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Perk_id_key" ON "Perk"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Location_id_key" ON "Location"("id");

-- CreateIndex
CREATE UNIQUE INDEX "City_id_key" ON "City"("id");

-- CreateIndex
CREATE UNIQUE INDEX "JobProfile_id_key" ON "JobProfile"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_AppliedJobs_AB_unique" ON "_AppliedJobs"("A", "B");

-- CreateIndex
CREATE INDEX "_AppliedJobs_B_index" ON "_AppliedJobs"("B");

-- AddForeignKey
ALTER TABLE "JobPost" ADD CONSTRAINT "JobPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_jobPostId_fkey" FOREIGN KEY ("jobPostId") REFERENCES "JobPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Perk" ADD CONSTRAINT "Perk_jobPostId_fkey" FOREIGN KEY ("jobPostId") REFERENCES "JobPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AppliedJobs" ADD CONSTRAINT "_AppliedJobs_A_fkey" FOREIGN KEY ("A") REFERENCES "JobPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AppliedJobs" ADD CONSTRAINT "_AppliedJobs_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
