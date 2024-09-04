"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import {
  // FormControl,
  FormField,
  // FormItem,
  // FormLabel,
  // FormMessage,
} from "../../../../../components/ui/form";
const FormControl = dynamic(() =>
  import("@/components/ui/form").then((mod) => mod.FormControl),
);
// const FormField=dynamic(()=>import("@/components/ui/form").then(mod=>mod.FormField))
const FormItem = dynamic(() =>
  import("@/components/ui/form").then((mod) => mod.FormItem),
);
const FormLabel = dynamic(() =>
  import("@/components/ui/form").then((mod) => mod.FormLabel),
);
const FormMessage = dynamic(() =>
  import("@/components/ui/form").then((mod) => mod.FormMessage),
);

import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
const ScrollArea = dynamic(() =>
  import("@/components/ui/scroll-area").then((mod) => mod.ScrollArea),
);
import { FormProvider, useForm } from "react-hook-form";

const RadioGroup = dynamic(() =>
  import("@/components/ui/radio-group").then((mod) => mod.RadioGroup),
);
const RadioGroupItem = dynamic(() =>
  import("@/components/ui/radio-group").then((mod) => mod.RadioGroupItem),
);
const DatePicker = dynamic(() => import("@/components/shared/DatePicker"));
import InputText from "@/components/shared/InputText";
const InputTextArea = dynamic(() =>
  import("@/components/shared/InputTextArea").then((mod) => mod.InputTextArea),
);
const UploadResume = dynamic(() => import("@/components/shared/UploadResume"));
const StateButton = dynamic(() => import("@/components/shared/StateButton"));
import { toast } from "sonner";
import {
  checkUser,
  clientCheckUser,
  getUserId,
} from "@/app/actions/auth.action";
import { MediaNameSchema } from "@/prisma/generated/zod";
import { useRouter } from "next/navigation";
import { applyToJob, getJobDetails, getUrl } from "@/app/actions/jobs.action";
import { ACCEPTED_FILE_TYPES, MAX_RESUME_SIZE } from "@/_constants/constants";
import { getResume } from "@/app/actions/user.action";
import { prismaMedia } from "@/app/actions/prisma.action";
import { Button } from "@/components/ui/button";
import { SparklesIcon } from "lucide-react";
import { generateCoverLetter } from "@/app/actions/openAi.action";
import { AiModal } from "@/components/resumeBuilder/AiModal";

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
  resume: z
    .instanceof(File)
    .refine(
      (file) => file?.size <= MAX_RESUME_SIZE,
      "File Size Should be less than 5MB",
    )
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      "File Type isn't Allowed",
    )
    .optional(),
});

export default function Page({ params }: { params: { jobid: string } }) {
  const [pending, setPending] = useState<boolean>(false);
  const [availability, setAvailability] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();
  const [resume, setResume] = useState<string | null>(null);
  const [resumeType, setResumeType] = useState<string | null>(null);

  useEffect(() => {
    async function getUser() {
      const res = await getUserId();
      if ("error" in res) {
        toast.error("User Not Logged In");
        router.push("/authenticate/signin");
      }
      if (!res.user?.id) {
        toast.error("User Not Logged In");
        router.push("/authenticate/signin");
      }
      setUser(res.user?.id || "");
      const jobDetails = await getJobDetails(params.jobid);
      const jobTitle = jobDetails?.jobTitle;
      const jobDescription = jobDetails?.jobDescription;
      const resumeRes = await getResume();
      if (resumeRes && typeof resumeRes === "object" && "error" in resumeRes) {
        setResume(null);
        setResumeType(null);
      } else if (
        resumeRes &&
        typeof resumeRes === "object" &&
        "url" in resumeRes &&
        "mediaType" in resumeRes
      ) {
        setResume(resumeRes.url);
        setResumeType(resumeRes.mediaType);
      } else {
        setResume(null);
        setResumeType(null);
      }
      if (jobTitle) {
        setJobTitle(jobTitle);
      }
      if (jobDescription) {
        setJobDescription(jobDescription);
      }
    }
    getUser();
  }, [router]);

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
      const applicant = await applyToJob({
        jobId: params.jobid,
        coverLetter: values.coverLetter,
        availability: values.availability,
      });
      if (applicant.error) {
        toast.error(applicant.error);
        throw new Error(applicant.error);
      }
      const applicantId = applicant.success?.applicantId.id;
      if (resume && !values.resume) {
        const mediaRes = await prismaMedia({
          mediaType: resumeType || "",
          mediaName: MediaNameSchema.options[0],
          url: resume || "",
          userId: user || "",
          applicantId: applicantId || "",
        });
        if ("error" in mediaRes) {
          toast.error(mediaRes.error);
          throw new Error(mediaRes.error);
        }
      } else if (values.resume) {
        const signedUrl = await getUrl(
          values.resume.size,
          values.resume.type,
          MediaNameSchema.options[0],
          applicantId,
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
          setResume(url);
          setResumeType(values.resume.type);
        }
      }
      toast.success("Applied Successfully!!");
      router.push("/jobs");
    } catch (error) {
      toast.error("Something went wrong");
    }
    setPending(false);
  }

  return (
    <ScrollArea className="mx-auto h-full w-4/5 px-12 py-8">
      <h1 className="mb-6 text-6xl text-black dark:text-white">
        Applying for ~{jobTitle}~
      </h1>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-2">
          <h3 className="text-black dark:text-white">Cover Letter</h3>
          <AiModal
            type="coverLetter"
            form={form}
            user={user}
            jobDescription={jobDescription}
            text={"Generate Cover Letter By AI"}
            description={"Generate a cover letter based on your profile."}
          />
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
                      <FormLabel className="font-normal text-black dark:text-white">
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

          <UploadResume name="resume" resume={resume} />
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
