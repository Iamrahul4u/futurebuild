"use client";
import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FormLabel } from "../ui/form";
import { approvalStatusSchema } from "@/prisma/generated/zod";

interface SelectOptions {
  options: string[];
  label?: string;
}
const SelectOptions = () => {
  const options = approvalStatusSchema.options;

  return (
    <div className="max-w-xs">
      <Select onValueChange={(e) => console.log(e)}>
        <SelectTrigger>
          <SelectValue placeholder="Select " />
        </SelectTrigger>
        <SelectContent>
          {options.map((option: string) => (
            <SelectItem key={option} value={option}>
              {option.split("_").join(" ")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectOptions;
