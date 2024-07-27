import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import prisma from "@/prisma";
import { redirect } from "next/navigation";
import { UserWithJobs } from "@/types/zodValidations";
import TablePostedJobs from "@/components/shared/TablePostedJobs";
import TableAppliedJobs from "@/components/shared/TableAppliedJobs";
export default async function Page({ params }: { params: { userId: string } }) {
  const userDetails: UserWithJobs | null = await prisma.user.findFirst({
    where: {
      id: params.userId[0],
    },
    omit: {
      hashedPassword: true,
    },
    include: {
      postedJobs: {
        select: {
          id: true,
        },
      },
      appliedJobs: {
        include: {
          jobPost: {
            select: {
              id: true,
              jobTitle: true,
              organisationName: true,
            },
          },
        },
      },
    },
  });
  const jobDetails = await prisma.jobPost.findMany({
    where: {
      id: {
        in: userDetails?.postedJobs.map((jobs) => jobs.id) ?? [],
      },
    },
    select: {
      id: true,
      jobTitle: true,
      _count: {
        select: {
          applicants: true,
        },
      },
    },
  });
  if (!userDetails) {
    redirect("/authenticate/signin");
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex gap-2">
            <div className="text-muted-foreground">Name:</div>
            {userDetails.firstName}
            &nbsp;{userDetails?.secondName}
          </div>
          <div className="flex gap-2">
            <div className="text-muted-foreground">Email:</div>
            <div>{userDetails.email}</div>
          </div>

          <div className="flex gap-2">
            <div className="text-muted-foreground">Phone:</div>
            <div>Phone</div>
          </div>
          <div className="flex gap-2">
            <div className="text-muted-foreground">Address:</div>
            <div>123 Main St, Anytown USA</div>
          </div>
          <Button variant="outline" className="justify-self-end">
            Edit Profile
          </Button>
        </CardContent>
      </Card>
      {userDetails.role === "ORGANIZATION" ||
        (userDetails.role === "ADMIN" && (
          <Card className="overflow-y-scroll">
            <CardHeader>
              <CardTitle>Posted Jobs</CardTitle>
            </CardHeader>
            <TablePostedJobs details={jobDetails} />
            <div className="flex w-full justify-center">
              <Link href={"/create/job"}>
                <Button variant={"default"}>Post New Job</Button>
              </Link>
            </div>
          </Card>
        ))}
      {userDetails.role === "USER" && (
        <Card>
          <CardHeader>
            <CardTitle>Jobs Applied</CardTitle>
          </CardHeader>
          {userDetails.appliedJobs.length > 0 ? (
            <TableAppliedJobs details={userDetails?.appliedJobs} />
          ) : (
            <Card>No Result Found</Card>
          )}
        </Card>
      )}
    </div>
  );
}
