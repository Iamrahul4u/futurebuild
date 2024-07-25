import { getUserId } from "@/app/actions/auth.action";
import JobLeftSideBar from "@/components/shared/JobLeftSideBar";
import JobRightSideBar from "@/components/shared/JobRightSideBar";

import ResizableJobsLayout from "@/components/shared/ResizableJobsLayout";
import { getJobsProps } from "@/types/sharedTypes";

export default async function Page({
  searchParams,
}: {
  searchParams: getJobsProps;
}) {
  const user = getUserId();
  return (
    <>
      <ResizableJobsLayout
        JobLeftSideBar={<JobLeftSideBar />}
        JobRightSideBar={<JobRightSideBar searchParams={searchParams} />}
      />
    </>
  );
}
