import OnboardingForm from "@/components/Onboarding/OnboardingForm";
import React from "react";

const Page = async ({ params }: { params: { userId: string } }) => {
  return <OnboardingForm userId={params.userId} type={"OnboardingForm"} />;
};

export default Page;
