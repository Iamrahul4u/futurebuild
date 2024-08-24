import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8 md:flex-row">
        <aside className="md:w-3/10 w-full">
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-6 w-24" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-8 w-full" />
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* List Section (70%) */}
        <main className="flex-1">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>
                <Skeleton className="h-6 w-32" />
              </CardTitle>
              <div className="flex space-x-2">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                  <Skeleton className="h-8 w-24" />
                </div>
              ))}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
