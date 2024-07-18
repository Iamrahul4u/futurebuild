"use client";
import React, { useEffect } from "react";
import "../globals.css";
import { usePathname, useRouter } from "next/navigation";
import SignIn from "./SignIn";
import SignUp from "./Signup";
import { getUser } from "./lucia";
import { checkUser } from "../actions/auth.action";

export default function Page() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // You can conditionally replace the URL here
    if (pathname.includes("/authenticate")) {
      router.push("/authenticate/signin");
      checkUser();
    }
  }, [pathname, router]);
  return (
    <div className=" h-full overflow-hidden ">
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
