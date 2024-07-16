import React, { useActionState } from "react";
import { checkUser, signIn } from "../actions/auth.action";

export default async function Page() {
  await checkUser();
  return <div>HomePage</div>;
}
