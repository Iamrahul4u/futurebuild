import OrganisationOnboardingForm from "@/components/Onboarding/OrganisationOnboardingForm";
import React from "react";

const Page = async ({ params }: { params: { userId: string } }) => {
  return (
    <OrganisationOnboardingForm
      userId={params.userId}
      type={"OnboardingForm"}
    />
  );
};

export default Page;
