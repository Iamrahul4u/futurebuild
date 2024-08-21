"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import JobCard from "./JobCard";
import { JobPostOptionalDefaults } from "@/prisma/generated/zod";
import { getjobs } from "@/app/actions/jobs.action";
import ToasterShow from "./ToasterShow";
import { leftSidebarfilterPropsTypes } from "@/types/sharedTypes";
import NoResultFound from "./NoResultFound";
import LoadingJobsCard from "../loaders/LoadingJobsCard";

const JobRightSideBar = ({
  searchParams,
}: {
  searchParams: leftSidebarfilterPropsTypes;
}) => {
  const [jobs, setJobs] = useState<JobPostOptionalDefaults[]>([]);
  const [rateLimitReached, setRateLimitReached] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);

  const { ref, inView } = useInView();

  const loadPosts = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    const res = await getjobs({ searchParams, page });

    if (res?.statusCode === 301) {
      setRateLimitReached(true);
      setIsLoading(false);
      return;
    }

    const newJobs = res?.jobs || [];
    setJobs((prevJobs) => {
      const existingJobIds = new Set(prevJobs.map((job) => job.id));
      const filteredJobs = newJobs.filter((job) => !existingJobIds.has(job.id));
      return [...prevJobs, ...filteredJobs];
    });

    setHasMore(newJobs.length === 6);
    setIsLoading(false);
    setInitialLoad(false);
  }, [searchParams, page, isLoading, hasMore]);

  useEffect(() => {
    loadPosts();
  }, [page, searchParams]);

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore, isLoading]);

  if (rateLimitReached) {
    return <ToasterShow />;
  }

  return (
    <div className="h-full overflow-y-auto px-8 py-4">
      {initialLoad ? (
        <LoadingJobsCard columns={3} />
      ) : jobs.length > 0 ? (
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {jobs?.map((job: any) => <JobCard details={job} key={job.id} />)}
        </div>
      ) : (
        <NoResultFound />
      )}
      <div ref={ref}>
        {isLoading && <p className="text-center">Loading...</p>}
      </div>
      <div className="flex justify-center">
        {!hasMore && <p className="text-center">End of Results</p>}
      </div>
    </div>
  );
};

export default JobRightSideBar;
