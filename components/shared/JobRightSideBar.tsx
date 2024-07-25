import React from "react";
import JobCard from "./JobCard";
import { JobPostOptionalDefaults } from "@/prisma/generated/zod";
import prisma from "@/prisma";
import { getjobs } from "@/app/actions/jobs.action";
import ToasterShow from "./ToasterShow";
import { getJobsProps, leftSidebarfilterPropsTypes } from "@/types/sharedTypes";
import NoResultFound from "./NoResultFound";

const JobRightSideBar = async ({
  searchParams,
}: {
  searchParams: leftSidebarfilterPropsTypes;
}) => {
  const res = await getjobs({ searchParams });
  if (res.statusCode === 301) {
    <ToasterShow />;
  }
  const jobs = res.jobs || [];

  return jobs?.length > 0 ? (
    <div className="md:grid-col-2 grid h-full grid-cols-1 gap-4 overflow-y-scroll rounded-md border px-8 py-4 lg:grid-cols-3">
      {res?.jobs?.map((job) => <JobCard details={job} key={job.id} />)}
    </div>
  ) : (
    <NoResultFound />
  );
};

export default JobRightSideBar;
