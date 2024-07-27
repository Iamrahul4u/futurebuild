"use server";

import prisma from "@/prisma";
import {
  JobPostOptionalDefaults,
  Media,
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
export async function prismaMedia({
  mediaType,
  url,
  mediaName,
  userId,
  applicantId,
}: z.infer<typeof mediaOptional>) {
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
      applicantId: applicantId ? applicantId : null,
    };
    const media = await prisma.media.create({
      data: filter,
    });
    return;
  } catch (error) {
    return { error: "Prisma Database Insertion Failed" };
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

    console.log(job);
    return { success: true };
  } catch (error) {
    return { error: "Error Occured" };
  }
}
