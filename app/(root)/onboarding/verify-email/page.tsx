"use client";
import StateButton from "@/components/shared/StateButton";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const Page = () => {
  const [pending, setPending] = useState<boolean>(false);
  const email = "iamrahulgupta4u@gmail.com";
  const firstPart = email.split("@")[0].toUpperCase();
  const hiddenSubstr = firstPart.substring(1, firstPart.length - 2);
  const stars: string = "*".repeat(hiddenSubstr.length).toLowerCase();
  const hiddenEmail = firstPart.replaceAll(hiddenSubstr, stars);
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
  }
  return (
    <div className="mx-auto my-auto flex w-2/5 flex-col gap-4">
      <h3 className="text-black dark:text-white">
        We Have Sent a Code to your Email
        <br />
        <span className="">{hiddenEmail.concat("@", email.split("@")[1])}</span>
      </h3>
      <form onSubmit={handleSubmit}>
        <Input placeholder="Otp" name="Otp" className="mb-4" required />
        <StateButton
          content="Verify"
          pending={pending}
          processingWord="Verifying"
        />
      </form>
    </div>
  );
};

export default Page;
