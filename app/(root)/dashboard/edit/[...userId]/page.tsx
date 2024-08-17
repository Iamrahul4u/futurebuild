import OnboardingForm from "@/components/Onboarding/OnboardingForm";
import React from "react";

const Page = async ({ params }: { params: { userId: string } }) => {
  return <OnboardingForm userId={params.userId[0]} type="EditProfileUser" />;
};

export default Page;
