-- DropIndex
DROP INDEX "Media_userId_key";

-- AlterTable
ALTER TABLE "Applicant" ADD CONSTRAINT "Applicant_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "City" ADD CONSTRAINT "City_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "JobProfile" ADD CONSTRAINT "JobProfile_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Location" ADD CONSTRAINT "Location_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Perk" ADD CONSTRAINT "Perk_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_pkey" PRIMARY KEY ("id");
