import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const LoadingJobsCard = ({ columns }: { columns: number }) => {
  return (
    <div
      className={`grid h-full grid-cols-${columns} rounded-md ${
        columns > 1 ? "md:grid-col-2 grid-cols-1 lg:grid-cols-3" : ""
      } gap-4`}
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <Card
          key={index}
          className="cursor-pointer -space-y-3 border-[1px] border-solid border-gray-400 p-0 transition-all duration-300 hover:translate-x-[-4] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_gray] active:translate-x-[0px] active:translate-y-[0px]"
        >
          <CardHeader className="mb-4 flex flex-row items-center gap-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex flex-col">
              <Skeleton className="mb-4 h-4 w-24" />

              <div className="flex flex-row gap-2">
                <Skeleton className="line-clamp-1 h-4 w-12 text-base font-bold tracking-wide" />
                <Skeleton className="line-clamp-1 h-4 w-12 text-base font-bold tracking-wide" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
          </CardContent>
          <CardContent>
            <Skeleton className={`w-full ${columns < 3 ? "h-24" : "h-32"}`} />
          </CardContent>
          <CardFooter className="flex justify-between gap-2 pb-4 text-xs">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-32" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default LoadingJobsCard;
