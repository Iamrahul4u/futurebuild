import JobLeftSideBar from "@/components/shared/JobLeftSideBar";
import JobRightSideBar from "@/components/shared/JobRightSideBar";

import ResizableJobsLayout from "@/components/shared/ResizableJobsLayout";

export default async function Page() {
  return (
    <>
      <ResizableJobsLayout
        JobLeftSideBar={<JobLeftSideBar />}
        JobRightSideBar={<JobRightSideBar />}
      />
    </>
  );
}
