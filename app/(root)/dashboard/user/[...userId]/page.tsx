// import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import prisma from "@/prisma";
import { redirect } from "next/navigation";
// import TablePostedJobs from "@/components/shared/TablePostedJobs";
// import TableAppliedJobs from "@/components/shared/TableAppliedJobs";
import dynamic from "next/dynamic";
const TablePostedJobs = dynamic(
  () => import("@/components/shared/TablePostedJobs"),
);
const TableAppliedJobs = dynamic(
  () => import("@/components/shared/TableAppliedJobs"),
);
const Button = dynamic(() =>
  import("@/components/ui/button").then((mod) => mod.Button),
);
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { MediaNameSchema } from "@/prisma/generated/zod";

export default async function Page({ params }: { params: { userId: string } }) {
  const userDetails = await prisma.user.findFirst({
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
      address: true,
      skills: {
        include: {
          skill: true,
        },
      },
      media: {
        where: { mediaName: MediaNameSchema.options[1] },
        select: {
          url: true,
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

    cacheStrategy: {
      ttl: 60,
      swr: 100,
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
    cacheStrategy: {
      ttl: 60,
      swr: 100,
    },
  });
  if (!userDetails) {
    redirect("/authenticate/signin");
  }
  const addressEmpty = userDetails.address === null;
  const addressSum = `${userDetails.address?.address},${userDetails.address?.city},${userDetails.address?.postalCode},${userDetails.address?.state}`;
  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
      <Card className="col-span-full">
        <CardContent className="flex flex-col gap-4 p-2 sm:flex-row">
          <Avatar className="h-20 w-20 self-center overflow-hidden object-contain sm:h-32 sm:w-32">
            <AvatarImage
              src={userDetails?.media[userDetails.media.length - 1]?.url || ""}
              alt="@profileImg"
              className="h-20 w-20 self-center object-cover md:h-32 md:w-32"
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <CardTitle className="text-2xl uppercase sm:text-4xl">
              {userDetails.firstName} {userDetails.secondName}
            </CardTitle>
            <CardDescription className="mt-2">
              <span className="font-semibold">About Me:</span>{" "}
              <span>{userDetails.about}</span>
            </CardDescription>
            <CardDescription className="mt-2">
              {userDetails.role === "USER" && userDetails.skills.length > 0 && (
                <>
                  <span className="font-semibold">Skills:</span>
                  {userDetails.skills.map((skill, index) => (
                    <span key={skill.skill?.id ?? index} className="mr-2">
                      {skill.skill?.name ?? "Unknown"}
                      {index !== userDetails.skills.length - 1 && ","}
                    </span>
                  ))}
                </>
              )}
            </CardDescription>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-full sm:col-span-1">
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="font-semibold text-muted-foreground">Name:</div>
            <div>
              {userDetails.firstName} {userDetails.secondName}
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="font-semibold text-muted-foreground">Email:</div>
            <div>{userDetails.email}</div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="font-semibold text-muted-foreground">Phone:</div>
            <div>
              {addressEmpty ? (
                <Link href={`/dashboard/edit/${userDetails.id}`}>
                  Add PhoneNumber
                </Link>
              ) : (
                userDetails.address?.phoneNumber
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="font-semibold text-muted-foreground">Address:</div>
            <div>
              {addressEmpty ? (
                <Link href={`/dashboard/edit/${userDetails.id}`}>
                  Add Address
                </Link>
              ) : (
                addressSum
              )}
            </div>
          </div>
          <Link href={`/dashboard/edit/${userDetails.id}`} className="mt-4">
            <Button variant="outline" className="w-full sm:w-auto">
              Edit Profile
            </Button>
          </Link>
        </CardContent>
      </Card>
      {(userDetails.role === "ADMIN" ||
        userDetails.role === "ORGANIZATION") && (
        <Card className="col-span-full max-h-[600px] overflow-y-auto sm:col-span-1">
          <CardHeader>
            <CardTitle>Posted Jobs</CardTitle>
          </CardHeader>
          <TablePostedJobs details={jobDetails} />
          <div className="flex h-20 w-full items-end justify-center p-4">
            <Link href={"/create/job"}>
              <Button variant={"default"}>Post New Job</Button>
            </Link>
          </div>
        </Card>
      )}
      {userDetails.role === "USER" && (
        <Card className="col-span-full sm:col-span-1">
          <CardHeader>
            <CardTitle>Jobs Applied</CardTitle>
          </CardHeader>
          {userDetails.appliedJobs.length > 0 ? (
            <TableAppliedJobs details={userDetails?.appliedJobs} />
          ) : (
            <div className="flex flex-col items-center justify-between gap-4 p-4">
              <span>No Jobs Found</span>
              <Link href={"/jobs"}>
                <Button>Apply?</Button>
              </Link>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
