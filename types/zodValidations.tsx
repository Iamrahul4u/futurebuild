import { JobPostSchema, UserSchema } from "@/prisma/generated/zod";
import { z } from "zod";

// Define the combined schema
export const UserWithJobsSchema = UserSchema.extend({
  postedJobs: z.array(z.object({ id: z.string() })),
});

export const JobPostSelect = JobPostSchema.extend({
  _count: z.object({ applicants: z.number() }).optional(),
});
// Type inference for UserWithJobs
export type UserWithJobs = z.infer<typeof UserWithJobsSchema>;
export type JobPostSelectType = z.infer<typeof JobPostSelect>;
