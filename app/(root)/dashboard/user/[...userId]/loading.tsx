import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <aside className="md:w-3/10 w-full">
        <Card className="mb-4 p-4">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-24" />
            </CardTitle>
          </CardHeader>
        </Card>
      </aside>
      <div className="flex flex-col gap-8 md:flex-row">
        {Array.from({ length: 2 }).map((_, index) => (
          <aside key={index} className="md:w-3/10 w-full">
            <Card>
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-6 w-24" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton key={index} className="h-4 w-24" />
                  ))}
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </CardContent>
            </Card>
          </aside>
        ))}
      </div>
    </div>
  );
}
