import React, { Suspense } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import RecentJobs from "@/components/shared/RecentJobs";
import LoadingJobsCard from "@/components/loaders/LoadingJobsCard";
import prisma from "@/prisma";
import { getUser } from "@/app/[...authenticate]/lucia";
import { CircleCheck } from "lucide-react";
import { User } from "lucia";
import { formatNumber } from "@/_utils/utils";
//
export default async function Page({ params }: { params: { jobid: string } }) {
  const user: User | { error: string } | null = await getUser();
  const jobData = await prisma.jobPost.findFirst({
    where: {
      id: params.jobid,
    },
  });
  let applied = false;
  let application: { userId: string } | null = null;
  if (!user || !("error" in user)) {
    application = await prisma.applicant.findFirst({
      where: {
        jobId: jobData?.id,
        userId: user?.id || "",
      },
      select: {
        userId: true,
      },
    });
    applied = !!application;
  }
  return (
    <div className="grid min-h-screen w-full grid-cols-[260px_1fr_240px] gap-6 overflow-y-scroll bg-muted/40 p-6 pb-32">
      <div className="mx-auto flex flex-col gap-4 overflow-y-scroll pr-4">
        <Suspense fallback={<LoadingJobsCard columns={1} />}>
          <RecentJobs />
        </Suspense>
      </div>
      <div className="flex flex-col gap-6">
        <div className="rounded-lg bg-background p-6 shadow-sm">
          <h1 className="text-2xl font-bold">{jobData?.jobTitle}</h1>
          <div className="mt-2 flex items-center gap-2">
            <Badge variant="secondary">{jobData?.whoCanApply}</Badge>
            <Badge variant="secondary">
              {jobData?.jobType.split("_").join(" ")}
            </Badge>
            <Badge variant="secondary">{jobData?.modeOfWork}</Badge>
          </div>
          <div className="prose mt-6 text-muted-foreground">
            {jobData?.jobDescription}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="sticky top-6 rounded-lg bg-background p-4 shadow-sm">
          <h3 className="text-lg font-semibold">Job Details</h3>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Job Type:</span>
              <span>{jobData?.jobType.split("_").join(" ")}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Location:</span>
              <span>{jobData?.modeOfWork}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Salary Range:</span>
              <span>
                ₹{formatNumber(jobData?.minSalary || 1000)} -
                {formatNumber(jobData?.maxSalary || 1000)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Experience:</span>
              <span>
                {jobData?.minExperience}-{jobData?.maxExperience} years
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Education:</span>
              <span>Bachelor&apos;'s degree</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Posted:</span>
              <span>2 days ago</span>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {user && applied ? (
              <Button
                variant={"link"}
                className="gap-1 p-0 text-lg text-green-600"
              >
                <CircleCheck size={16} />
                Applied
              </Button>
            ) : (
              <Link href={`/jobs/apply/${params.jobid}`}>
                <Button>Apply Now</Button>
              </Link>
            )}
            {jobData?.userId === application?.userId && (
              <Link href={`/view/${params.jobid}`}>
                <Button>View Aplicants</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
