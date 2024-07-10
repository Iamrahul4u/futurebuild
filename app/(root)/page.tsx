import React from "react";
import { getUser } from "../[...authenticate]/lucia";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getUser();
  if (!user) {
    redirect("/authenticate/signin");
  }
  return <div>HomePage</div>;
}
