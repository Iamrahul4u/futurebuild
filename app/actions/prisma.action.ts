"use server";

import prisma from "@/prisma";
import {
  JobPostOptionalDefaults,
  Media,
  MediaNameSchema,
  MediaOptionalDefaults,
  MediaOptionalDefaultsSchema,
} from "@/prisma/generated/zod/index";
import z from "zod";
import { getUser } from "../[...authenticate]/lucia";
import { Z } from "vitest/dist/reporters-BECoY4-b.js";

const mediaOptional = MediaOptionalDefaultsSchema.omit({
  applicantId: true,
}).extend({
  applicantId: z.string().optional(),
});
type PrismaMediaResponse =
  | {
      id: string;
      url: string;
      userId: string;
      mediaType: string;
      mediaName: string;
      applicantId: string | null;
    }
  | { error: string };

export async function prismaMedia({
  mediaType,
  url,
  mediaName,
  userId,
  applicantId,
}: z.infer<typeof mediaOptional>): Promise<PrismaMediaResponse> {
  const user = await getUser();
  if (!user || "error" in user) {
    return { error: "User Not Authenticated" };
  }
  try {
    const filter = {
      mediaType: mediaType,
      url: url,
      userId: userId,
      mediaName: mediaName,
      applicantId: applicantId || null,
    };
    const ImageTypeName = MediaNameSchema.options[1];
    if (mediaName === ImageTypeName) {
      const exisitingMedia = await prisma.media.findMany({
        where: { userId: userId, mediaName: ImageTypeName },
        select: {
          id: true,
        },
      });

      if (exisitingMedia.length > 0) {
        const mediaIdsToDelete = exisitingMedia.map((media) => media.id);

        const removeProfileImg = await prisma.media.deleteMany({
          where: {
            id: {
              in: mediaIdsToDelete,
            },
          },
        });
      }
    }
    const media = await prisma.media.create({
      data: filter,
    });
    if (applicantId) {
      await prisma.applicant.update({
        where: {
          id: applicantId,
        },
        data: {
          resume: {
            connect: {
              id: media.id,
            },
          },
        },
      });
    }

    return media;
  } catch (error) {
    return { error: `Prisma Database Insertion Failed :${error}` };
  }
}

export async function createJob(props: JobPostOptionalDefaults) {
  const user = await getUser();
  if (!user || "error" in user) {
    return { error: "User Not Authenticated" };
  }
  try {
    const job = await prisma.jobPost.create({
      data: {
        jobTitle: props.jobTitle,
        jobDescription: props.jobDescription,
        maxExperience: props.maxExperience,
        maxSalary: props.maxSalary,
        organisationName: props.organisationName,
        jobType: props.jobType,
        minExperience: props.minExperience,
        minSalary: props.minSalary,
        modeOfWork: props.modeOfWork,
        userId: user.id,
        whoCanApply: props.whoCanApply,
        postedAt: props.postedAt,
      },
    });

    return { success: true };
  } catch (error) {
    return { error: "Error Occured" };
  }
}

export async function deleteUser(id: string) {
  const user = await getUser();
  if (!user || "error" in user) {
    return { error: "User Not Authenticated" };
  }
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    return deletedUser;
  } catch (error) {
    return { error: "Couldn't Complete Request" };
  }
}
