"use client";
import React, { useEffect } from "react";
import "../globals.css";
import { usePathname, useRouter } from "next/navigation";
import SignIn from "./SignIn";
import SignUp from "./Signup";
import { getUser } from "./lucia";
import { checkUser, clientCheckUser } from "../actions/auth.action";

export default function Page() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    async function handleAuth() {
      const isAuthenticated = await clientCheckUser();
      if (!isAuthenticated) {
        if (pathname === "/authenticate") {
          router.push("/authenticate/signin");
        }
        if (!pathname.includes("signin") && !pathname.includes("signup"))
          router.push("/authenticate/signin");
      } else {
        if (pathname.includes("signin") || pathname.includes("signup")) {
          router.push("/");
        }
      }
    }
    handleAuth();
  }, [pathname, router]);
  return (
    <div className=" overflow-y-scroll ">
      {pathname.includes("signin") ? (
        <SignIn />
      ) : pathname.includes("signup") ? (
        <SignUp />
      ) : (
        <SignIn />
      )}
    </div>
  );
}
