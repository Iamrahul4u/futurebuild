import React from "react";
import JobCard from "./JobCard";
import { generateFakeData } from "../../_utils/utils";

const JobRightSideBar = async () => {
  const jobs = generateFakeData();
  return (
    <div className="h-full grid grid-cols-3  overflow-y-scroll rounded-md border px-8 py-4 gap-4">
      {jobs?.map((job) => (
        <JobCard details={job} key={job.id} />
      ))}
    </div>
  );
};

export default JobRightSideBar;
