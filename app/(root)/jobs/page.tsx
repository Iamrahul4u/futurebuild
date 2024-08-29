

import {  leftSidebarfilterPropsTypes } from "@/types/sharedTypes";
import dynamic from "next/dynamic";
const JobLeftSideBar=dynamic(()=>import("@/components/shared/JobLeftSideBar"))
const ResizablePanelGroup=dynamic(()=>import("@/components/ui/resizable").then(mod=>mod.ResizablePanelGroup))
const ResizablePanel=dynamic(()=>import("@/components/ui/resizable").then(mod=>mod.ResizablePanel))
const ResizableHandle=dynamic(()=>import("@/components/ui/resizable").then(mod=>mod.ResizableHandle))
import JobRightSideBar from "@/components/shared/JobRightSideBar";
export default async function Page({
  searchParams,
}: {
  searchParams: leftSidebarfilterPropsTypes;
}) {
  return (
    <>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel minSize={20} defaultSize={20} maxSize={35}>
          <JobLeftSideBar />
        </ResizablePanel>
        <ResizableHandle withHandle className="bg-slate-700" />
        <ResizablePanel defaultSize={70}>
          <JobRightSideBar searchParams={searchParams} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}
