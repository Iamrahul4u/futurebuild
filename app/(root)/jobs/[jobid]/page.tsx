import React, { Suspense } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import RecentJobs from "@/components/shared/RecentJobs";
import LoadingJobsCard from "@/components/loaders/LoadingJobsCard";
import { generateFakeData } from "@/_utils/utils";
import { ApplySheet } from "@/components/shared/ApplySheet";
import prisma from "@/prisma";
import { getUser } from "@/app/[...authenticate]/lucia";
import { redirect } from "next/navigation";
import { CircleCheck } from "lucide-react";
import { ApplicantOptionalDefaults } from "@/prisma/generated/zod";
import { User } from "lucia";
import { error } from "console";
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
    <div className="grid grid-cols-[260px_1fr_240px] overflow-y-scroll pb-32 gap-6 w-full min-h-screen bg-muted/40 p-6">
      <div className="flex flex-col gap-4 overflow-y-scroll pr-4 mx-auto">
        <Suspense fallback={<LoadingJobsCard columns={1} />}>
          <RecentJobs />
        </Suspense>
      </div>
      <div className="flex flex-col gap-6">
        <div className="bg-background rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold">{jobData?.jobTitle}</h1>
          <div className="mt-2 flex items-center gap-2">
            <Badge variant="secondary">{jobData?.whoCanApply}</Badge>
            <Badge variant="secondary">{jobData?.jobType}</Badge>
            <Badge variant="secondary">{jobData?.modeOfWork}</Badge>
          </div>
          <div className="mt-6 prose text-muted-foreground">
            {jobData?.jobDescription}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="sticky top-6 bg-background rounded-lg shadow-sm p-4">
          <h3 className="text-lg font-semibold">Job Details</h3>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Job Type:</span>
              <span>Full-time</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Location:</span>
              <span>Remote</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Salary Range:</span>
              <span>$100k - $120k</span>
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
                className="text-green-600 gap-1 text-lg p-0"
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
