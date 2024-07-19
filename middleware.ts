import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
  "/jobs",
  "/authenticate/signin",
  "/authenticate/signup",
  "/profile/[id]",
];

const isProtected = (url: string): boolean => {
  return protectedRoutes.some((route) => {
    // Convert route to a regular expression
    const regex = new RegExp(`^${route.replace(/\[.*?\]/g, "[^/]+")}$`);
    return regex.test(url);
  });
};

export default async function middleware(request: NextRequest) {}
