"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../../components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ScrollArea } from "@/components/ui/scroll-area";
import { FormProvider, useForm } from "react-hook-form";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import DatePicker from "@/components/shared/DatePicker";
import InputText from "@/components/shared/InputText";
import { applyToJob, getUrl } from "@/app/actions/jobs.action";
import { toast } from "sonner";
import { InputTextArea } from "@/components/shared/InputTextArea";
import UploadFile from "@/components/shared/UploadFile";
import { checkUser, clientCheckUser } from "@/app/actions/auth.action";
import StateButton from "@/components/shared/StateButton";
import {
  LocationSchema,
  MediaNameSchema,
  UserSchema,
} from "@/prisma/generated/zod";
import { redirect, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const EditProfileUser = LocationSchema.merge(
  UserSchema.omit({
    createdAt: true,
    hashedPassword: true,
    id: true,
    role: true,
  }),
);
export default function OnboardingForm() {
  const [pending, setPending] = useState<boolean>(false);
  const [availability, setAvailability] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    async function getUser() {
      const res = await clientCheckUser();
      if (!res) {
        toast.error("User Not Logged In");
        router.push("/authenticate/signin");
      }
    }
    getUser();
  }, [router]);

  const form = useForm<z.infer<typeof EditProfileUser>>({
    resolver: zodResolver(EditProfileUser),
    defaultValues: {
      firstName: "",
      secondName: "",
      email: "",
      city: "",
      address: "",
      postalCode: 0,
      state: "",
      username: "",
    },
  });
  async function onSubmit(values: z.infer<typeof EditProfileUser>) {
    console.log(values);
  }
  return (
    <ScrollArea className="mx-auto h-full w-[90%] px-12 py-8">
      <h1 className="mb-6 text-6xl text-black dark:text-white">
        Edit Your Profile
      </h1>
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
          <InputText placeholder="email@email.com" name="email" label="Email" />
          <InputText placeholder="9999999999" name="" label="Phone Number" />
          <InputText placeholder="Street " name="address" label="Address" />
          <InputText
            placeholder="201201"
            name="postalCode"
            label="PostalCode"
          />
          <InputText placeholder="Noida" name="city" label="City" />
          <InputText placeholder="Uttar Pradesh" name="state" label="State" />
          <Button>Save Profile</Button>
        </form>
      </FormProvider>
    </ScrollArea>
  );
}
