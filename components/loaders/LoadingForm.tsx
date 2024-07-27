import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const LoadingForm = () => {
  return (
    <div className="mx-auto flex h-full w-3/4 flex-col space-y-4 px-12 py-8">
      <div className="mb-6 space-y-2">
        <Skeleton className="h-10 w-52" />
        <Skeleton className="h-8 w-64" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
};

export default LoadingForm;
