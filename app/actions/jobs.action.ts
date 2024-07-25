"use server";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { checkUser } from "./auth.action";
import { getUser } from "../[...authenticate]/lucia";
import { generateRandomName } from "@/_utils/utils";
import prisma from "@/prisma";
import { prismaMedia } from "./prisma.action";
import { headers } from "next/headers";
import rateLimiter from "@/lib/rateLimit";
import { JobPost, JobPostOptionalDefaults } from "@/prisma/generated/zod";
import { redirect } from "next/navigation";
import { cache } from "react";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

const fileName = generateRandomName();
const MAX_FILE_SIZE = 1024 * 1024 * 1;

export async function getUrl(
  fileSize: number,
  mediaType: string,
  mediaName: string,
) {
  const user = await getUser();
  if (!user) {
    return { error: "User not authenticated" };
  }

  if (fileSize > MAX_FILE_SIZE) {
    return { error: "File Size Exceeds Limit 10mb" };
  }
  if (!mediaType) {
    return { error: "Invalid File Type" };
  }
  // @ts-ignore
  const userId = user.id;
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Metadata: userId || "",
  });
  const presigned = await getSignedUrl(s3, command, {
    expiresIn: 60,
  });
  const url = presigned.split("?")[0];
  await prismaMedia({ mediaType, mediaName, url, userId });
  return { success: { url: presigned } };
}

export async function applyToJob(jobId: string) {
  const user = await getUser();
  if (!user || "error" in user) {
    return { error: "User not authenticated" };
  }

  try {
    // Ensure the user exists in the database
    const existingUser = await prisma.user.findUnique({
      where: { id: user.id },
    });
    if (!existingUser) {
      return { error: "User not found in database" };
    }
    if (existingUser.role !== "ORGANIZATION" && existingUser.role !== "ADMIN") {
      return { error: "You Are Not Authorized To Create Jobs" };
    }

    // Ensure the job post exists in the database
    const existingJobPost = await prisma.jobPost.findUnique({
      where: { id: jobId },
    });
    if (!existingJobPost) {
      return { error: "Job post not found in database" };
    }

    // Check if the user has already applied to this job
    const existingApplicant = await prisma.applicant.findFirst({
      where: {
        userId: user.id,
        jobId: jobId,
      },
    });

    if (existingApplicant) {
      return { error: "User has already applied to this job" };
    }

    // Create a new applicant record linking the user to the job post
    await prisma.applicant.create({
      data: {
        userId: user.id,
        jobId: jobId,
        coverLetter: "Default cover letter", // Replace with actual cover letter data
        availability: "Immediate", // Replace with actual availability data
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error applying to job:", error);
    return { error: "Failed to apply to job" };
  }
}
interface ErrorResponse {
  error: {
    message: string;
  };
}

interface JobsResponse {
  jobs?: JobPostSelectType[];
  error?: {
    message: string | undefined;
  };
  statusCode?: number;
}

export const getjobs: ({
  searchParams,
}: {
  searchParams: leftSidebarfilterPropsTypes;
}) => Promise<JobsResponse> = async ({
  searchParams,
}: {
  searchParams?: leftSidebarfilterPropsTypes;
}) => {
  const res = await rateLimiter();
  if (res.statusCode === 301) {
    return { error: { message: res.error }, statusCode: res.statusCode };
  }
  try {
    let parseParams = searchParams;
    if (searchParams?.jobTitle) {
      const parsed = leftSidebarfilterProps.safeParse(searchParams);
      if (!parsed.success) {
        return { jobs: [] };
      }
      parseParams = parsed.data;
    }
    const { jobTitle, whoCanApply, maxSalary, minSalary, modeOfWork, jobType } =
      parseParams || {};

    const jobs = searchParams
      ? await prisma.jobPost.findMany({
          where: {
            jobTitle: {
              contains: jobTitle,
              mode: "insensitive",
            },
            minSalary: {
              gte: minSalary,
            },
            maxSalary: {
              lte: maxSalary,
            },
            modeOfWork: modeOfWork,
            whoCanApply: whoCanApply,
            jobType: jobType,
          },
          include: {
            _count: {
              select: {
                applicants: true,
              },
            },
          },
        })
      : await prisma.jobPost.findMany({
          include: {
            _count: {
              select: {
                applicants: true,
              },
            },
          },
          cacheStrategy: { ttl: 60, swr: 60 },
        });
    return { jobs };
  } catch (error) {
    return { error: { message: "Failed to fetch jobs." }, statusCode: 501 };
  }
};

export async function changePendingStatus({
  status,
}: {
  status: ApprovalStatus;
}) {}
export async function deleteUser({ id }: { id: string }) {
  try {
    await prisma.user.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {}
}
import { revalidatePath } from "next/cache";
import { ApprovalStatus } from "@prisma/client";
import {
  leftSidebarfilterProps,
  leftSidebarfilterPropsTypes,
} from "@/types/sharedTypes";
import { max } from "date-fns";
import { JobPostSelectType } from "@/types/zodValidations";

export default async function revalidatePathname(pathname: string) {
  revalidatePath(pathname);
}
