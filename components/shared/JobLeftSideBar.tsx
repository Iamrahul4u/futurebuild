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

const filterProps = z.object({
  title: z
    .string()
    .min(2, "Type more than 2 Letters")
    .max(30, "Length shouldn't be more than 30 letters"),
  minSalary: z
    .string()
    .min(2, "Type more than 2 Letters")
    .max(30, "Length shouldn't be more than 30 letters"),
  maxSalary: z
    .string()
    .min(2, "Type more than 2 Letters")
    .max(30, "Length shouldn't be more than 30 letters"),
});
const JobLeftSideBar = () => {
  const form = useForm<z.infer<typeof filterProps>>({
    resolver: zodResolver(filterProps),
  });
  async function handleSubmit(values: z.infer<typeof filterProps>) {
    console.log(values);
  }
  return (
    <div className="min-w-[25%]  px-8 py-6 custom-scrollbar h-full overflow-y-scroll pb-24">
      <div className="flex justify-between">
        <p className="font-bold text-lg  text-black dark:text-white">Filters</p>
        <p className="font-semibold">Clear All</p>
      </div>
      {/* Search Description Component */}
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div>
            <InputText
              name="title"
              placeholder="Eg. Software Developer"
              label="Search Description"
            />
          </div>
          {/* Price Range */}
          <h4 className="mt-4 mb-2 text-black dark:text-white">
            Annuhal Expectations
          </h4>
          <div className="flex gap-2">
            <InputNumber name="minSalary" placeholder="Min" />
            <InputNumber name="maxSalary" placeholder="Max" />
          </div>

          <div className="flex gap-2  mt-4 mb-2">
            <input type="checkbox" value={"remote"} placeholder="Remote" />
            <label>Remote</label>
          </div>
          <StateButton content="Apply Filters" />
        </form>
      </FormProvider>
    </div>
  );
};

export default JobLeftSideBar;
