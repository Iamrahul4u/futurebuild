"use server";

import prisma from "@/prisma";
import { getUser } from "../[...authenticate]/lucia";
import { UserOnboardingSchemaTypes } from "@/types/zodValidations";
import { getUserId } from "./auth.action";
import { Role } from "@prisma/client";

export async function getUserDetailsOnboarding(userId: string) {
  const user = await getUser();
  if (!user || "error" in user) {
    return { error: "User Not Authenticated" };
  }
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
      },
    });
    const userDetails = await prisma.user.findFirst({
      where: { id: userId },
      include: {
        // Include related data if necessary
        skills: {
          include: {
            skill: {
              select: {
                name: true,
              },
            },
          },
        },
        address: true,
      },
    });
    if (!userDetails) {
      return { error: "User not found" };
    }
    return {
      userDetails: {
        ...userDetails,
        address: userDetails.address ? [userDetails.address] : [], // Wrap in an array
      },
    };
  } catch (error) {
    return { error: "Couldn't Fetch User Details" };
  }
}

export const updateOnboardingUser = async (data: UserOnboardingSchemaTypes) => {
  const user: any = await getUserId();
  if (!user || "error" in user) {
    return { error: "User Not Authenticated" };
  }
  try {
    const skillsId = await Promise.all(
      data.skills.map(async (skills) => {
        const skill = await prisma.skill.upsert({
          where: { name: skills.name },
          update: {},
          create: { name: skills.name },
          select: { id: true },
        });
        return skill.id;
      }),
    );
    const userSkillsId = await Promise.all(
      skillsId.map(async (skill) => {
        const userskill = await prisma.userSkill.upsert({
          where: { userId_skillId: { userId: user.user.id, skillId: skill } },
          update: {},
          create: { skillId: skill, userId: user.user.id },
          select: { id: true },
        });
        return userskill.id;
      }),
    );
    const existingLocation = await prisma.location.findFirst({
      where: {
        address: data.address[0].address,
      },
      select: {
        id: true,
      },
    });
    let locationId;
    if (existingLocation) {
      const updatedLocation = await prisma.location.update({
        where: { id: existingLocation.id },
        data: {
          city: data.address[0].city,
          state: data.address[0].state,
          postalCode: data.address[0].postalCode,
          phoneNumber: data.address[0].phoneNumber,
        },
        select: { id: true },
      });
      locationId = updatedLocation.id;
    } else {
      // If the location does not exist, create it
      const newLocation = await prisma.location.create({
        data: {
          city: data.address[0].city,
          state: data.address[0].state,
          postalCode: data.address[0].postalCode,
          phoneNumber: data.address[0].phoneNumber,
          address: data.address[0].address,
        },
        select: { id: true },
      });
      locationId = newLocation.id;
    }
    const users = await prisma.user.update({
      where: { id: user.user.id },
      data: {
        locationId: locationId,
        onboardingCompleted: true,
      },
    });
    return { status: "Successfully Submitted" };
  } catch (error) {
    console.log(error);
    return { error: `Failed To Update User Details` };
  }
};

export const assisgnRoleToUser = async ({
  role,
  userId,
}: {
  role: Role;
  userId: string;
}) => {
  const user: any = await getUserId();
  if (!user || "error" in user) {
    return { error: "User Not Authenticated" };
  }
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        role: role,
        roleSet: true,
      },
    });
    return { success: `Successfully Registered as ${Role}` };
  } catch (error: any) {
    return { error: "Unable To Update User Role" };
  }
};
