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
interface getUrlProps {
  fileSize: number;
  fileType: string;
}
export async function getUrl(fileSize: number, fileType: string) {
  const user = await getUser();
  if (!user) {
    return { error: "User not authenticated" };
  }

  if (fileSize > MAX_FILE_SIZE) {
    return { error: "File Size Exceeds Limit 10mb" };
  }
  if (!fileType) {
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
  await prismaMedia({ fileType, url, userId });
  return { success: { url: presigned } };
}
