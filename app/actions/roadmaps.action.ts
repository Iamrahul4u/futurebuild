"use server";

import prisma from "@/prisma";
import { RoadMapSchema } from "@/types/zodValidations";
import { getUserId } from "./auth.action";
import { getUser } from "../[...authenticate]/lucia";
import { redirect } from "next/navigation";
export default async function getRoadmaps() {
  try {
    const roadmaps = await prisma.roadMap.findMany({ take: 12 });
    return roadmaps;
  } catch (error) {
    return error;
  }
}

export async function setRoadmap({
  roadmap,
  title,
}: {
  roadmap: string;
  title: string;
}) {
  const user = await getUser();
  if (!user || "error" in user) {
    // Redirect to sign-in if user is null or if there's an error
    return redirect("/authentication/signin");
  }

  const userId = user.id;
  try {
    const roadmaps = await prisma.roadMap.create({
      data: {
        title: title,
        mermaidSyntax: roadmap,
        userId: userId,
      },
      select: {
        id: true,
      },
    });
    return roadmaps;
  } catch (error) {
    return { error: "Error in Setting the roadMap" };
  }
}

export async function updateRoadmap({
  roadmap,
  roadmapId,
}: {
  roadmap: string;
  roadmapId: string;
}) {
  const user = await getUser();
  if (!user || "error" in user) {
    return redirect("/authentication/signin");
  }

  try {
    const updatedRoadmap = prisma.roadMap.update({
      where: {
        id: roadmapId,
      },
      data: {
        mermaidSyntax: roadmap,
      },
    });
    return updatedRoadmap;
  } catch (error) {
    return { error: "Error in Updating the roadMap" };
  }
}
