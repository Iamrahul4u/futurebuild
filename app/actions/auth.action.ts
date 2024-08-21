"use server";

import { z } from "zod";
import { signUpSchema } from "../[...authenticate]/Signup";
import prisma from "@/prisma";
import { Argon2id } from "oslo/password";
import { getUser, lucia } from "../[...authenticate]/lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signInSchema } from "../[...authenticate]/SignIn";

export async function signup({
  values,
}: {
  values: z.infer<typeof signUpSchema>;
}) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: values.email,
      },
    });
    if (user) {
      return { error: "User Already exists", user };
    }
    const argon2id = new Argon2id();
    const hashPassword = await argon2id.hash(values.password);
    const newUser = await prisma.user.create({
      data: {
        email: values.email,
        username: values.username,
        hashedPassword: hashPassword,
        firstName: values.fullName.split(" ")[0],
        secondName: values.fullName.split(" ")[1] || "",
      },
      select: {
        id: true,
      },
    });
    const session = await lucia.createSession(newUser.id, {});
    const sessionCookie = await lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "failed", success: false };
  }
}

export async function signIn({
  values,
}: {
  values: z.infer<typeof signInSchema>;
}) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: values.email,
      },
      select: {
        id: true,
        roleSet: true,
        onboardingCompleted: true,
        role: true,
      },
    });
    if (!user) {
      return { error: "User Doesn't exists" };
    }

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = await lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return { user: user };
  } catch (error) {
    console.log(error);
    return { error: "User SignIn failed" };
  }
}

export const signout = async () => {
  const session = lucia.createBlankSessionCookie();
  cookies().set(session.name, session.value, session.attributes);
  redirect("/authenticate/signin");
};

export const checkUser = async () => {
  const user = await getUser();
  if (!user) {
    redirect("/authenticate/signin");
  }
  return { success: true };
};

export const clientCheckUser = async () => {
  const user = await getUser();
  return !!user;
};

export const getUserId = async () => {
  const user = await getUser();
  if (!user) {
    return { error: null };
  }
  if ("error" in user) {
    return { error: "error" };
  }
  return { user };
};

export const checkUserRole = async ({ userId }: { userId?: string }) => {
  let user: any;
  if (!userId) {
    user = await getUser();
    if (!user) {
      return { role: null };
    }
    if ("error" in user) {
      return { role: "error" };
    }
    userId = user.id;
  }
  const role = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      role: true,
    },
  });
  return role;
};
