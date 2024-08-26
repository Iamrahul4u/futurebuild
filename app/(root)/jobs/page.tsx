import { getUserId } from "@/app/actions/auth.action";
import LoadingJobsCard from "@/components/loaders/LoadingJobsCard";
import JobLeftSideBar from "@/components/shared/JobLeftSideBar";
import JobRightSideBar from "@/components/shared/JobRightSideBar";

import ResizableJobsLayout from "@/components/shared/ResizableJobsLayout";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { getJobsProps, leftSidebarfilterPropsTypes } from "@/types/sharedTypes";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams: leftSidebarfilterPropsTypes;
}) {
  return (
    <>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel minSize={20} defaultSize={20} maxSize={35}>
          <Suspense fallback={<p>Loading...</p>}>
            <JobLeftSideBar />
          </Suspense>
        </ResizablePanel>
        <ResizableHandle withHandle className="bg-slate-700" />
        <ResizablePanel defaultSize={70}>
          <JobRightSideBar searchParams={searchParams} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}
