"use client";
import React, { useEffect, useRef, useState } from "react";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { ScrollArea } from "@/components/ui/scroll-area";
import { FormProvider, useForm } from "react-hook-form";

import InputText from "@/components/shared/InputText";
import { toast } from "sonner";
import { InputTextArea } from "@/components/shared/InputTextArea";
import imageCompression from "browser-image-compression";

import { getUserId } from "@/app/actions/auth.action";
import {
  LocationSchema,
  MediaNameSchema,
  UserSchema,
} from "@/prisma/generated/zod";
import { redirect, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  getUserDetailsOnboarding,
  updateOnboardingOrganisation,
  updateOnboardingUser,
} from "@/app/actions/user.action";
import {
  OrganisationOnboardingSchema,
  UserWithSkillsAndAddressTypes,
} from "@/types/zodValidations";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ACCEPTED_IMAGE_TYPES } from "@/_constants/constants";
import { getUrl } from "@/app/actions/jobs.action";
import StateButton from "../shared/StateButton";

export default function OrganisationOrganisationOnboardingForm({
  userId,
  type,
}: {
  userId: string;
  type: string;
}) {
  const [pending, setPending] = useState<boolean>(false);
  const [user, setUser] = useState(null);
  const [compressedImage, setCompressedImage] = useState<any>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const uploadImageRef = useRef<HTMLInputElement | null>(null);
  const [userDetails, setUserDetails] =
    useState<UserWithSkillsAndAddressTypes>();
  const router = useRouter();
  const form = useForm<z.infer<typeof OrganisationOnboardingSchema>>({
    resolver: zodResolver(OrganisationOnboardingSchema),
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
      media: "",
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
          type === "OrganisationOnboardingForm"
        ) {
          toast.success("Onboarding Already Completed");
          router.push(`/dashboard/user/${user.userDetails.id}`);
        } else if (user.userDetails.role === "USER") {
          router.push(`/dashboard/user/${user.userDetails.id}`);
        } else {
          setUserDetails(user.userDetails);
          if (user.userDetails.media) {
            setCompressedImage(user.userDetails.media);
          }
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
        address: [
          {
            // Default location with one entry
            address: userDetails?.address[0]?.address || "",
            postalCode: userDetails?.address[0]?.postalCode || 0,
            state: userDetails?.address[0]?.state || "",
            city: userDetails?.address[0]?.city || "",
            phoneNumber: userDetails?.address[0]?.phoneNumber || "",
          },
        ],
        about: userDetails.about,
      });
    }
  }, [userDetails, form]);

  // ------------------------------------------
  // Handle Form Submit
  // ------------------------------------------
  async function onSubmit(
    values: z.infer<typeof OrganisationOnboardingSchema>,
  ) {
    setPending(true);

    try {
      if (compressedFile) {
        const signedUrl = await getUrl(
          compressedFile.size,
          compressedFile.type,
          MediaNameSchema.options[1],
        );
        if (signedUrl.error) {
          toast.error(signedUrl.error);
          throw new Error(signedUrl.error);
        } else if (!signedUrl.error && signedUrl.success) {
          const url = signedUrl.success.url;
          await fetch(url, {
            method: "PUT",
            body: compressedFile,
            headers: {
              "Content-Type": compressedFile.type,
            },
          });
        } else {
          throw new Error("No file uploaded or file compression failed.");
        }
        const updateUser = await updateOnboardingOrganisation(values);
        if (updateUser.error) {
          throw new Error(updateUser.error);
        }
        toast.success("Successfully Submitted");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
    router.refresh();
    setPending(false);
  }

  // ------------------------------------------
  // Handle Image Upload
  // ------------------------------------------
  const handleImageUpload = async (event: any) => {
    const imageFile = event.target.files[0];
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1200,
      useWebWorker: true,
    };

    try {
      const compressedFile1 = await imageCompression(imageFile, options);
      const compressedImageURL = URL.createObjectURL(compressedFile1);
      setCompressedImage(compressedImageURL);
      setCompressedFile(compressedFile1);
      form.setValue("media", compressedImageURL);
    } catch (error) {
      console.error("Error compressing image:", error);
    }
  };
  const initials = `${userDetails?.firstName[0] || ""}${userDetails?.secondName[0] || ""}`;

  const isDisabled = type === "OrganisationOnboardingForm" ? false : true;
  const editForm = type === "EditOrganisationOnboardingForm" ? true : false;
  return (
    <ScrollArea className="mx-auto h-full w-full px-12 py-8">
      <h1 className="mx-auto mb-6 text-6xl text-black dark:text-white">
        {editForm ? "Edit" : "Complete"} Your Profile
      </h1>

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-4/6 space-y-4 px-2"
        >
          <input
            type="file"
            accept=".jpeg,.png,.jpg,.webp,.avif"
            ref={uploadImageRef}
            hidden={true}
            onChange={handleImageUpload}
          />
          <div className="flex flex-col items-center">
            <Avatar className="mx-auto mb-4 h-32 w-32 cursor-pointer">
              <AvatarImage src={compressedImage} alt="@profile_img" />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <p
              className="cursor-pointer text-blue-500 underline"
              onClick={() =>
                uploadImageRef.current ? uploadImageRef.current.click() : ""
              }
            >
              Select a Profile Photo
            </p>
          </div>

          <div className="flex w-full space-x-2">
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

          <StateButton
            content="Save Profile"
            pending={pending}
            processingWord="Saving"
          />
        </form>
      </FormProvider>
    </ScrollArea>
  );
}
