import OnboardingForm from "@/components/Onboarding/OnboardingForm";
import OrganisationOnboardingForm from "@/components/Onboarding/OrganisationOnboardingForm";
import prisma from "@/prisma";
import { RoleSchema } from "@/prisma/generated/zod";
import { OrganisationOnboardingSchema } from "@/types/zodValidations";
import React from "react";

const Page = async ({ params }: { params: { userId: string } }) => {
  const UserRole = await prisma.user.findUnique({
    where: { id: params.userId[0] },
    select: {
      role: true,
    },
  });
  const RoleSchemaOptions = RoleSchema.options;
  return UserRole?.role === RoleSchemaOptions[0] ||
    UserRole?.role === RoleSchemaOptions[2] ? (
    <OrganisationOnboardingForm
      userId={params.userId[0]}
      type="EditOrganisationOnboardingForm"
    />
  ) : (
    <OnboardingForm userId={params.userId[0]} type="EditOnboardingForm" />
  );
};

export default Page;
