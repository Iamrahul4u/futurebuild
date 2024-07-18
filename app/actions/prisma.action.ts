"use server";

import prisma from "@/prisma";

export async function prismaMedia({ fileType, url, userId }: prismaMediaProps) {
  try {
    const media = await prisma.media.create({
      data: {
        mediaType: fileType,
        url: url,
        // @ts-ignore
        userId: userId,
      },
    });
    console.log(media);
  } catch (error) {
    return { error: "Prisma Database Insertion Failed" };
  }
}
