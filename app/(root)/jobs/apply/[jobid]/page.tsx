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
import { MediaNameSchema } from "@/prisma/generated/zod";
import { redirect, useRouter } from "next/navigation";

const applyJob = z.object({
  coverLetter: z
    .string()
    .min(100, { message: "Letter Should be more than 100 Letters" })
    .max(1000, { message: "Letter Shouldn't be more than 1000 characters" }),
  availability: z.enum(["Yes", "currentlyServing", "haveToServe", "other"]),
  joiningDate: z
    .date({
      required_error: "Expected Date for the joining is required.",
    })
    .optional(),
  servingPeriod: z
    .string()
    .min(10, { message: "Letter Should be more than 10 Letters" })
    .max(25, { message: "Letter Shouldn't be more than 25 characters" })
    .optional(),
  other: z
    .string()
    .min(10, { message: "Letter Should be more than 10 Letters" })
    .max(100, { message: "Letter Shouldn't be more than 100 characters" })
    .optional(),
  resume: z.instanceof(File).optional(),
});
export default function Page({ params }: { params: { jobid: string } }) {
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
  }, []);

  const form = useForm<z.infer<typeof applyJob>>({
    resolver: zodResolver(applyJob),
    defaultValues: {
      coverLetter: "",
      availability: "Yes",
    },
  });
  async function onSubmit(values: z.infer<typeof applyJob>) {
    setPending(true);
    if (availability === "Yes") {
      values.servingPeriod = undefined;
      values.joiningDate = undefined;
      values.other = undefined;
    } else if (availability === "currentlyServing") {
      values.servingPeriod = undefined;
    } else if (availability === "haveToServe") {
      values.joiningDate = undefined;
    } else if (availability === "other") {
      values.joiningDate = undefined;
      values.servingPeriod = undefined;
    }

    try {
      if (values.resume) {
        const signedUrl = await getUrl(
          values.resume.size,
          values.resume.type,
          MediaNameSchema.options[0],
        );
        if (signedUrl.error) {
          toast.error(signedUrl.error);
          throw new Error(signedUrl.error);
        } else if (!signedUrl.error && signedUrl.success) {
          const url = signedUrl.success.url;
          await fetch(url, {
            method: "PUT",
            body: values.resume,
            headers: {
              "Content-Type": values.resume.type,
            },
          });

          const applyJob = await applyToJob(params.jobid);
          if (applyJob.error) {
            await fetch(url, {
              method: "DELETE",
              body: values.resume,
              headers: {
                "Content-Type": values.resume.type,
              },
            });
          }
          toast.success("Applied Successfully!!");
          router.push("/jobs");
        }
      }
    } catch (error) {
      console.log(error);
    }
    setPending(false);
  }
  return (
    <ScrollArea className="w-4/5 py-8 px-12 mx-auto h-full ">
      <h1 className="text-6xl mb-6 text-black dark:text-white">
        Applying for ~jobname~
      </h1>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-2">
          <h3 className="text-black dark:text-white">Cover Letter</h3>

          <InputTextArea
            placeholder="Most of the Recruiters Read your coverLetter before Reading Resume."
            name="coverLetter"
            label="Why should you be hired for this role?"
          />
          <FormField
            control={form.control}
            name="availability"
            render={({ field }) => (
              <FormItem>
                <h3 className="text-black dark:text-white">
                  Your availability
                </h3>
                <FormLabel className="text-black dark:text-white">
                  Confirm your availability
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value: string) => {
                      setAvailability(value);
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Yes" />
                      </FormControl>
                      <FormLabel className="font-normal  text-black dark:text-white">
                        Yes, I am available to join immediately
                      </FormLabel>
                    </FormItem>

                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="currentlyServing" />
                      </FormControl>
                      <FormLabel className="font-normal text-black dark:text-white">
                        No, I am currently on notice period
                      </FormLabel>
                    </FormItem>
                    {availability === "currentlyServing" && (
                      <DatePicker
                        name="joiningDate"
                        placeHolder="When is the latest you can join?"
                      />
                    )}
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="haveToServe" />
                      </FormControl>
                      <FormLabel className="font-normal text-black dark:text-white">
                        No, I will have to serve notice period
                      </FormLabel>
                    </FormItem>
                    {availability === "haveToServe" && (
                      <InputText
                        placeholder="Period in Months"
                        name="servingPeriod"
                      />
                    )}
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="other" />
                      </FormControl>
                      <FormLabel className="font-normal text-black dark:text-white">
                        Other
                        <span className="text-gray-400">
                          (Please specify your availability)
                        </span>
                      </FormLabel>
                    </FormItem>
                    {availability === "other" && (
                      <InputText placeholder="Other Reason" name="other" />
                    )}
                  </RadioGroup>
                </FormControl>

                <FormMessage className="pt-2" />
              </FormItem>
            )}
          />

          <UploadFile name="resume" />
          <StateButton
            content="Submit"
            processingWord="Submitting..."
            pending={pending}
          />
        </form>
      </FormProvider>
    </ScrollArea>
  );
}
