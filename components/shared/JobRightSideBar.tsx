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
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const { ref, inView } = useInView();

  const loadPosts = async (reset = false) => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    let res;
    if (searchParams) {
      if (searchParams.minSalary) {
        searchParams.minSalary = Number(searchParams.minSalary);
      }
      if (searchParams.maxSalary) {
        searchParams.maxSalary = Number(searchParams.maxSalary);
      }
    }

    // Fetch jobs
    if (Object.keys(searchParams).length === 0) {
      res = await getjobs({ page });
    } else {
      res = await getjobs({ searchParams, page });
    }

    if (res?.statusCode === 301) {
      setRateLimitReached(true);
      setIsLoading(false);
      return;
    }

    const newJobs = res?.jobs || [];

    if (reset || page === 1) {
      setJobs(newJobs);
    } else {
      setJobs((prevJobs) => {
        const existingJobIds = new Set(prevJobs.map((job) => job.id));
        const filteredJobs = newJobs.filter(
          (job) => !existingJobIds.has(job.id),
        );
        return [...prevJobs, ...filteredJobs];
      });
    }

    setHasMore(newJobs.length === 6);
    setIsLoading(false);
    setInitialLoad(false);
  };

  useEffect(() => {
    setPage(1);
    setJobs([]);
    setIsLoading(false);
    setHasMore(true);
    setInitialLoad(true);
  loadPosts(true);
  }, [searchParams]);

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore, isLoading]);

  useEffect(() => {
    loadPosts();
  }, [page]);

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
