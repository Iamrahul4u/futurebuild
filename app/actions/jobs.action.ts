"use server";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { checkUser } from "./auth.action";
import { getUser } from "../[...authenticate]/lucia";
import { generateRandomName } from "@/_utils/utils";
import prisma from "@/prisma";
import { prismaMedia } from "./prisma.action";

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
