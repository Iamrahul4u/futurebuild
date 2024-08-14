// import prisma from "@/prisma";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Lucia, TimeSpan } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const adapter = new PrismaAdapter(prisma.session, prisma.user);
export const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(1, "w"),
  sessionCookie: {
    name: "session",
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});

export interface User {
  id: string;
}
interface getUser {
  (): Promise<{ id: string } | { error: string } | null>;
}
export const getUser: getUser = cache(async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value || null;
  if (!sessionId) {
    return null;
  }
  const { user, session } = await lucia.validateSession(sessionId);
  try {
    if (session && session.fresh) {
      const sessionCookie = await lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }

    if (!session) {
      const session = lucia.createBlankSessionCookie();
      cookies().set(session.name, session.value, session.attributes);
    }
  } catch (error) {
    return { error: "Error Occured" };
  }
  return user;
});
