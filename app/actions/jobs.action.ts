"use server";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getUser } from "../[...authenticate]/lucia";
import { generateRandomName } from "@/_utils/utils";
import prisma from "@/prisma";
import { prismaMedia } from "./prisma.action";
import rateLimiter from "@/lib/rateLimit";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

const fileName = generateRandomName();
const MAX_FILE_SIZE = 1024 * 1024 * 5;

export async function getUrl(
  fileSize: number,
  mediaType: string,
  mediaName: string,
  applicantId?: string | undefined,
) {
  const user = await getUser();
  if (!user) {
    return { error: "User not authenticated" };
  }

  if (fileSize > MAX_FILE_SIZE) {
    return { error: "File Size Exceeds Limit " };
  }
  if (!mediaType) {
    return { error: "Invalid File Type" };
  }
  // @ts-ignore
  const userId = user?.id;
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Metadata: {
      userId: userId || "",
    },
  });
  const presigned = await getSignedUrl(s3, command, {
    expiresIn: 60,
  });
  let verifiedApplicantId = undefined;
  if (applicantId) {
    verifiedApplicantId = applicantId;
  }
  const url = presigned.split("?")[0];
  const mediaRes = await prismaMedia({
    mediaType,
    mediaName,
    url,
    userId,
    applicantId,
  });
  if ("error" in mediaRes) {
    return { error: mediaRes.error };
  }
  return { success: { url: presigned } };
}

export async function applyToJob({
  jobId,
  coverLetter,
  availability,
}: {
  jobId: string;
  coverLetter: string;
  availability: string;
}) {
  const user = await getUser();
  if (!user || "error" in user) {
    return { error: "User not authenticated" };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: user.id },
    });
    if (!existingUser) {
      return { error: "User not found in database" };
    }

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
      return { error: "You have already applied to this job" };
    }

    // Create a new applicant record linking the user to the job post
    const applicantId = await prisma.applicant.create({
      data: {
        userId: user.id,
        jobId: jobId,
        coverLetter: coverLetter, // Replace with actual cover letter data
        availability: availability, // Replace with actual availability data
      },
      select: {
        id: true,
      },
    });

    return { success: { applicantId } };
  } catch (error) {
    console.error("Error applying to job:", error);
    return { error: "Failed to apply to job" };
  }
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
  page,
}: {
  searchParams?: leftSidebarfilterPropsTypes;
  page: number;
}) => Promise<JobsResponse> = async ({
  searchParams,
  page = 1,
}: {
  searchParams?: leftSidebarfilterPropsTypes;
  page: number;
}) => {
  const res = await rateLimiter();
  if (res.statusCode === 301) {
    return { error: { message: res.error }, statusCode: res.statusCode };
  }

  try {
    const limit = 6;
    let parseParams = searchParams;
    const takePosts = page * limit;
    const skipPosts = (page - 1) * limit;
    if (searchParams) {
      if (searchParams.minSalary) {
        searchParams.minSalary = Number(searchParams.minSalary);
      }
      if (searchParams.maxSalary) {
        searchParams.maxSalary = Number(searchParams.maxSalary);
      }
    }

    if (searchParams?.jobTitle) {
      const parsed = leftSidebarfilterProps.safeParse(searchParams);
      if (!parsed.success) {
        console.log("Validation failed:", parsed.error);
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
            postedBy: {
              select: {
                media: {
                  where: {
                    mediaName: MediaNameSchema.options[1],
                  },
                  select: {
                    url: true,
                  },
                },
              },
            },
          },
          take: takePosts,
          skip: skipPosts,
          orderBy: {
            postedAt: "desc",
          },
          cacheStrategy: { ttl: 60, swr: 60 },
        })
      : await prisma.jobPost.findMany({
          include: {
            _count: {
              select: {
                applicants: true,
              },
            },
            postedBy: {
              select: {
                media: {
                  where: {
                    mediaName: MediaNameSchema.options[1],
                  },
                  select: {
                    url: true,
                  },
                },
              },
            },
          },
          take: takePosts,
          skip: skipPosts,
          orderBy: {
            postedAt: "desc",
          },
          cacheStrategy: { ttl: 60, swr: 60 },
        });
    return { jobs };
  } catch (error) {
    return { error: { message: "Failed to fetch jobs." }, statusCode: 501 };
  }
};

import { ApprovalStatus } from "@prisma/client";
export async function changeJobApprovalStatus({
  applicantId,
  status,
}: {
  applicantId: string;
  status: ApprovalStatus;
}) {
  try {
    const res = await prisma.applicant.update({
      where: {
        id: applicantId,
      },
      data: {
        approvalStatus: status,
      },
      select: {
        id: true,
      },
    });
    return { success: true };
  } catch (error) {
    return { error: "Error Occured" };
  }
}

import {
  leftSidebarfilterProps,
  leftSidebarfilterPropsTypes,
} from "@/types/sharedTypes";
import { JobPostSelectType } from "@/types/zodValidations";
import { MediaNameSchema } from "@/prisma/generated/zod";

export default async function getOrganisationName(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      firstName: true,
      secondName: true,
    },
  });
  return user?.firstName + " " + user?.secondName || "";
}

export async function getJobDetails(jobId: string) {
  const job = await prisma.jobPost.findUnique({
    where: { id: jobId },
    select: {
      jobTitle: true,
      jobDescription: true,
    },
  });
  return job;
}
