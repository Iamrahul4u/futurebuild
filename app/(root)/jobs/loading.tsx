import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import LoadingJobsCard from "@/components/loaders/LoadingJobsCard";

export default function loading() {
  return (
    <div className="flex w-full flex-row gap-8 px-4 py-8">
      <div className="w-[27%] space-y-6">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
      <div className="w-full space-y-2">
        <LoadingJobsCard columns={3} />
      </div>
    </div>
  );
}
