"use client";
import { CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import z from "zod";
import InputText from "@/components/shared/InputText";
import { FormProvider, useForm } from "react-hook-form";
import { InputTextArea } from "@/components/shared/InputTextArea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SelectForm } from "@/components/shared/Select";
import {
  ExperienceEnumSchema,
  JobPostOptionalDefaultsSchema,
  JobTypeSchema,
  modeSchema,
  RoleSchema,
} from "@/prisma/generated/zod";
import DatePicker from "@/components/shared/DatePicker";
import { zodResolver } from "@hookform/resolvers/zod";
import StateButton from "@/components/shared/StateButton";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { createJob } from "@/app/actions/prisma.action";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";
import useGetUser from "@/hooks/useGetUser";
import useGetUserRole from "@/hooks/useGetUserRole";
import LoadingForm from "@/components/loaders/LoadingForm";

export default function Page() {
  const [pending, setPending] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof JobPostOptionalDefaultsSchema>>({
    resolver: zodResolver(JobPostOptionalDefaultsSchema.omit({ userId: true })),
    defaultValues: {
      jobTitle: "",
      jobDescription: "",
      organisationName: "",
      modeOfWork: modeSchema.options[0] || "",
      jobType: JobTypeSchema.options[0] || "",
      minExperience: 0,
      maxExperience: 1,
      minSalary: 0,
      maxSalary: 1,
      postedAt: new Date(), // Set default date
      whoCanApply: "Anyone",
    },
  });
  const { role, loading } = useGetUserRole();
  useEffect(() => {
    if (loading) return;
    if (role !== "ADMIN" && role !== "ORGANIZATION") {
      toast.error("Not Authorized to create Job");
      router.push("/");
    }
  }, [loading, role, router]);

  async function onSubmit(
    values: z.infer<typeof JobPostOptionalDefaultsSchema>,
  ) {
    setPending(true);
    try {
      const res = await createJob(values);
      if (res.success) {
        toast.success("Successfully Created Job");
        router.push("/jobs");
      }
    } catch (error) {}
    setPending(false);
  }

  return (
    <ScrollArea className="mx-auto h-full w-3/4 px-12 py-8">
      <CardTitle className="text-3xl font-bold text-black dark:text-white">
        Post a New Job
      </CardTitle>
      <CardDescription>
        Fill out the form to create a new job listing.
      </CardDescription>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-2">
          <div className="space-y-4">
            <div className="grid gap-2">
              <InputText
                name="jobTitle"
                placeholder="Software Engineer"
                label="Job Title"
              />
            </div>
            <div className="grid gap-2">
              <InputTextArea
                placeholder="Describe the job responsibilities and requirements..."
                name="jobDescription"
                label="Job Description"
              />
            </div>
            <div className="grid gap-2">
              <InputText
                placeholder="Acme Inc"
                name="organisationName"
                label="Organization"
              />
            </div>
            <div className="grid gap-2">
              <SelectForm
                name="modeOfWork"
                label="Work Mode"
                options={modeSchema.options}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <InputText
                  name="minExperience"
                  placeholder="1"
                  label="Min Experience"
                />
              </div>
              <div className="grid gap-2">
                <InputText
                  name="maxExperience"
                  placeholder="5"
                  label="Max Experience"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <InputText
                  name="minSalary"
                  placeholder="50000"
                  label="Min Salary"
                />
              </div>
              <div className="grid gap-2">
                <InputText
                  name="maxSalary"
                  placeholder="100000"
                  label="Max Salary"
                />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {/* <div className="grid gap-2">
              <Label htmlFor="skills">Relevant Skills</Label>
              <Textarea
                id="skills"
                rows={3}
                placeholder="JavaScript, React, Node.js"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="perks">Perks</Label>
              <Textarea
                id="perks"
                rows={3}
                placeholder="Health insurance, 401(k), Unlimited PTO"
              />
            </div> */}
            <div className="grid gap-2">
              <SelectForm
                name="jobType"
                label="Select job type"
                options={JobTypeSchema.options}
              />
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="grid gap-2">
                <DatePicker
                  label={"Posting Date"}
                  name="postedAt"
                  placeHolder="Choose Date"
                />
              </div>
              <div className="grid gap-2">
                <SelectForm
                  name="whoCanApply"
                  label="Who Can Apply"
                  options={ExperienceEnumSchema.options}
                />
              </div>
            </div>
          </div>
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
