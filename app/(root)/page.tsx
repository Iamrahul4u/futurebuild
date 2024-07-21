import React, { useActionState } from "react";
import { checkUser, signIn } from "../actions/auth.action";
import AnimatedComponent from "@/components/framerMotion/AnimatedComponent";

export default async function Page() {
  await checkUser();
  return (
    <div className="flex  overflow-y-scroll h-full w-full  ">
      <AnimatedComponent />
    </div>
  );
}
