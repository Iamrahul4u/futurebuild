import { z } from "zod";
import {
  ExperienceEnumSchema,
  ExperienceEnumType,
  JobTypeSchema,
  modeSchema,
  modeType,
} from "../prisma/generated/zod";

export interface getJobsProps {
  title: string;
  experience: ExperienceEnumType;
  maxSalary: number;
  minSalary: number;
  modeOfWork: modeType;
}
export const leftSidebarfilterProps = z.object({
  jobTitle: z
    .string()
    .min(2, "Type more than 2 Letters")
    .max(30, "Length shouldn't be more than 30 letters"),
  minSalary: z
    .number()
    .min(0, "Type more than 0")
    .max(30000000, "Length shouldn't be more than 30 letters"),
  maxSalary: z
    .number()
    .min(0, "Type more than 0")
    .max(30000000, "Length shouldn't be more than 30 letters"),
  whoCanApply: ExperienceEnumSchema,
  jobType: JobTypeSchema,
  modeOfWork: modeSchema,
});

export type leftSidebarfilterPropsTypes = z.infer<
  typeof leftSidebarfilterProps
>;
