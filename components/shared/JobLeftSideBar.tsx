"use client";
import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import RangeSlider from "./RangeSlider";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputTextArea } from "./InputTextArea";
import InputText from "./InputText";
import StateButton from "./StateButton";
import InputNumber from "./InputNumber";
import { CheckboxGroup } from "@radix-ui/themes";
import queryString from "query-string";

import {
  ExperienceEnumSchema,
  JobTypeSchema,
  modeSchema,
} from "@/prisma/generated/zod";
import CheckBoxes from "./CheckBoxes";
import { SelectForm } from "./Select";
import { CardTitle } from "../ui/card";
import { leftSidebarfilterProps } from "@/types/sharedTypes";
import { usePathname, useRouter } from "next/navigation";

const JobLeftSideBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const form = useForm<z.infer<typeof leftSidebarfilterProps>>({
    resolver: zodResolver(leftSidebarfilterProps),
    defaultValues: {
      maxSalary: 0,
      minSalary: 0,
      jobTitle: "",
      whoCanApply: undefined,
      jobType: undefined,
      modeOfWork: undefined,
    },
  });
  async function handleSubmit(values: z.infer<typeof leftSidebarfilterProps>) {
    const newUrl = queryString.stringify(values);
    console.log(newUrl);
    router.replace(pathname + "?" + newUrl);
    router.refresh();
  }
  const isFormBlank = !Object.values(form.getValues()).some(
    (value) => value !== "" && value !== undefined && value !== 0,
  );
  const resetForm = () => {
    form.reset({
      jobTitle: "",
      minSalary: 0,
      maxSalary: 0,
      modeOfWork: undefined,
      jobType: undefined,
      whoCanApply: undefined,
    });
    // Remove query parameters from URL
    const params = pathname.split("?")[0];
    router.push(params);
  };
  return (
    <div className="custom-scrollbar h-full min-w-[25%] overflow-y-scroll px-8 py-6 pb-24">
      {/* Search Description Component */}
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="flex items-start justify-between">
            <p className="text-lg font-bold text-black dark:text-white">
              Filters
            </p>
            <p
              onClick={() => resetForm()}
              className={`m-0 cursor-pointer p-0 font-semibold ${isFormBlank ? "cursor-not-allowed text-gray-500" : "text-gray-800"}`}
            >
              Clear All
            </p>
          </div>
          <div>
            <InputText
              name="jobTitle"
              placeholder="Eg. Software Developer"
              label="Search Description"
            />
          </div>
          {/* Price Range */}
          <h4 className="mb-2 mt-4 text-black dark:text-white">
            Annual Expectations
          </h4>
          <div className="flex gap-2">
            <InputNumber name="minSalary" placeholder="Min" />
            <InputNumber name="maxSalary" placeholder="Max" />
          </div>

          <h4 className="mb-2 mt-4 text-black dark:text-white">Experience</h4>
          <div className="flex gap-2">
            <SelectForm
              name="whoCanApply"
              options={ExperienceEnumSchema.options}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-col gap-2">
              <h4 className="mb-2 mt-4 text-black dark:text-white">Job Type</h4>
              <SelectForm name="jobType" options={JobTypeSchema.options} />
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="mb-2 mt-4 text-black dark:text-white">Job Mode</h4>
              <SelectForm name="modeOfWork" options={modeSchema.options} />
            </div>
          </div>
          <StateButton content="Apply Filters" className="mt-16" />
        </form>
      </FormProvider>
    </div>
  );
};

export default JobLeftSideBar;
