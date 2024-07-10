"use client";
import React, { useEffect } from "react";
import "../globals.css";
import { usePathname, useRouter } from "next/navigation";
import SignIn from "./SignIn";
import SignUp from "./Signup";
import { getUser } from "./lucia";
import { checkUser } from "./auth.action";

export default function Page() {
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    // You can conditionally replace the URL here
    if (pathname === "/authenticate") {
      router.push("/authenticate/signin");
      checkUser();
    }
  }, [pathname, router]);
  return (
    <div className="bg-red-200">
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
