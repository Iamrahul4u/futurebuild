import { Suspense } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import LoadingJobsCard from "../loaders/LoadingJobsCard";
export default function ResizablePageLayout({
  JobLeftSideBar,
  JobRightSideBar,
}: {
  JobLeftSideBar: React.ReactNode;
  JobRightSideBar: React.ReactNode;
}) {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel minSize={20} defaultSize={25} maxSize={35}>
        {JobLeftSideBar}
      </ResizablePanel>
      <ResizableHandle withHandle className="bg-slate-700" />
      <ResizablePanel defaultSize={70}>
        <Suspense fallback={<LoadingJobsCard columns={3} />}>
          {JobRightSideBar}
        </Suspense>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
