import { questionsData } from "@/_constants/constants";
import prisma from "@/prisma";
import type { MetadataRoute } from "next";

export default async function sitemap() {
  const roadmapsRes = await prisma.roadMap.findMany({ select: { id: true } });
  const jobsRes = await prisma.jobPost.findMany({ select: { id: true } });
  const practiceRes = Object.values(questionsData).map((question) => ({
    url: `https://futurebuildv1.vercel.app/practice/question/${question.id}`,
    priority: 0.8,
  }));
  const jobs = jobsRes.map((job) => ({
    url: `https://futurebuildv1.vercel.app/jobs/${job.id}`,
    priority: 0.8,
  }));
  const roadmaps = roadmapsRes.map((roadmap) => ({
    url: `https://futurebuildv1.vercel.app/roadmap/${roadmap.id}`,
    priority: 0.8,
  }));

  const baseUrl = "https://futurebuildv1.vercel.app";
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/jobs`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/roadmap`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/practice`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },

    {
      url: `${baseUrl}/resume/template`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...practiceRes,
    // ...jobs,
  ];
}
export const revalidate = 3600;
