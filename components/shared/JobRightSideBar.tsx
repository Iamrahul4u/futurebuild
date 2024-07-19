import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { generateFakeData } from "../../_utils/utils";
import { getJobs } from "@/app/actions/prisma.action";
import { JobPostOptionalDefaults } from "@/prisma/generated/zod";
import prisma from "@/prisma";

const JobRightSideBar = async () => {
  const res = await prisma.jobPost.findMany({});
  return (
    <div className="h-full grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3  overflow-y-scroll rounded-md border px-8 py-4 gap-4">
      {res?.map((job) => (
        <JobCard details={job} key={job.id} />
      ))}
    </div>
  );
};

export default JobRightSideBar;
