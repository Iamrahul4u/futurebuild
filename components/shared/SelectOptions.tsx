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
import { ApprovalStatusSchema } from "@/prisma/generated/zod";
import { changeJobApprovalStatus } from "@/app/actions/jobs.action";
import { ApprovalStatus } from "@prisma/client";
import { toast } from "sonner";

interface SelectOptions {
  options: string[];
  label?: string;
}
const SelectOptions = ({
  defaultValue,
  applicantId,
}: {
  defaultValue: string;
  applicantId: string;
}) => {
  const options = ApprovalStatusSchema.options;
  async function handleApprovalStatus(value: string) {
    let status: ApprovalStatus = ApprovalStatus.Pending;
    if (value === "Pending") {
      status = ApprovalStatus.Pending;
    } else if (value === "Accepted") {
      status = ApprovalStatus.Accepted;
    } else if (value === ApprovalStatus.Rejected) {
      status = ApprovalStatus.Rejected;
    }
    const res = await changeJobApprovalStatus({ applicantId, status });
    if (res.error) {
      toast.error("Failed to Change Status");
    } else {
      toast.success(`Changed Status to ${value}`);
    }
  }
  return (
    <div className="max-w-xs">
      <Select
        onValueChange={(e) => handleApprovalStatus(e)}
        defaultValue={defaultValue}
      >
        <SelectTrigger defaultValue={defaultValue}>
          <SelectValue placeholder="Select " />
        </SelectTrigger>
        <SelectContent>
          {options.map((option: string) => (
            <SelectItem key={option} value={option} defaultValue={defaultValue}>
              {option.split("_").join(" ")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectOptions;
