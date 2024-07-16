"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState } from "react";
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

import { useForm } from "react-hook-form";

import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import DatePicker from "@/components/shared/DatePicker";
import InputText from "@/components/shared/InputText";
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
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(values);
    console.log(availability);
    setPending(false);
  }
  return (
    <ScrollArea className="w-4/5 py-8 px-12 mx-auto h-full ">
      <h1 className="text-6xl mb-6">Applying for ~jobname~</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-2">
          <FormField
            control={form.control}
            name="coverLetter"
            render={({ field }) => (
              <FormItem>
                <h3>Cover Letter</h3>
                <FormLabel>Why should you be hired for this role?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Most of the Recruiters Read your coverLetter before Reading Resume.  "
                    {...field}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </FormControl>
                <br />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="availability"
            render={({ field }) => (
              <FormItem>
                <h3>Your availability</h3>
                <FormLabel>Confirm your availability</FormLabel>
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
                      <FormLabel className="font-normal">
                        Yes, I am available to join immediately
                      </FormLabel>
                    </FormItem>

                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="currentlyServing" />
                      </FormControl>
                      <FormLabel className="font-normal">
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
                      <FormLabel className="font-normal">
                        No, I will have to serve notice period
                      </FormLabel>
                    </FormItem>
                    {availability === "haveToServe" && (
                      <InputText
                        form={form}
                        placeholder="Period in Months"
                        name="servingPeriod"
                      />
                    )}
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="other" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Other
                        <span className="text-gray-400">
                          (Please specify your availability)
                        </span>
                      </FormLabel>
                    </FormItem>
                    {availability === "other" && (
                      <InputText
                        placeholder="Other Reason"
                        form={form}
                        name="other"
                      />
                    )}
                  </RadioGroup>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="resume"
            render={({ field }) => (
              <FormItem>
                <h3>Resume</h3>
                <FormLabel>Upload Your Resume Seperately?</FormLabel>
                <br />
                <FormControl>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        field.onChange(file);
                      }
                    }}
                  />
                </FormControl>
                <br />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={pending}>
            {pending ? "Submitting... " : "Submit"}
          </Button>
        </form>
      </Form>
    </ScrollArea>
  );
}
