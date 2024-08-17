import {
  ApplicantSchema,
  JobPostSchema,
  LocationOptionalDefaultsSchema,
  LocationSchema,
  SkillOptionalDefaultsSchema,
  UserIncludeSchema,
  UserOptionalDefaultsSchema,
  UserSchema,
  UserSkillSchema,
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
export const UserWithSkillsAndAddress = UserOptionalDefaultsSchema.pick({
  firstName: true,
  secondName: true,
  email: true,
  about: true,
}).extend({
  skills: z.array(
    z.object({ skill: z.object({ name: z.string() }).nullable() }),
  ),
  address: z.array(LocationSchema.omit({ id: true })),
});
export type UserWithSkillsAndAddressTypes = z.infer<
  typeof UserWithSkillsAndAddress
>;

export const UserOnboardingSchema = UserOptionalDefaultsSchema.pick({
  firstName: true,
  secondName: true,
  email: true,
  about: true,
}).extend({
  skills: z.array(SkillOptionalDefaultsSchema.pick({ name: true })),
  address: z.array(LocationSchema.omit({ id: true })),
});

export type UserOnboardingSchemaTypes = z.infer<typeof UserOnboardingSchema>;
