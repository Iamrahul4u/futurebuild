import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const LoadingJobsCard = ({ columns }: { columns: number }) => {
  return (
    <div
      className={`h-full grid grid-cols-${columns}  rounded-md  ${
        columns > 1 ? "px-8 py-4 border" : ""
      } gap-4`}
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <Card
          key={index}
          className="-space-y-3 cursor-pointer  border-solid border-[1px] border-gray-400 transition-all duration-300 hover:translate-x-[-4] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_gray] active:translate-x-[0px] active:translate-y-[0px]  p-0"
        >
          <CardHeader className="flex flex-row  gap-4  items-center mb-4 ">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex flex-col">
              <Skeleton className="h-4 w-24 mb-4" />

              <div className="flex-row flex gap-2  ">
                <Skeleton className="h-4 w-12 line-clamp-1 text-base font-bold tracking-wide " />
                <Skeleton className="h-4 w-12 line-clamp-1 text-base font-bold tracking-wide " />
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
          <CardFooter className="pb-4 text-xs flex gap-2 justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-32" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default LoadingJobsCard;
