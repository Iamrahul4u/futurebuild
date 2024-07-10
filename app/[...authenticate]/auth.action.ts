"use server";

import { z } from "zod";
import { signUpSchema } from "./Signup";
import prisma from "@/prisma";
import { Argon2id } from "oslo/password";
import { getUser, lucia } from "./lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signInSchema } from "./SignIn";
import { revalidatePath } from "next/cache";

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
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "User SignIn failed", success: false };
  }
}

export const signout = async () => {
  const session = lucia.createBlankSessionCookie();
  cookies().set(session.name, session.value, session.attributes);
  redirect("/authentication");
};

export const checkUser = async () => {
  const user = await getUser();
  if (!user) {
    redirect("/authenticate/signin");
  }
};
