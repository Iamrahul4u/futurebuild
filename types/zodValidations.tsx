import {
  ApplicantSchema,
  JobPostSchema,
  UserIncludeSchema,
  UserSchema,
} from "@/prisma/generated/zod";
import { z } from "zod";

// Define the combined schema
export const UserAppliedJobsWithJobDetails = ApplicantSchema.omit({
  id: true,
}).extend({
  jobPost: z.object({
    jobTitle: z.string(),
    organisationName: z.string(),
  }),
});

export type UserAppliedJobsWithJobDetailsType = z.infer<
  typeof UserAppliedJobsWithJobDetails
>;

export const UserWithJobsSchema = UserSchema.omit({
  hashedPassword: true,
}).extend({
  postedJobs: z.array(z.object({ id: z.string() })),
  appliedJobs: z.array(UserAppliedJobsWithJobDetails),
});

export const JobPostSelect = JobPostSchema.extend({
  _count: z.object({ applicants: z.number() }).optional() || z.object({}),
});
// Type inference for UserWithJobs
export type UserWithJobs = z.infer<typeof UserWithJobsSchema>;
export type JobPostSelectType = z.infer<typeof JobPostSelect>;
