import JobLeftSideBar from "@/components/shared/JobLeftSideBar";
import JobRightSideBar from "@/components/shared/JobRightSideBar";
import ResizablePageLayout from "@/components/shared/ResizableJobsLayout";

export default async function Page() {
  return (
    <ResizablePageLayout
      JobLeftSideBar={<JobLeftSideBar />}
      JobRightSideBar={<JobRightSideBar />}
    />
  );
}
