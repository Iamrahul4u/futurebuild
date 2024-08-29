-- CreateIndex
CREATE INDEX "Applicant_userId_idx" ON "Applicant"("userId");

-- CreateIndex
CREATE INDEX "Applicant_jobId_idx" ON "Applicant"("jobId");

-- CreateIndex
CREATE INDEX "JobPost_jobTitle_idx" ON "JobPost"("jobTitle");

-- CreateIndex
CREATE INDEX "JobPost_userId_idx" ON "JobPost" USING HASH ("userId");

-- CreateIndex
CREATE INDEX "JobPost_postedAt_idx" ON "JobPost"("postedAt");

-- CreateIndex
CREATE INDEX "JobSkill_jobId_idx" ON "JobSkill"("jobId");

-- CreateIndex
CREATE INDEX "JobSkill_skillId_idx" ON "JobSkill"("skillId");

-- CreateIndex
CREATE INDEX "Location_postalCode_idx" ON "Location" USING HASH ("postalCode");

-- CreateIndex
CREATE INDEX "Media_userId_idx" ON "Media"("userId");

-- CreateIndex
CREATE INDEX "Media_applicantId_idx" ON "Media"("applicantId");

-- CreateIndex
CREATE INDEX "Perk_jobPostId_idx" ON "Perk"("jobPostId");

-- CreateIndex
CREATE INDEX "Perk_name_idx" ON "Perk" USING HASH ("name");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE INDEX "Skill_name_idx" ON "Skill"("name");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User" USING HASH ("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE INDEX "UserSkill_userId_idx" ON "UserSkill"("userId");

-- CreateIndex
CREATE INDEX "UserSkill_skillId_idx" ON "UserSkill"("skillId");
