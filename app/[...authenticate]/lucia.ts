import prisma from "@/prisma";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Lucia } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";

const adapter = new PrismaAdapter(prisma.session, prisma.user);
export const lucia = new Lucia(adapter, {
  sessionCookie: {
    name: "session",
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});

export const getUser = cache(async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value || null;
  if (!sessionId) return null;
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
    return { error: true };
  }
  return user;
});
