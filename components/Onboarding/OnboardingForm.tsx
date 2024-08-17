"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { ScrollArea } from "@/components/ui/scroll-area";
import { FormProvider, useForm } from "react-hook-form";

import InputText from "@/components/shared/InputText";
import { toast } from "sonner";
import { InputTextArea } from "@/components/shared/InputTextArea";
import {
  checkUser,
  clientCheckUser,
  getUserId,
} from "@/app/actions/auth.action";
import {
  LocationSchema,
  MediaNameSchema,
  User,
  UserOptionalDefaults,
  UserSchema,
} from "@/prisma/generated/zod";
import { redirect, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import prisma from "@/prisma";
import {
  getUserDetailsOnboarding,
  updateOnboardingUser,
} from "@/app/actions/user.action";
import {
  UserOnboardingSchema,
  UserOnboardingSchemaTypes,
  UserWithSkillsAndAddressTypes,
} from "@/types/zodValidations";
import { getUser } from "@/app/[...authenticate]/lucia";

const EditProfileUser = LocationSchema.merge(
  UserSchema.omit({
    createdAt: true,
    hashedPassword: true,
    id: true,
    role: true,
  }),
);
export default function OnboardingForm({
  userId,
  type,
}: {
  userId: string;
  type: string;
}) {
  const [pending, setPending] = useState<boolean>(false);
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] =
    useState<UserWithSkillsAndAddressTypes>();
  const router = useRouter();
  const form = useForm<z.infer<typeof UserOnboardingSchema>>({
    resolver: zodResolver(UserOnboardingSchema),
    defaultValues: {
      firstName: "",
      secondName: "",
      email: "",
      address: [
        {
          // Default location with one entry
          address: "",
          postalCode: 0,
          state: "",
          city: "",
          phoneNumber: "",
        },
      ],
      about: "",
      skills: [{ name: "" }],
    },
  });
  useEffect(() => {
    async function CheckUser() {
      const res: any = await getUserId();
      if (!res) {
        toast.error("User Not Logged In");
        router.push("/authenticate/signin");
      }
      setUser(res.user.id);
      const user = await getUserDetailsOnboarding(userId);

      if (user.error) {
        toast.error(user.error);
      } else {
        if (user.userDetails === undefined) {
          router.push("/authenticate/signin");
        } else if (
          user.userDetails.onboardingCompleted &&
          type === "OnboardingForm"
        ) {
          toast.success("Onboarding Already Completed");
          router.push(`/dashboard/user/${user.userDetails.id}`);
        } else if (
          user.userDetails.role === "ORGANIZATION" ||
          user.userDetails.role === "ADMIN"
        ) {
          router.push(`/dashboard/onganization/${user.userDetails.id}`);
        } else {
          setUserDetails(user.userDetails);
        }
      }
    }
    CheckUser();
  }, []);

  useEffect(() => {
    if (userDetails) {
      form.reset({
        firstName: userDetails.firstName,
        secondName: userDetails.secondName,
        email: userDetails.email,
        skills: [
          {
            name:
              userDetails.skills
                .map((skillObj) => skillObj.skill!.name)
                .join(",") || "", //
          },
        ],
        address: [
          {
            // Default location with one entry
            address: userDetails.address[0].address,
            postalCode: userDetails.address[0].postalCode,
            state: userDetails.address[0].state,
            city: userDetails.address[0].city,
            phoneNumber: userDetails.address[0].phoneNumber,
          },
        ],
        about: userDetails.about,
      });
    }
  }, [userDetails, form]);
  async function onSubmit(values: z.infer<typeof UserOnboardingSchema>) {
    setPending(true);
    const seperateSkills = values.skills[0].name.split(",");

    const updatedskills = seperateSkills.map((value) => {
      return {
        name: value.toUpperCase(),
      };
    });

    try {
      const updatedValues = { ...values, skills: updatedskills };
      const updateUser = await updateOnboardingUser(updatedValues);
      if (updateUser.error) {
        throw new Error(updateUser.error);
      }
      toast.success("Successfully Submitted");
      router.push(`/dashboard/user/${user}`);
    } catch (error: any) {
      toast.error(error.message);
    }
    setPending(false);
  }
  const {
    formState: { errors },
  } = form;

  const isDisabled = type === "OnboardingForm" ? false : true;
  return (
    <ScrollArea className="mx-auto h-full w-full px-12 py-8">
      <h1 className="mx-auto mb-6 text-6xl text-black dark:text-white">
        {isDisabled ? "Edit" : "Complete"} Your Profile
      </h1>
      {errors && Object.keys(errors).length > 0 && (
        <div className="error-messages">
          {Object.entries(errors).map(([key, error]) => (
            <p key={key} className="text-red-500">
              {error.message}
            </p>
          ))}
        </div>
      )}
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-4/6 space-y-4 px-2"
        >
          <div className="flex w-full justify-between space-x-2">
            <InputText
              placeholder="Eg. Rahul"
              name="firstName"
              label="First Name"
            />
            <InputText
              placeholder="Eg. Gupta"
              name="secondName"
              label="Second Name"
            />
          </div>
          <InputText
            disabled={true}
            placeholder="email@email.com"
            name="email"
            label="Email"
          />

          <InputTextArea name="about" placeholder="About me" label="About" />
          <InputText
            placeholder="9999999999"
            name="address[0].phoneNumber"
            label="Phone Number"
            disabled={isDisabled}
          />
          <InputText
            placeholder="Street "
            name="address[0].address"
            label="Address"
          />
          <InputText
            placeholder="201201"
            name="address[0].postalCode"
            isNumeric={true}
            label="Postal Code"
          />
          <InputText placeholder="Noida" name="address[0].city" label="City" />
          <InputText
            placeholder="Uttar Pradesh"
            name="address[0].state"
            label="State"
          />

          <InputText
            placeholder="Html,css,js"
            name="skills[0].name"
            label="Skills"
          />
          <Button>Save Profile</Button>
        </form>
      </FormProvider>
    </ScrollArea>
  );
}
