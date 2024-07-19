"use server";

import prisma from "@/prisma";
import {
  JobPostOptionalDefaults,
  Media,
  MediaOptionalDefaults,
} from "@/prisma/generated/zod/index";
import { z } from "zod";
import { getUser } from "../[...authenticate]/lucia";

export async function prismaMedia({
  mediaType,
  url,
  mediaName,
  userId,
}: MediaOptionalDefaults) {
  const user = await getUser();
  if (!user || "error" in user) {
    return { error: "User Not Authenticated" };
  }
  try {
    const media = await prisma.media.create({
      data: {
        mediaType: mediaType,
        url: url,
        userId: userId,
        mediaName: mediaName,
      },
    });
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

export async function getJobs() {
  const jobs = await prisma.jobPost.findMany({});
  return jobs;
}
