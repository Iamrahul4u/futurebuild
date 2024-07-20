import React from "react";
import JobCard from "./JobCard";
import { JobPostOptionalDefaults } from "@/prisma/generated/zod";
import prisma from "@/prisma";
import { getjobs } from "@/app/actions/jobs.action";
import ToasterShow from "./ToasterShow";

const JobRightSideBar = async () => {
  const res = await getjobs();
  if ("error" in res) {
    return <ToasterShow />;
  }
  return (
    <div className="h-full grid grid-cols-1 md:grid-col-2 lg:grid-cols-3   overflow-y-scroll rounded-md border px-8 py-4 gap-4">
      {res?.map((job) => (
        <JobCard details={job} key={job.id} />
      ))}
    </div>
  );
};

export default JobRightSideBar;
