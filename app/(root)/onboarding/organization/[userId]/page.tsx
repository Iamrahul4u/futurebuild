import OrganisationOnboardingForm from "@/components/Onboarding/OrganisationOnboardingForm";
import React from "react";

export const runtime = "edge";
const Page = async ({ params }: { params: { userId: string } }) => {
  return (
    <OrganisationOnboardingForm
      userId={params.userId}
      type={"OrganisationOnboardingForm"}
    />
  );
};

export default Page;
