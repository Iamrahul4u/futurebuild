"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormProvider, useForm } from "react-hook-form";

import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import DatePicker from "@/components/shared/DatePicker";
import InputText from "@/components/shared/InputText";
import { getUrl } from "@/app/actions/jobs.action";
import { toast } from "sonner";
import { InputTextArea } from "@/components/shared/InputTextArea";
import UploadFile from "@/components/shared/UploadFile";
import { redirect } from "next/navigation";
import { checkUser } from "@/app/actions/auth.action";
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
  useEffect(() => {
    async function getUser() {
      await checkUser();
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
        console.log(values.resume);
        const signedUrl = await getUrl(values.resume.size, values.resume.type);
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
          toast.success("Applied Successfully!!");
          redirect("/jobs");
        }
      }
    } catch (error) {
      console.log(error);
    }
    console.log(values);
    console.log(availability);
    setPending(false);
  }
  return (
    <ScrollArea className="w-4/5 py-8 px-12 mx-auto h-full ">
      <h1 className="text-6xl mb-6 text-black dark:text-white">
        Applying for ~jobname~
      </h1>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-2">
          <InputTextArea
            placeholder="Most of the Recruiters Read your coverLetter before Reading Resume."
            name="coverLetter"
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
                      <DatePicker form={form} name="joiningDate" />
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

                <FormMessage />
              </FormItem>
            )}
          />

          <UploadFile name="resume" />
          <Button type="submit" disabled={pending}>
            {pending ? "Submitting... " : "Submit"}
          </Button>
        </form>
      </FormProvider>
    </ScrollArea>
  );
}
