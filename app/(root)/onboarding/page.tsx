import { getUserId } from "@/app/actions/auth.action";
import { Role } from "@prisma/client";
import { BriefcaseBusinessIcon, User } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import RoleLink from "@/components/shared/RoleLink";
import { getUserOnboardingCompleted } from "@/app/actions/user.action";
const Page = async () => {
  const userId = await getUserId();
  if ("error" in userId) {
    redirect("/authenticate/signin");
  }
  if (!userId?.user?.id) {
    redirect("/authenticate/signin");
  }
  const user = await getUserOnboardingCompleted(userId?.user?.id ?? "");
  if (user?.onboardingCompleted) {
    redirect(`/dashboard/${user?.role.toLowerCase()}/${user?.id}`);
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <p className="text-4xl">What are you?</p>
      <div className="flex gap-4">
        <RoleLink
          role={Role.USER}
          userId={userId.user.id}
          href={`/onboarding/user/${userId.user.id}`}
          icon={<User height={80} width={80} />}
          label="Job Seeker"
        />
        <RoleLink
          role={Role.ORGANIZATION}
          userId={userId.user.id}
          href={`/onboarding/organization/${userId.user.id}`}
          icon={<BriefcaseBusinessIcon height={80} width={80} />}
          label="Organisation/Recruiter"
        />
      </div>
    </div>
  );
};

export default Page;
