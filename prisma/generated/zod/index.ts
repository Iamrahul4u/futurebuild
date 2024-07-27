import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const JobPostScalarFieldEnumSchema = z.enum(['id','jobTitle','jobDescription','organisationName','modeOfWork','minExperience','maxExperience','minSalary','maxSalary','jobType','postedAt','whoCanApply','userId']);

export const ApplicantScalarFieldEnumSchema = z.enum(['id','userId','coverLetter','availability','approvalStatus','jobId']);

export const UserScalarFieldEnumSchema = z.enum(['id','username','firstName','secondName','email','hashedPassword','createdAt','updatedAt','role','locationId']);

export const SkillScalarFieldEnumSchema = z.enum(['id','name','userId','jobPostId']);

export const PerkScalarFieldEnumSchema = z.enum(['id','name','jobPostId']);

export const MediaScalarFieldEnumSchema = z.enum(['id','mediaType','url','mediaName','userId','applicantId']);

export const SessionScalarFieldEnumSchema = z.enum(['id','userId','expiresAt']);

export const LocationScalarFieldEnumSchema = z.enum(['id','address','postalCode','cityId']);

export const CityScalarFieldEnumSchema = z.enum(['id','name','state']);

export const JobProfileScalarFieldEnumSchema = z.enum(['id','jobProfileName']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const ApprovalStatusSchema = z.enum(['Pending','Rejected','Accepted']);

export type ApprovalStatusType = `${z.infer<typeof ApprovalStatusSchema>}`

export const modeSchema = z.enum(['Remote','Hybrid']);

export type modeType = `${z.infer<typeof modeSchema>}`

export const RoleSchema = z.enum(['ADMIN','USER','ORGANIZATION']);

export type RoleType = `${z.infer<typeof RoleSchema>}`

export const ExperienceEnumSchema = z.enum(['Anyone','Fresher','Intermediate','Experienced']);

export type ExperienceEnumType = `${z.infer<typeof ExperienceEnumSchema>}`

export const JobTypeSchema = z.enum(['Full_Time','Part_Time','InternShip','Project_Work','Volunteering']);

export type JobTypeType = `${z.infer<typeof JobTypeSchema>}`

export const MediaNameSchema = z.enum(['Resume','Profile_Img']);

export type MediaNameType = `${z.infer<typeof MediaNameSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// JOB POST SCHEMA
/////////////////////////////////////////

export const JobPostSchema = z.object({
  modeOfWork: modeSchema.nullable(),
  jobType: JobTypeSchema,
  whoCanApply: ExperienceEnumSchema,
  id: z.string().cuid(),
  jobTitle: z.string(),
  jobDescription: z.string(),
  organisationName: z.string(),
  minExperience: z.coerce.number(),
  maxExperience: z.coerce.number(),
  minSalary: z.coerce.number(),
  maxSalary: z.coerce.number(),
  postedAt: z.coerce.date(),
  userId: z.string(),
})

export type JobPost = z.infer<typeof JobPostSchema>

// JOB POST OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const JobPostOptionalDefaultsSchema = JobPostSchema.merge(z.object({
  jobType: JobTypeSchema.optional(),
  whoCanApply: ExperienceEnumSchema.optional(),
  id: z.string().cuid().optional(),
  minExperience: z.coerce.number().optional(),
  minSalary: z.coerce.number().optional(),
  postedAt: z.coerce.date().optional(),
}))

export type JobPostOptionalDefaults = z.infer<typeof JobPostOptionalDefaultsSchema>

/////////////////////////////////////////
// APPLICANT SCHEMA
/////////////////////////////////////////

export const ApplicantSchema = z.object({
  approvalStatus: ApprovalStatusSchema,
  id: z.string().cuid(),
  userId: z.string(),
  coverLetter: z.string(),
  availability: z.string(),
  jobId: z.string(),
})

export type Applicant = z.infer<typeof ApplicantSchema>

// APPLICANT OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const ApplicantOptionalDefaultsSchema = ApplicantSchema.merge(z.object({
  approvalStatus: ApprovalStatusSchema.optional(),
  id: z.string().cuid().optional(),
}))

export type ApplicantOptionalDefaults = z.infer<typeof ApplicantOptionalDefaultsSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  role: RoleSchema,
  id: z.string().cuid(),
  username: z.string(),
  firstName: z.string(),
  secondName: z.string(),
  email: z.string(),
  hashedPassword: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  locationId: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>

// USER OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const UserOptionalDefaultsSchema = UserSchema.merge(z.object({
  role: RoleSchema.optional(),
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type UserOptionalDefaults = z.infer<typeof UserOptionalDefaultsSchema>

/////////////////////////////////////////
// SKILL SCHEMA
/////////////////////////////////////////

export const SkillSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  userId: z.string().nullable(),
  jobPostId: z.string().nullable(),
})

export type Skill = z.infer<typeof SkillSchema>

// SKILL OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const SkillOptionalDefaultsSchema = SkillSchema.merge(z.object({
  id: z.string().cuid().optional(),
}))

export type SkillOptionalDefaults = z.infer<typeof SkillOptionalDefaultsSchema>

/////////////////////////////////////////
// PERK SCHEMA
/////////////////////////////////////////

export const PerkSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  jobPostId: z.string().nullable(),
})

export type Perk = z.infer<typeof PerkSchema>

// PERK OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const PerkOptionalDefaultsSchema = PerkSchema.merge(z.object({
  id: z.string().cuid().optional(),
}))

export type PerkOptionalDefaults = z.infer<typeof PerkOptionalDefaultsSchema>

/////////////////////////////////////////
// MEDIA SCHEMA
/////////////////////////////////////////

export const MediaSchema = z.object({
  id: z.string().cuid(),
  mediaType: z.string(),
  url: z.string(),
  mediaName: z.string(),
  userId: z.string(),
  applicantId: z.string().nullable(),
})

export type Media = z.infer<typeof MediaSchema>

// MEDIA OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const MediaOptionalDefaultsSchema = MediaSchema.merge(z.object({
  id: z.string().cuid().optional(),
}))

export type MediaOptionalDefaults = z.infer<typeof MediaOptionalDefaultsSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  expiresAt: z.coerce.date(),
})

export type Session = z.infer<typeof SessionSchema>

// SESSION OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const SessionOptionalDefaultsSchema = SessionSchema.merge(z.object({
  id: z.string().cuid().optional(),
}))

export type SessionOptionalDefaults = z.infer<typeof SessionOptionalDefaultsSchema>

/////////////////////////////////////////
// LOCATION SCHEMA
/////////////////////////////////////////

export const LocationSchema = z.object({
  id: z.string().cuid(),
  address: z.string().nullable(),
  postalCode: z.number().int(),
  cityId: z.string(),
})

export type Location = z.infer<typeof LocationSchema>

// LOCATION OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const LocationOptionalDefaultsSchema = LocationSchema.merge(z.object({
  id: z.string().cuid().optional(),
}))

export type LocationOptionalDefaults = z.infer<typeof LocationOptionalDefaultsSchema>

/////////////////////////////////////////
// CITY SCHEMA
/////////////////////////////////////////

export const CitySchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  state: z.string(),
})

export type City = z.infer<typeof CitySchema>

// CITY OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const CityOptionalDefaultsSchema = CitySchema.merge(z.object({
  id: z.string().cuid().optional(),
}))

export type CityOptionalDefaults = z.infer<typeof CityOptionalDefaultsSchema>

/////////////////////////////////////////
// JOB PROFILE SCHEMA
/////////////////////////////////////////

export const JobProfileSchema = z.object({
  id: z.string().cuid(),
  jobProfileName: z.string(),
})

export type JobProfile = z.infer<typeof JobProfileSchema>

// JOB PROFILE OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const JobProfileOptionalDefaultsSchema = JobProfileSchema.merge(z.object({
  id: z.string().cuid().optional(),
}))

export type JobProfileOptionalDefaults = z.infer<typeof JobProfileOptionalDefaultsSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// JOB POST
//------------------------------------------------------

export const JobPostIncludeSchema: z.ZodType<Prisma.JobPostInclude> = z.object({
  skills: z.union([z.boolean(),z.lazy(() => SkillFindManyArgsSchema)]).optional(),
  perks: z.union([z.boolean(),z.lazy(() => PerkFindManyArgsSchema)]).optional(),
  applicants: z.union([z.boolean(),z.lazy(() => ApplicantFindManyArgsSchema)]).optional(),
  postedBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => JobPostCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const JobPostArgsSchema: z.ZodType<Prisma.JobPostDefaultArgs> = z.object({
  select: z.lazy(() => JobPostSelectSchema).optional(),
  include: z.lazy(() => JobPostIncludeSchema).optional(),
}).strict();

export const JobPostCountOutputTypeArgsSchema: z.ZodType<Prisma.JobPostCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => JobPostCountOutputTypeSelectSchema).nullish(),
}).strict();

export const JobPostCountOutputTypeSelectSchema: z.ZodType<Prisma.JobPostCountOutputTypeSelect> = z.object({
  skills: z.boolean().optional(),
  perks: z.boolean().optional(),
  applicants: z.boolean().optional(),
}).strict();

export const JobPostSelectSchema: z.ZodType<Prisma.JobPostSelect> = z.object({
  id: z.boolean().optional(),
  jobTitle: z.boolean().optional(),
  jobDescription: z.boolean().optional(),
  organisationName: z.boolean().optional(),
  modeOfWork: z.boolean().optional(),
  minExperience: z.boolean().optional(),
  maxExperience: z.boolean().optional(),
  minSalary: z.boolean().optional(),
  maxSalary: z.boolean().optional(),
  jobType: z.boolean().optional(),
  postedAt: z.boolean().optional(),
  whoCanApply: z.boolean().optional(),
  userId: z.boolean().optional(),
  skills: z.union([z.boolean(),z.lazy(() => SkillFindManyArgsSchema)]).optional(),
  perks: z.union([z.boolean(),z.lazy(() => PerkFindManyArgsSchema)]).optional(),
  applicants: z.union([z.boolean(),z.lazy(() => ApplicantFindManyArgsSchema)]).optional(),
  postedBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => JobPostCountOutputTypeArgsSchema)]).optional(),
}).strict()

// APPLICANT
//------------------------------------------------------

export const ApplicantIncludeSchema: z.ZodType<Prisma.ApplicantInclude> = z.object({
  resume: z.union([z.boolean(),z.lazy(() => MediaArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  jobPost: z.union([z.boolean(),z.lazy(() => JobPostArgsSchema)]).optional(),
}).strict()

export const ApplicantArgsSchema: z.ZodType<Prisma.ApplicantDefaultArgs> = z.object({
  select: z.lazy(() => ApplicantSelectSchema).optional(),
  include: z.lazy(() => ApplicantIncludeSchema).optional(),
}).strict();

export const ApplicantSelectSchema: z.ZodType<Prisma.ApplicantSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  coverLetter: z.boolean().optional(),
  availability: z.boolean().optional(),
  approvalStatus: z.boolean().optional(),
  jobId: z.boolean().optional(),
  resume: z.union([z.boolean(),z.lazy(() => MediaArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  jobPost: z.union([z.boolean(),z.lazy(() => JobPostArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  skills: z.union([z.boolean(),z.lazy(() => SkillFindManyArgsSchema)]).optional(),
  media: z.union([z.boolean(),z.lazy(() => MediaFindManyArgsSchema)]).optional(),
  address: z.union([z.boolean(),z.lazy(() => LocationArgsSchema)]).optional(),
  postedJobs: z.union([z.boolean(),z.lazy(() => JobPostFindManyArgsSchema)]).optional(),
  appliedJobs: z.union([z.boolean(),z.lazy(() => ApplicantFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  skills: z.boolean().optional(),
  media: z.boolean().optional(),
  postedJobs: z.boolean().optional(),
  appliedJobs: z.boolean().optional(),
  sessions: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  username: z.boolean().optional(),
  firstName: z.boolean().optional(),
  secondName: z.boolean().optional(),
  email: z.boolean().optional(),
  hashedPassword: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  role: z.boolean().optional(),
  locationId: z.boolean().optional(),
  skills: z.union([z.boolean(),z.lazy(() => SkillFindManyArgsSchema)]).optional(),
  media: z.union([z.boolean(),z.lazy(() => MediaFindManyArgsSchema)]).optional(),
  address: z.union([z.boolean(),z.lazy(() => LocationArgsSchema)]).optional(),
  postedJobs: z.union([z.boolean(),z.lazy(() => JobPostFindManyArgsSchema)]).optional(),
  appliedJobs: z.union([z.boolean(),z.lazy(() => ApplicantFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SKILL
//------------------------------------------------------

export const SkillIncludeSchema: z.ZodType<Prisma.SkillInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  JobPost: z.union([z.boolean(),z.lazy(() => JobPostArgsSchema)]).optional(),
}).strict()

export const SkillArgsSchema: z.ZodType<Prisma.SkillDefaultArgs> = z.object({
  select: z.lazy(() => SkillSelectSchema).optional(),
  include: z.lazy(() => SkillIncludeSchema).optional(),
}).strict();

export const SkillSelectSchema: z.ZodType<Prisma.SkillSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  userId: z.boolean().optional(),
  jobPostId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  JobPost: z.union([z.boolean(),z.lazy(() => JobPostArgsSchema)]).optional(),
}).strict()

// PERK
//------------------------------------------------------

export const PerkIncludeSchema: z.ZodType<Prisma.PerkInclude> = z.object({
  JobPost: z.union([z.boolean(),z.lazy(() => JobPostArgsSchema)]).optional(),
}).strict()

export const PerkArgsSchema: z.ZodType<Prisma.PerkDefaultArgs> = z.object({
  select: z.lazy(() => PerkSelectSchema).optional(),
  include: z.lazy(() => PerkIncludeSchema).optional(),
}).strict();

export const PerkSelectSchema: z.ZodType<Prisma.PerkSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  jobPostId: z.boolean().optional(),
  JobPost: z.union([z.boolean(),z.lazy(() => JobPostArgsSchema)]).optional(),
}).strict()

// MEDIA
//------------------------------------------------------

export const MediaIncludeSchema: z.ZodType<Prisma.MediaInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  applicant: z.union([z.boolean(),z.lazy(() => ApplicantArgsSchema)]).optional(),
}).strict()

export const MediaArgsSchema: z.ZodType<Prisma.MediaDefaultArgs> = z.object({
  select: z.lazy(() => MediaSelectSchema).optional(),
  include: z.lazy(() => MediaIncludeSchema).optional(),
}).strict();

export const MediaSelectSchema: z.ZodType<Prisma.MediaSelect> = z.object({
  id: z.boolean().optional(),
  mediaType: z.boolean().optional(),
  url: z.boolean().optional(),
  mediaName: z.boolean().optional(),
  userId: z.boolean().optional(),
  applicantId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  applicant: z.union([z.boolean(),z.lazy(() => ApplicantArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// LOCATION
//------------------------------------------------------

export const LocationIncludeSchema: z.ZodType<Prisma.LocationInclude> = z.object({
  User: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  city: z.union([z.boolean(),z.lazy(() => CityArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => LocationCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const LocationArgsSchema: z.ZodType<Prisma.LocationDefaultArgs> = z.object({
  select: z.lazy(() => LocationSelectSchema).optional(),
  include: z.lazy(() => LocationIncludeSchema).optional(),
}).strict();

export const LocationCountOutputTypeArgsSchema: z.ZodType<Prisma.LocationCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => LocationCountOutputTypeSelectSchema).nullish(),
}).strict();

export const LocationCountOutputTypeSelectSchema: z.ZodType<Prisma.LocationCountOutputTypeSelect> = z.object({
  User: z.boolean().optional(),
}).strict();

export const LocationSelectSchema: z.ZodType<Prisma.LocationSelect> = z.object({
  id: z.boolean().optional(),
  address: z.boolean().optional(),
  postalCode: z.boolean().optional(),
  cityId: z.boolean().optional(),
  User: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  city: z.union([z.boolean(),z.lazy(() => CityArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => LocationCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CITY
//------------------------------------------------------

export const CityIncludeSchema: z.ZodType<Prisma.CityInclude> = z.object({
  location: z.union([z.boolean(),z.lazy(() => LocationFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CityCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CityArgsSchema: z.ZodType<Prisma.CityDefaultArgs> = z.object({
  select: z.lazy(() => CitySelectSchema).optional(),
  include: z.lazy(() => CityIncludeSchema).optional(),
}).strict();

export const CityCountOutputTypeArgsSchema: z.ZodType<Prisma.CityCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CityCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CityCountOutputTypeSelectSchema: z.ZodType<Prisma.CityCountOutputTypeSelect> = z.object({
  location: z.boolean().optional(),
}).strict();

export const CitySelectSchema: z.ZodType<Prisma.CitySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  state: z.boolean().optional(),
  location: z.union([z.boolean(),z.lazy(() => LocationFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CityCountOutputTypeArgsSchema)]).optional(),
}).strict()

// JOB PROFILE
//------------------------------------------------------

export const JobProfileSelectSchema: z.ZodType<Prisma.JobProfileSelect> = z.object({
  id: z.boolean().optional(),
  jobProfileName: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const JobPostWhereInputSchema: z.ZodType<Prisma.JobPostWhereInput> = z.object({
  AND: z.union([ z.lazy(() => JobPostWhereInputSchema),z.lazy(() => JobPostWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => JobPostWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JobPostWhereInputSchema),z.lazy(() => JobPostWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  jobTitle: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  jobDescription: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  organisationName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  modeOfWork: z.union([ z.lazy(() => EnummodeNullableFilterSchema),z.lazy(() => modeSchema) ]).optional().nullable(),
  minExperience: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  maxExperience: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  minSalary: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  maxSalary: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  jobType: z.union([ z.lazy(() => EnumJobTypeFilterSchema),z.lazy(() => JobTypeSchema) ]).optional(),
  postedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  whoCanApply: z.union([ z.lazy(() => EnumExperienceEnumFilterSchema),z.lazy(() => ExperienceEnumSchema) ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  skills: z.lazy(() => SkillListRelationFilterSchema).optional(),
  perks: z.lazy(() => PerkListRelationFilterSchema).optional(),
  applicants: z.lazy(() => ApplicantListRelationFilterSchema).optional(),
  postedBy: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const JobPostOrderByWithRelationInputSchema: z.ZodType<Prisma.JobPostOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  jobTitle: z.lazy(() => SortOrderSchema).optional(),
  jobDescription: z.lazy(() => SortOrderSchema).optional(),
  organisationName: z.lazy(() => SortOrderSchema).optional(),
  modeOfWork: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  minExperience: z.lazy(() => SortOrderSchema).optional(),
  maxExperience: z.lazy(() => SortOrderSchema).optional(),
  minSalary: z.lazy(() => SortOrderSchema).optional(),
  maxSalary: z.lazy(() => SortOrderSchema).optional(),
  jobType: z.lazy(() => SortOrderSchema).optional(),
  postedAt: z.lazy(() => SortOrderSchema).optional(),
  whoCanApply: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  skills: z.lazy(() => SkillOrderByRelationAggregateInputSchema).optional(),
  perks: z.lazy(() => PerkOrderByRelationAggregateInputSchema).optional(),
  applicants: z.lazy(() => ApplicantOrderByRelationAggregateInputSchema).optional(),
  postedBy: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const JobPostWhereUniqueInputSchema: z.ZodType<Prisma.JobPostWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => JobPostWhereInputSchema),z.lazy(() => JobPostWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => JobPostWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JobPostWhereInputSchema),z.lazy(() => JobPostWhereInputSchema).array() ]).optional(),
  jobTitle: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  jobDescription: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  organisationName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  modeOfWork: z.union([ z.lazy(() => EnummodeNullableFilterSchema),z.lazy(() => modeSchema) ]).optional().nullable(),
  minExperience: z.union([ z.lazy(() => IntFilterSchema),z.coerce.number() ]).optional(),
  maxExperience: z.union([ z.lazy(() => IntFilterSchema),z.coerce.number() ]).optional(),
  minSalary: z.union([ z.lazy(() => IntFilterSchema),z.coerce.number() ]).optional(),
  maxSalary: z.union([ z.lazy(() => IntFilterSchema),z.coerce.number() ]).optional(),
  jobType: z.union([ z.lazy(() => EnumJobTypeFilterSchema),z.lazy(() => JobTypeSchema) ]).optional(),
  postedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  whoCanApply: z.union([ z.lazy(() => EnumExperienceEnumFilterSchema),z.lazy(() => ExperienceEnumSchema) ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  skills: z.lazy(() => SkillListRelationFilterSchema).optional(),
  perks: z.lazy(() => PerkListRelationFilterSchema).optional(),
  applicants: z.lazy(() => ApplicantListRelationFilterSchema).optional(),
  postedBy: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const JobPostOrderByWithAggregationInputSchema: z.ZodType<Prisma.JobPostOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  jobTitle: z.lazy(() => SortOrderSchema).optional(),
  jobDescription: z.lazy(() => SortOrderSchema).optional(),
  organisationName: z.lazy(() => SortOrderSchema).optional(),
  modeOfWork: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  minExperience: z.lazy(() => SortOrderSchema).optional(),
  maxExperience: z.lazy(() => SortOrderSchema).optional(),
  minSalary: z.lazy(() => SortOrderSchema).optional(),
  maxSalary: z.lazy(() => SortOrderSchema).optional(),
  jobType: z.lazy(() => SortOrderSchema).optional(),
  postedAt: z.lazy(() => SortOrderSchema).optional(),
  whoCanApply: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => JobPostCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => JobPostAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => JobPostMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => JobPostMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => JobPostSumOrderByAggregateInputSchema).optional()
}).strict();

export const JobPostScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.JobPostScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => JobPostScalarWhereWithAggregatesInputSchema),z.lazy(() => JobPostScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => JobPostScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JobPostScalarWhereWithAggregatesInputSchema),z.lazy(() => JobPostScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  jobTitle: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  jobDescription: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  organisationName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  modeOfWork: z.union([ z.lazy(() => EnummodeNullableWithAggregatesFilterSchema),z.lazy(() => modeSchema) ]).optional().nullable(),
  minExperience: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  maxExperience: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  minSalary: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  maxSalary: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  jobType: z.union([ z.lazy(() => EnumJobTypeWithAggregatesFilterSchema),z.lazy(() => JobTypeSchema) ]).optional(),
  postedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  whoCanApply: z.union([ z.lazy(() => EnumExperienceEnumWithAggregatesFilterSchema),z.lazy(() => ExperienceEnumSchema) ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ApplicantWhereInputSchema: z.ZodType<Prisma.ApplicantWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ApplicantWhereInputSchema),z.lazy(() => ApplicantWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ApplicantWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ApplicantWhereInputSchema),z.lazy(() => ApplicantWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  coverLetter: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  availability: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  approvalStatus: z.union([ z.lazy(() => EnumApprovalStatusFilterSchema),z.lazy(() => ApprovalStatusSchema) ]).optional(),
  jobId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  resume: z.union([ z.lazy(() => MediaNullableRelationFilterSchema),z.lazy(() => MediaWhereInputSchema) ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  jobPost: z.union([ z.lazy(() => JobPostRelationFilterSchema),z.lazy(() => JobPostWhereInputSchema) ]).optional(),
}).strict();

export const ApplicantOrderByWithRelationInputSchema: z.ZodType<Prisma.ApplicantOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  coverLetter: z.lazy(() => SortOrderSchema).optional(),
  availability: z.lazy(() => SortOrderSchema).optional(),
  approvalStatus: z.lazy(() => SortOrderSchema).optional(),
  jobId: z.lazy(() => SortOrderSchema).optional(),
  resume: z.lazy(() => MediaOrderByWithRelationInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  jobPost: z.lazy(() => JobPostOrderByWithRelationInputSchema).optional()
}).strict();

export const ApplicantWhereUniqueInputSchema: z.ZodType<Prisma.ApplicantWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => ApplicantWhereInputSchema),z.lazy(() => ApplicantWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ApplicantWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ApplicantWhereInputSchema),z.lazy(() => ApplicantWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  coverLetter: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  availability: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  approvalStatus: z.union([ z.lazy(() => EnumApprovalStatusFilterSchema),z.lazy(() => ApprovalStatusSchema) ]).optional(),
  jobId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  resume: z.union([ z.lazy(() => MediaNullableRelationFilterSchema),z.lazy(() => MediaWhereInputSchema) ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  jobPost: z.union([ z.lazy(() => JobPostRelationFilterSchema),z.lazy(() => JobPostWhereInputSchema) ]).optional(),
}).strict());

export const ApplicantOrderByWithAggregationInputSchema: z.ZodType<Prisma.ApplicantOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  coverLetter: z.lazy(() => SortOrderSchema).optional(),
  availability: z.lazy(() => SortOrderSchema).optional(),
  approvalStatus: z.lazy(() => SortOrderSchema).optional(),
  jobId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ApplicantCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ApplicantMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ApplicantMinOrderByAggregateInputSchema).optional()
}).strict();

export const ApplicantScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ApplicantScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ApplicantScalarWhereWithAggregatesInputSchema),z.lazy(() => ApplicantScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ApplicantScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ApplicantScalarWhereWithAggregatesInputSchema),z.lazy(() => ApplicantScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  coverLetter: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  availability: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  approvalStatus: z.union([ z.lazy(() => EnumApprovalStatusWithAggregatesFilterSchema),z.lazy(() => ApprovalStatusSchema) ]).optional(),
  jobId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  secondName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hashedPassword: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  locationId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  skills: z.lazy(() => SkillListRelationFilterSchema).optional(),
  media: z.lazy(() => MediaListRelationFilterSchema).optional(),
  address: z.union([ z.lazy(() => LocationNullableRelationFilterSchema),z.lazy(() => LocationWhereInputSchema) ]).optional().nullable(),
  postedJobs: z.lazy(() => JobPostListRelationFilterSchema).optional(),
  appliedJobs: z.lazy(() => ApplicantListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  secondName: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  hashedPassword: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  locationId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  skills: z.lazy(() => SkillOrderByRelationAggregateInputSchema).optional(),
  media: z.lazy(() => MediaOrderByRelationAggregateInputSchema).optional(),
  address: z.lazy(() => LocationOrderByWithRelationInputSchema).optional(),
  postedJobs: z.lazy(() => JobPostOrderByRelationAggregateInputSchema).optional(),
  appliedJobs: z.lazy(() => ApplicantOrderByRelationAggregateInputSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    email: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  username: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  secondName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hashedPassword: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  locationId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  skills: z.lazy(() => SkillListRelationFilterSchema).optional(),
  media: z.lazy(() => MediaListRelationFilterSchema).optional(),
  address: z.union([ z.lazy(() => LocationNullableRelationFilterSchema),z.lazy(() => LocationWhereInputSchema) ]).optional().nullable(),
  postedJobs: z.lazy(() => JobPostListRelationFilterSchema).optional(),
  appliedJobs: z.lazy(() => ApplicantListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  secondName: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  hashedPassword: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  locationId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  secondName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  hashedPassword: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleWithAggregatesFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  locationId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SkillWhereInputSchema: z.ZodType<Prisma.SkillWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SkillWhereInputSchema),z.lazy(() => SkillWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SkillWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SkillWhereInputSchema),z.lazy(() => SkillWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  jobPostId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  JobPost: z.union([ z.lazy(() => JobPostNullableRelationFilterSchema),z.lazy(() => JobPostWhereInputSchema) ]).optional().nullable(),
}).strict();

export const SkillOrderByWithRelationInputSchema: z.ZodType<Prisma.SkillOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  jobPostId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  JobPost: z.lazy(() => JobPostOrderByWithRelationInputSchema).optional()
}).strict();

export const SkillWhereUniqueInputSchema: z.ZodType<Prisma.SkillWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => SkillWhereInputSchema),z.lazy(() => SkillWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SkillWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SkillWhereInputSchema),z.lazy(() => SkillWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  jobPostId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  JobPost: z.union([ z.lazy(() => JobPostNullableRelationFilterSchema),z.lazy(() => JobPostWhereInputSchema) ]).optional().nullable(),
}).strict());

export const SkillOrderByWithAggregationInputSchema: z.ZodType<Prisma.SkillOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  jobPostId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => SkillCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SkillMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SkillMinOrderByAggregateInputSchema).optional()
}).strict();

export const SkillScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SkillScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SkillScalarWhereWithAggregatesInputSchema),z.lazy(() => SkillScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SkillScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SkillScalarWhereWithAggregatesInputSchema),z.lazy(() => SkillScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  jobPostId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const PerkWhereInputSchema: z.ZodType<Prisma.PerkWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PerkWhereInputSchema),z.lazy(() => PerkWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PerkWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PerkWhereInputSchema),z.lazy(() => PerkWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  jobPostId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  JobPost: z.union([ z.lazy(() => JobPostNullableRelationFilterSchema),z.lazy(() => JobPostWhereInputSchema) ]).optional().nullable(),
}).strict();

export const PerkOrderByWithRelationInputSchema: z.ZodType<Prisma.PerkOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  jobPostId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  JobPost: z.lazy(() => JobPostOrderByWithRelationInputSchema).optional()
}).strict();

export const PerkWhereUniqueInputSchema: z.ZodType<Prisma.PerkWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => PerkWhereInputSchema),z.lazy(() => PerkWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PerkWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PerkWhereInputSchema),z.lazy(() => PerkWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  jobPostId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  JobPost: z.union([ z.lazy(() => JobPostNullableRelationFilterSchema),z.lazy(() => JobPostWhereInputSchema) ]).optional().nullable(),
}).strict());

export const PerkOrderByWithAggregationInputSchema: z.ZodType<Prisma.PerkOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  jobPostId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => PerkCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PerkMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PerkMinOrderByAggregateInputSchema).optional()
}).strict();

export const PerkScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PerkScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PerkScalarWhereWithAggregatesInputSchema),z.lazy(() => PerkScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PerkScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PerkScalarWhereWithAggregatesInputSchema),z.lazy(() => PerkScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  jobPostId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const MediaWhereInputSchema: z.ZodType<Prisma.MediaWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MediaWhereInputSchema),z.lazy(() => MediaWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MediaWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MediaWhereInputSchema),z.lazy(() => MediaWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  mediaType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  mediaName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  applicantId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  applicant: z.union([ z.lazy(() => ApplicantNullableRelationFilterSchema),z.lazy(() => ApplicantWhereInputSchema) ]).optional().nullable(),
}).strict();

export const MediaOrderByWithRelationInputSchema: z.ZodType<Prisma.MediaOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  mediaType: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  mediaName: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  applicantId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  applicant: z.lazy(() => ApplicantOrderByWithRelationInputSchema).optional()
}).strict();

export const MediaWhereUniqueInputSchema: z.ZodType<Prisma.MediaWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    applicantId: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    applicantId: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  applicantId: z.string().optional(),
  AND: z.union([ z.lazy(() => MediaWhereInputSchema),z.lazy(() => MediaWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MediaWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MediaWhereInputSchema),z.lazy(() => MediaWhereInputSchema).array() ]).optional(),
  mediaType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  mediaName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  applicant: z.union([ z.lazy(() => ApplicantNullableRelationFilterSchema),z.lazy(() => ApplicantWhereInputSchema) ]).optional().nullable(),
}).strict());

export const MediaOrderByWithAggregationInputSchema: z.ZodType<Prisma.MediaOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  mediaType: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  mediaName: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  applicantId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => MediaCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MediaMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MediaMinOrderByAggregateInputSchema).optional()
}).strict();

export const MediaScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MediaScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MediaScalarWhereWithAggregatesInputSchema),z.lazy(() => MediaScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MediaScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MediaScalarWhereWithAggregatesInputSchema),z.lazy(() => MediaScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  mediaType: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  mediaName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  applicantId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional()
}).strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const LocationWhereInputSchema: z.ZodType<Prisma.LocationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LocationWhereInputSchema),z.lazy(() => LocationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LocationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LocationWhereInputSchema),z.lazy(() => LocationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  postalCode: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  cityId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  User: z.lazy(() => UserListRelationFilterSchema).optional(),
  city: z.union([ z.lazy(() => CityRelationFilterSchema),z.lazy(() => CityWhereInputSchema) ]).optional(),
}).strict();

export const LocationOrderByWithRelationInputSchema: z.ZodType<Prisma.LocationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  address: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  postalCode: z.lazy(() => SortOrderSchema).optional(),
  cityId: z.lazy(() => SortOrderSchema).optional(),
  User: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional(),
  city: z.lazy(() => CityOrderByWithRelationInputSchema).optional()
}).strict();

export const LocationWhereUniqueInputSchema: z.ZodType<Prisma.LocationWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => LocationWhereInputSchema),z.lazy(() => LocationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LocationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LocationWhereInputSchema),z.lazy(() => LocationWhereInputSchema).array() ]).optional(),
  address: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  postalCode: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  cityId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  User: z.lazy(() => UserListRelationFilterSchema).optional(),
  city: z.union([ z.lazy(() => CityRelationFilterSchema),z.lazy(() => CityWhereInputSchema) ]).optional(),
}).strict());

export const LocationOrderByWithAggregationInputSchema: z.ZodType<Prisma.LocationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  address: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  postalCode: z.lazy(() => SortOrderSchema).optional(),
  cityId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => LocationCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => LocationAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LocationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LocationMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => LocationSumOrderByAggregateInputSchema).optional()
}).strict();

export const LocationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LocationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => LocationScalarWhereWithAggregatesInputSchema),z.lazy(() => LocationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LocationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LocationScalarWhereWithAggregatesInputSchema),z.lazy(() => LocationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  postalCode: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  cityId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const CityWhereInputSchema: z.ZodType<Prisma.CityWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CityWhereInputSchema),z.lazy(() => CityWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CityWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CityWhereInputSchema),z.lazy(() => CityWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  state: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  location: z.lazy(() => LocationListRelationFilterSchema).optional()
}).strict();

export const CityOrderByWithRelationInputSchema: z.ZodType<Prisma.CityOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => LocationOrderByRelationAggregateInputSchema).optional()
}).strict();

export const CityWhereUniqueInputSchema: z.ZodType<Prisma.CityWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => CityWhereInputSchema),z.lazy(() => CityWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CityWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CityWhereInputSchema),z.lazy(() => CityWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  state: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  location: z.lazy(() => LocationListRelationFilterSchema).optional()
}).strict());

export const CityOrderByWithAggregationInputSchema: z.ZodType<Prisma.CityOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CityCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CityMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CityMinOrderByAggregateInputSchema).optional()
}).strict();

export const CityScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CityScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CityScalarWhereWithAggregatesInputSchema),z.lazy(() => CityScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CityScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CityScalarWhereWithAggregatesInputSchema),z.lazy(() => CityScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  state: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const JobProfileWhereInputSchema: z.ZodType<Prisma.JobProfileWhereInput> = z.object({
  AND: z.union([ z.lazy(() => JobProfileWhereInputSchema),z.lazy(() => JobProfileWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => JobProfileWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JobProfileWhereInputSchema),z.lazy(() => JobProfileWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  jobProfileName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const JobProfileOrderByWithRelationInputSchema: z.ZodType<Prisma.JobProfileOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  jobProfileName: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JobProfileWhereUniqueInputSchema: z.ZodType<Prisma.JobProfileWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => JobProfileWhereInputSchema),z.lazy(() => JobProfileWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => JobProfileWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JobProfileWhereInputSchema),z.lazy(() => JobProfileWhereInputSchema).array() ]).optional(),
  jobProfileName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict());

export const JobProfileOrderByWithAggregationInputSchema: z.ZodType<Prisma.JobProfileOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  jobProfileName: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => JobProfileCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => JobProfileMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => JobProfileMinOrderByAggregateInputSchema).optional()
}).strict();

export const JobProfileScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.JobProfileScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => JobProfileScalarWhereWithAggregatesInputSchema),z.lazy(() => JobProfileScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => JobProfileScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JobProfileScalarWhereWithAggregatesInputSchema),z.lazy(() => JobProfileScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  jobProfileName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const JobPostCreateInputSchema: z.ZodType<Prisma.JobPostCreateInput> = z.object({
  id: z.string().cuid().optional(),
  jobTitle: z.string(),
  jobDescription: z.string(),
  organisationName: z.string(),
  modeOfWork: z.lazy(() => modeSchema).optional().nullable(),
  minExperience: z.coerce.number().optional(),
  maxExperience: z.coerce.number(),
  minSalary: z.coerce.number().optional(),
  maxSalary: z.coerce.number(),
  jobType: z.lazy(() => JobTypeSchema).optional(),
  postedAt: z.coerce.date().optional(),
  whoCanApply: z.lazy(() => ExperienceEnumSchema).optional(),
  skills: z.lazy(() => SkillCreateNestedManyWithoutJobPostInputSchema).optional(),
  perks: z.lazy(() => PerkCreateNestedManyWithoutJobPostInputSchema).optional(),
  applicants: z.lazy(() => ApplicantCreateNestedManyWithoutJobPostInputSchema).optional(),
  postedBy: z.lazy(() => UserCreateNestedOneWithoutPostedJobsInputSchema)
}).strict();

export const JobPostUncheckedCreateInputSchema: z.ZodType<Prisma.JobPostUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  jobTitle: z.string(),
  jobDescription: z.string(),
  organisationName: z.string(),
  modeOfWork: z.lazy(() => modeSchema).optional().nullable(),
  minExperience: z.coerce.number().optional(),
  maxExperience: z.coerce.number(),
  minSalary: z.coerce.number().optional(),
  maxSalary: z.coerce.number(),
  jobType: z.lazy(() => JobTypeSchema).optional(),
  postedAt: z.coerce.date().optional(),
  whoCanApply: z.lazy(() => ExperienceEnumSchema).optional(),
  userId: z.string(),
  skills: z.lazy(() => SkillUncheckedCreateNestedManyWithoutJobPostInputSchema).optional(),
  perks: z.lazy(() => PerkUncheckedCreateNestedManyWithoutJobPostInputSchema).optional(),
  applicants: z.lazy(() => ApplicantUncheckedCreateNestedManyWithoutJobPostInputSchema).optional()
}).strict();

export const JobPostUpdateInputSchema: z.ZodType<Prisma.JobPostUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  organisationName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modeOfWork: z.union([ z.lazy(() => modeSchema),z.lazy(() => NullableEnummodeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minExperience: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  maxExperience: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  minSalary: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  maxSalary: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jobType: z.union([ z.lazy(() => JobTypeSchema),z.lazy(() => EnumJobTypeFieldUpdateOperationsInputSchema) ]).optional(),
  postedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  whoCanApply: z.union([ z.lazy(() => ExperienceEnumSchema),z.lazy(() => EnumExperienceEnumFieldUpdateOperationsInputSchema) ]).optional(),
  skills: z.lazy(() => SkillUpdateManyWithoutJobPostNestedInputSchema).optional(),
  perks: z.lazy(() => PerkUpdateManyWithoutJobPostNestedInputSchema).optional(),
  applicants: z.lazy(() => ApplicantUpdateManyWithoutJobPostNestedInputSchema).optional(),
  postedBy: z.lazy(() => UserUpdateOneRequiredWithoutPostedJobsNestedInputSchema).optional()
}).strict();

export const JobPostUncheckedUpdateInputSchema: z.ZodType<Prisma.JobPostUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  organisationName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modeOfWork: z.union([ z.lazy(() => modeSchema),z.lazy(() => NullableEnummodeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minExperience: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  maxExperience: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  minSalary: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  maxSalary: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jobType: z.union([ z.lazy(() => JobTypeSchema),z.lazy(() => EnumJobTypeFieldUpdateOperationsInputSchema) ]).optional(),
  postedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  whoCanApply: z.union([ z.lazy(() => ExperienceEnumSchema),z.lazy(() => EnumExperienceEnumFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  skills: z.lazy(() => SkillUncheckedUpdateManyWithoutJobPostNestedInputSchema).optional(),
  perks: z.lazy(() => PerkUncheckedUpdateManyWithoutJobPostNestedInputSchema).optional(),
  applicants: z.lazy(() => ApplicantUncheckedUpdateManyWithoutJobPostNestedInputSchema).optional()
}).strict();

export const JobPostCreateManyInputSchema: z.ZodType<Prisma.JobPostCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  jobTitle: z.string(),
  jobDescription: z.string(),
  organisationName: z.string(),
  modeOfWork: z.lazy(() => modeSchema).optional().nullable(),
  minExperience: z.coerce.number().optional(),
  maxExperience: z.coerce.number(),
  minSalary: z.coerce.number().optional(),
  maxSalary: z.coerce.number(),
  jobType: z.lazy(() => JobTypeSchema).optional(),
  postedAt: z.coerce.date().optional(),
  whoCanApply: z.lazy(() => ExperienceEnumSchema).optional(),
  userId: z.string()
}).strict();

export const JobPostUpdateManyMutationInputSchema: z.ZodType<Prisma.JobPostUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  organisationName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modeOfWork: z.union([ z.lazy(() => modeSchema),z.lazy(() => NullableEnummodeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minExperience: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  maxExperience: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  minSalary: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  maxSalary: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jobType: z.union([ z.lazy(() => JobTypeSchema),z.lazy(() => EnumJobTypeFieldUpdateOperationsInputSchema) ]).optional(),
  postedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  whoCanApply: z.union([ z.lazy(() => ExperienceEnumSchema),z.lazy(() => EnumExperienceEnumFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const JobPostUncheckedUpdateManyInputSchema: z.ZodType<Prisma.JobPostUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  organisationName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modeOfWork: z.union([ z.lazy(() => modeSchema),z.lazy(() => NullableEnummodeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minExperience: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  maxExperience: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  minSalary: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  maxSalary: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jobType: z.union([ z.lazy(() => JobTypeSchema),z.lazy(() => EnumJobTypeFieldUpdateOperationsInputSchema) ]).optional(),
  postedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  whoCanApply: z.union([ z.lazy(() => ExperienceEnumSchema),z.lazy(() => EnumExperienceEnumFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ApplicantCreateInputSchema: z.ZodType<Prisma.ApplicantCreateInput> = z.object({
  id: z.string().cuid().optional(),
  coverLetter: z.string(),
  availability: z.string(),
  approvalStatus: z.lazy(() => ApprovalStatusSchema).optional(),
  resume: z.lazy(() => MediaCreateNestedOneWithoutApplicantInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAppliedJobsInputSchema),
  jobPost: z.lazy(() => JobPostCreateNestedOneWithoutApplicantsInputSchema)
}).strict();

export const ApplicantUncheckedCreateInputSchema: z.ZodType<Prisma.ApplicantUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  coverLetter: z.string(),
  availability: z.string(),
  approvalStatus: z.lazy(() => ApprovalStatusSchema).optional(),
  jobId: z.string(),
  resume: z.lazy(() => MediaUncheckedCreateNestedOneWithoutApplicantInputSchema).optional()
}).strict();

export const ApplicantUpdateInputSchema: z.ZodType<Prisma.ApplicantUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coverLetter: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  availability: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  approvalStatus: z.union([ z.lazy(() => ApprovalStatusSchema),z.lazy(() => EnumApprovalStatusFieldUpdateOperationsInputSchema) ]).optional(),
  resume: z.lazy(() => MediaUpdateOneWithoutApplicantNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAppliedJobsNestedInputSchema).optional(),
  jobPost: z.lazy(() => JobPostUpdateOneRequiredWithoutApplicantsNestedInputSchema).optional()
}).strict();

export const ApplicantUncheckedUpdateInputSchema: z.ZodType<Prisma.ApplicantUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coverLetter: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  availability: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  approvalStatus: z.union([ z.lazy(() => ApprovalStatusSchema),z.lazy(() => EnumApprovalStatusFieldUpdateOperationsInputSchema) ]).optional(),
  jobId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  resume: z.lazy(() => MediaUncheckedUpdateOneWithoutApplicantNestedInputSchema).optional()
}).strict();

export const ApplicantCreateManyInputSchema: z.ZodType<Prisma.ApplicantCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  coverLetter: z.string(),
  availability: z.string(),
  approvalStatus: z.lazy(() => ApprovalStatusSchema).optional(),
  jobId: z.string()
}).strict();

export const ApplicantUpdateManyMutationInputSchema: z.ZodType<Prisma.ApplicantUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coverLetter: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  availability: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  approvalStatus: z.union([ z.lazy(() => ApprovalStatusSchema),z.lazy(() => EnumApprovalStatusFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ApplicantUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ApplicantUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coverLetter: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  availability: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  approvalStatus: z.union([ z.lazy(() => ApprovalStatusSchema),z.lazy(() => EnumApprovalStatusFieldUpdateOperationsInputSchema) ]).optional(),
  jobId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  username: z.string(),
  firstName: z.string(),
  secondName: z.string(),
  email: z.string(),
  hashedPassword: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  skills: z.lazy(() => SkillCreateNestedManyWithoutUserInputSchema).optional(),
  media: z.lazy(() => MediaCreateNestedManyWithoutUserInputSchema).optional(),
  address: z.lazy(() => LocationCreateNestedOneWithoutUserInputSchema).optional(),
  postedJobs: z.lazy(() => JobPostCreateNestedManyWithoutPostedByInputSchema).optional(),
  appliedJobs: z.lazy(() => ApplicantCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  username: z.string(),
  firstName: z.string(),
  secondName: z.string(),
  email: z.string(),
  hashedPassword: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  locationId: z.string().optional().nullable(),
  skills: z.lazy(() => SkillUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  media: z.lazy(() => MediaUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  postedJobs: z.lazy(() => JobPostUncheckedCreateNestedManyWithoutPostedByInputSchema).optional(),
  appliedJobs: z.lazy(() => ApplicantUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  secondName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  skills: z.lazy(() => SkillUpdateManyWithoutUserNestedInputSchema).optional(),
  media: z.lazy(() => MediaUpdateManyWithoutUserNestedInputSchema).optional(),
  address: z.lazy(() => LocationUpdateOneWithoutUserNestedInputSchema).optional(),
  postedJobs: z.lazy(() => JobPostUpdateManyWithoutPostedByNestedInputSchema).optional(),
  appliedJobs: z.lazy(() => ApplicantUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  secondName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  locationId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skills: z.lazy(() => SkillUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  media: z.lazy(() => MediaUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  postedJobs: z.lazy(() => JobPostUncheckedUpdateManyWithoutPostedByNestedInputSchema).optional(),
  appliedJobs: z.lazy(() => ApplicantUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  username: z.string(),
  firstName: z.string(),
  secondName: z.string(),
  email: z.string(),
  hashedPassword: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  locationId: z.string().optional().nullable()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  secondName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  secondName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  locationId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SkillCreateInputSchema: z.ZodType<Prisma.SkillCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutSkillsInputSchema).optional(),
  JobPost: z.lazy(() => JobPostCreateNestedOneWithoutSkillsInputSchema).optional()
}).strict();

export const SkillUncheckedCreateInputSchema: z.ZodType<Prisma.SkillUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  userId: z.string().optional().nullable(),
  jobPostId: z.string().optional().nullable()
}).strict();

export const SkillUpdateInputSchema: z.ZodType<Prisma.SkillUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutSkillsNestedInputSchema).optional(),
  JobPost: z.lazy(() => JobPostUpdateOneWithoutSkillsNestedInputSchema).optional()
}).strict();

export const SkillUncheckedUpdateInputSchema: z.ZodType<Prisma.SkillUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  jobPostId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SkillCreateManyInputSchema: z.ZodType<Prisma.SkillCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  userId: z.string().optional().nullable(),
  jobPostId: z.string().optional().nullable()
}).strict();

export const SkillUpdateManyMutationInputSchema: z.ZodType<Prisma.SkillUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SkillUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SkillUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  jobPostId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PerkCreateInputSchema: z.ZodType<Prisma.PerkCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  JobPost: z.lazy(() => JobPostCreateNestedOneWithoutPerksInputSchema).optional()
}).strict();

export const PerkUncheckedCreateInputSchema: z.ZodType<Prisma.PerkUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  jobPostId: z.string().optional().nullable()
}).strict();

export const PerkUpdateInputSchema: z.ZodType<Prisma.PerkUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  JobPost: z.lazy(() => JobPostUpdateOneWithoutPerksNestedInputSchema).optional()
}).strict();

export const PerkUncheckedUpdateInputSchema: z.ZodType<Prisma.PerkUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobPostId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PerkCreateManyInputSchema: z.ZodType<Prisma.PerkCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  jobPostId: z.string().optional().nullable()
}).strict();

export const PerkUpdateManyMutationInputSchema: z.ZodType<Prisma.PerkUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PerkUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PerkUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobPostId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MediaCreateInputSchema: z.ZodType<Prisma.MediaCreateInput> = z.object({
  id: z.string().cuid().optional(),
  mediaType: z.string(),
  url: z.string(),
  mediaName: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutMediaInputSchema),
  applicant: z.lazy(() => ApplicantCreateNestedOneWithoutResumeInputSchema).optional()
}).strict();

export const MediaUncheckedCreateInputSchema: z.ZodType<Prisma.MediaUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  mediaType: z.string(),
  url: z.string(),
  mediaName: z.string(),
  userId: z.string(),
  applicantId: z.string().optional().nullable()
}).strict();

export const MediaUpdateInputSchema: z.ZodType<Prisma.MediaUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mediaType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mediaName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutMediaNestedInputSchema).optional(),
  applicant: z.lazy(() => ApplicantUpdateOneWithoutResumeNestedInputSchema).optional()
}).strict();

export const MediaUncheckedUpdateInputSchema: z.ZodType<Prisma.MediaUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mediaType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mediaName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  applicantId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MediaCreateManyInputSchema: z.ZodType<Prisma.MediaCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  mediaType: z.string(),
  url: z.string(),
  mediaName: z.string(),
  userId: z.string(),
  applicantId: z.string().optional().nullable()
}).strict();

export const MediaUpdateManyMutationInputSchema: z.ZodType<Prisma.MediaUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mediaType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mediaName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MediaUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MediaUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mediaType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mediaName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  applicantId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  expiresAt: z.coerce.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema)
}).strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  expiresAt: z.coerce.date()
}).strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  expiresAt: z.coerce.date()
}).strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LocationCreateInputSchema: z.ZodType<Prisma.LocationCreateInput> = z.object({
  id: z.string().cuid().optional(),
  address: z.string().optional().nullable(),
  postalCode: z.number().int(),
  User: z.lazy(() => UserCreateNestedManyWithoutAddressInputSchema).optional(),
  city: z.lazy(() => CityCreateNestedOneWithoutLocationInputSchema)
}).strict();

export const LocationUncheckedCreateInputSchema: z.ZodType<Prisma.LocationUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  address: z.string().optional().nullable(),
  postalCode: z.number().int(),
  cityId: z.string(),
  User: z.lazy(() => UserUncheckedCreateNestedManyWithoutAddressInputSchema).optional()
}).strict();

export const LocationUpdateInputSchema: z.ZodType<Prisma.LocationUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  postalCode: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUpdateManyWithoutAddressNestedInputSchema).optional(),
  city: z.lazy(() => CityUpdateOneRequiredWithoutLocationNestedInputSchema).optional()
}).strict();

export const LocationUncheckedUpdateInputSchema: z.ZodType<Prisma.LocationUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  postalCode: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cityId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUncheckedUpdateManyWithoutAddressNestedInputSchema).optional()
}).strict();

export const LocationCreateManyInputSchema: z.ZodType<Prisma.LocationCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  address: z.string().optional().nullable(),
  postalCode: z.number().int(),
  cityId: z.string()
}).strict();

export const LocationUpdateManyMutationInputSchema: z.ZodType<Prisma.LocationUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  postalCode: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LocationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LocationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  postalCode: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cityId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CityCreateInputSchema: z.ZodType<Prisma.CityCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  state: z.string(),
  location: z.lazy(() => LocationCreateNestedManyWithoutCityInputSchema).optional()
}).strict();

export const CityUncheckedCreateInputSchema: z.ZodType<Prisma.CityUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  state: z.string(),
  location: z.lazy(() => LocationUncheckedCreateNestedManyWithoutCityInputSchema).optional()
}).strict();

export const CityUpdateInputSchema: z.ZodType<Prisma.CityUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  state: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.lazy(() => LocationUpdateManyWithoutCityNestedInputSchema).optional()
}).strict();

export const CityUncheckedUpdateInputSchema: z.ZodType<Prisma.CityUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  state: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.lazy(() => LocationUncheckedUpdateManyWithoutCityNestedInputSchema).optional()
}).strict();

export const CityCreateManyInputSchema: z.ZodType<Prisma.CityCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  state: z.string()
}).strict();

export const CityUpdateManyMutationInputSchema: z.ZodType<Prisma.CityUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  state: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CityUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CityUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  state: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const JobProfileCreateInputSchema: z.ZodType<Prisma.JobProfileCreateInput> = z.object({
  id: z.string().cuid().optional(),
  jobProfileName: z.string()
}).strict();

export const JobProfileUncheckedCreateInputSchema: z.ZodType<Prisma.JobProfileUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  jobProfileName: z.string()
}).strict();

export const JobProfileUpdateInputSchema: z.ZodType<Prisma.JobProfileUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobProfileName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const JobProfileUncheckedUpdateInputSchema: z.ZodType<Prisma.JobProfileUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobProfileName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const JobProfileCreateManyInputSchema: z.ZodType<Prisma.JobProfileCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  jobProfileName: z.string()
}).strict();

export const JobProfileUpdateManyMutationInputSchema: z.ZodType<Prisma.JobProfileUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobProfileName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const JobProfileUncheckedUpdateManyInputSchema: z.ZodType<Prisma.JobProfileUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobProfileName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const EnummodeNullableFilterSchema: z.ZodType<Prisma.EnummodeNullableFilter> = z.object({
  equals: z.lazy(() => modeSchema).optional().nullable(),
  in: z.lazy(() => modeSchema).array().optional().nullable(),
  notIn: z.lazy(() => modeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => modeSchema),z.lazy(() => NestedEnummodeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const EnumJobTypeFilterSchema: z.ZodType<Prisma.EnumJobTypeFilter> = z.object({
  equals: z.lazy(() => JobTypeSchema).optional(),
  in: z.lazy(() => JobTypeSchema).array().optional(),
  notIn: z.lazy(() => JobTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => JobTypeSchema),z.lazy(() => NestedEnumJobTypeFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const EnumExperienceEnumFilterSchema: z.ZodType<Prisma.EnumExperienceEnumFilter> = z.object({
  equals: z.lazy(() => ExperienceEnumSchema).optional(),
  in: z.lazy(() => ExperienceEnumSchema).array().optional(),
  notIn: z.lazy(() => ExperienceEnumSchema).array().optional(),
  not: z.union([ z.lazy(() => ExperienceEnumSchema),z.lazy(() => NestedEnumExperienceEnumFilterSchema) ]).optional(),
}).strict();

export const SkillListRelationFilterSchema: z.ZodType<Prisma.SkillListRelationFilter> = z.object({
  every: z.lazy(() => SkillWhereInputSchema).optional(),
  some: z.lazy(() => SkillWhereInputSchema).optional(),
  none: z.lazy(() => SkillWhereInputSchema).optional()
}).strict();

export const PerkListRelationFilterSchema: z.ZodType<Prisma.PerkListRelationFilter> = z.object({
  every: z.lazy(() => PerkWhereInputSchema).optional(),
  some: z.lazy(() => PerkWhereInputSchema).optional(),
  none: z.lazy(() => PerkWhereInputSchema).optional()
}).strict();

export const ApplicantListRelationFilterSchema: z.ZodType<Prisma.ApplicantListRelationFilter> = z.object({
  every: z.lazy(() => ApplicantWhereInputSchema).optional(),
  some: z.lazy(() => ApplicantWhereInputSchema).optional(),
  none: z.lazy(() => ApplicantWhereInputSchema).optional()
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const SkillOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SkillOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PerkOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PerkOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ApplicantOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ApplicantOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JobPostCountOrderByAggregateInputSchema: z.ZodType<Prisma.JobPostCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  jobTitle: z.lazy(() => SortOrderSchema).optional(),
  jobDescription: z.lazy(() => SortOrderSchema).optional(),
  organisationName: z.lazy(() => SortOrderSchema).optional(),
  modeOfWork: z.lazy(() => SortOrderSchema).optional(),
  minExperience: z.lazy(() => SortOrderSchema).optional(),
  maxExperience: z.lazy(() => SortOrderSchema).optional(),
  minSalary: z.lazy(() => SortOrderSchema).optional(),
  maxSalary: z.lazy(() => SortOrderSchema).optional(),
  jobType: z.lazy(() => SortOrderSchema).optional(),
  postedAt: z.lazy(() => SortOrderSchema).optional(),
  whoCanApply: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JobPostAvgOrderByAggregateInputSchema: z.ZodType<Prisma.JobPostAvgOrderByAggregateInput> = z.object({
  minExperience: z.lazy(() => SortOrderSchema).optional(),
  maxExperience: z.lazy(() => SortOrderSchema).optional(),
  minSalary: z.lazy(() => SortOrderSchema).optional(),
  maxSalary: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JobPostMaxOrderByAggregateInputSchema: z.ZodType<Prisma.JobPostMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  jobTitle: z.lazy(() => SortOrderSchema).optional(),
  jobDescription: z.lazy(() => SortOrderSchema).optional(),
  organisationName: z.lazy(() => SortOrderSchema).optional(),
  modeOfWork: z.lazy(() => SortOrderSchema).optional(),
  minExperience: z.lazy(() => SortOrderSchema).optional(),
  maxExperience: z.lazy(() => SortOrderSchema).optional(),
  minSalary: z.lazy(() => SortOrderSchema).optional(),
  maxSalary: z.lazy(() => SortOrderSchema).optional(),
  jobType: z.lazy(() => SortOrderSchema).optional(),
  postedAt: z.lazy(() => SortOrderSchema).optional(),
  whoCanApply: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JobPostMinOrderByAggregateInputSchema: z.ZodType<Prisma.JobPostMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  jobTitle: z.lazy(() => SortOrderSchema).optional(),
  jobDescription: z.lazy(() => SortOrderSchema).optional(),
  organisationName: z.lazy(() => SortOrderSchema).optional(),
  modeOfWork: z.lazy(() => SortOrderSchema).optional(),
  minExperience: z.lazy(() => SortOrderSchema).optional(),
  maxExperience: z.lazy(() => SortOrderSchema).optional(),
  minSalary: z.lazy(() => SortOrderSchema).optional(),
  maxSalary: z.lazy(() => SortOrderSchema).optional(),
  jobType: z.lazy(() => SortOrderSchema).optional(),
  postedAt: z.lazy(() => SortOrderSchema).optional(),
  whoCanApply: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JobPostSumOrderByAggregateInputSchema: z.ZodType<Prisma.JobPostSumOrderByAggregateInput> = z.object({
  minExperience: z.lazy(() => SortOrderSchema).optional(),
  maxExperience: z.lazy(() => SortOrderSchema).optional(),
  minSalary: z.lazy(() => SortOrderSchema).optional(),
  maxSalary: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const EnummodeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.EnummodeNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => modeSchema).optional().nullable(),
  in: z.lazy(() => modeSchema).array().optional().nullable(),
  notIn: z.lazy(() => modeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => modeSchema),z.lazy(() => NestedEnummodeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnummodeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnummodeNullableFilterSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const EnumJobTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumJobTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => JobTypeSchema).optional(),
  in: z.lazy(() => JobTypeSchema).array().optional(),
  notIn: z.lazy(() => JobTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => JobTypeSchema),z.lazy(() => NestedEnumJobTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumJobTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumJobTypeFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const EnumExperienceEnumWithAggregatesFilterSchema: z.ZodType<Prisma.EnumExperienceEnumWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ExperienceEnumSchema).optional(),
  in: z.lazy(() => ExperienceEnumSchema).array().optional(),
  notIn: z.lazy(() => ExperienceEnumSchema).array().optional(),
  not: z.union([ z.lazy(() => ExperienceEnumSchema),z.lazy(() => NestedEnumExperienceEnumWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumExperienceEnumFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumExperienceEnumFilterSchema).optional()
}).strict();

export const EnumApprovalStatusFilterSchema: z.ZodType<Prisma.EnumApprovalStatusFilter> = z.object({
  equals: z.lazy(() => ApprovalStatusSchema).optional(),
  in: z.lazy(() => ApprovalStatusSchema).array().optional(),
  notIn: z.lazy(() => ApprovalStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ApprovalStatusSchema),z.lazy(() => NestedEnumApprovalStatusFilterSchema) ]).optional(),
}).strict();

export const MediaNullableRelationFilterSchema: z.ZodType<Prisma.MediaNullableRelationFilter> = z.object({
  is: z.lazy(() => MediaWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => MediaWhereInputSchema).optional().nullable()
}).strict();

export const JobPostRelationFilterSchema: z.ZodType<Prisma.JobPostRelationFilter> = z.object({
  is: z.lazy(() => JobPostWhereInputSchema).optional(),
  isNot: z.lazy(() => JobPostWhereInputSchema).optional()
}).strict();

export const ApplicantCountOrderByAggregateInputSchema: z.ZodType<Prisma.ApplicantCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  coverLetter: z.lazy(() => SortOrderSchema).optional(),
  availability: z.lazy(() => SortOrderSchema).optional(),
  approvalStatus: z.lazy(() => SortOrderSchema).optional(),
  jobId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ApplicantMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ApplicantMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  coverLetter: z.lazy(() => SortOrderSchema).optional(),
  availability: z.lazy(() => SortOrderSchema).optional(),
  approvalStatus: z.lazy(() => SortOrderSchema).optional(),
  jobId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ApplicantMinOrderByAggregateInputSchema: z.ZodType<Prisma.ApplicantMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  coverLetter: z.lazy(() => SortOrderSchema).optional(),
  availability: z.lazy(() => SortOrderSchema).optional(),
  approvalStatus: z.lazy(() => SortOrderSchema).optional(),
  jobId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumApprovalStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumApprovalStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ApprovalStatusSchema).optional(),
  in: z.lazy(() => ApprovalStatusSchema).array().optional(),
  notIn: z.lazy(() => ApprovalStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ApprovalStatusSchema),z.lazy(() => NestedEnumApprovalStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumApprovalStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumApprovalStatusFilterSchema).optional()
}).strict();

export const EnumRoleFilterSchema: z.ZodType<Prisma.EnumRoleFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const MediaListRelationFilterSchema: z.ZodType<Prisma.MediaListRelationFilter> = z.object({
  every: z.lazy(() => MediaWhereInputSchema).optional(),
  some: z.lazy(() => MediaWhereInputSchema).optional(),
  none: z.lazy(() => MediaWhereInputSchema).optional()
}).strict();

export const LocationNullableRelationFilterSchema: z.ZodType<Prisma.LocationNullableRelationFilter> = z.object({
  is: z.lazy(() => LocationWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => LocationWhereInputSchema).optional().nullable()
}).strict();

export const JobPostListRelationFilterSchema: z.ZodType<Prisma.JobPostListRelationFilter> = z.object({
  every: z.lazy(() => JobPostWhereInputSchema).optional(),
  some: z.lazy(() => JobPostWhereInputSchema).optional(),
  none: z.lazy(() => JobPostWhereInputSchema).optional()
}).strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const MediaOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MediaOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JobPostOrderByRelationAggregateInputSchema: z.ZodType<Prisma.JobPostOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  secondName: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  hashedPassword: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  locationId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  secondName: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  hashedPassword: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  locationId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  secondName: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  hashedPassword: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  locationId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const UserNullableRelationFilterSchema: z.ZodType<Prisma.UserNullableRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserWhereInputSchema).optional().nullable()
}).strict();

export const JobPostNullableRelationFilterSchema: z.ZodType<Prisma.JobPostNullableRelationFilter> = z.object({
  is: z.lazy(() => JobPostWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => JobPostWhereInputSchema).optional().nullable()
}).strict();

export const SkillCountOrderByAggregateInputSchema: z.ZodType<Prisma.SkillCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  jobPostId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SkillMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SkillMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  jobPostId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SkillMinOrderByAggregateInputSchema: z.ZodType<Prisma.SkillMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  jobPostId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PerkCountOrderByAggregateInputSchema: z.ZodType<Prisma.PerkCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  jobPostId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PerkMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PerkMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  jobPostId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PerkMinOrderByAggregateInputSchema: z.ZodType<Prisma.PerkMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  jobPostId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ApplicantNullableRelationFilterSchema: z.ZodType<Prisma.ApplicantNullableRelationFilter> = z.object({
  is: z.lazy(() => ApplicantWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ApplicantWhereInputSchema).optional().nullable()
}).strict();

export const MediaCountOrderByAggregateInputSchema: z.ZodType<Prisma.MediaCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  mediaType: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  mediaName: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  applicantId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MediaMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MediaMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  mediaType: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  mediaName: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  applicantId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MediaMinOrderByAggregateInputSchema: z.ZodType<Prisma.MediaMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  mediaType: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  mediaName: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  applicantId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserListRelationFilterSchema: z.ZodType<Prisma.UserListRelationFilter> = z.object({
  every: z.lazy(() => UserWhereInputSchema).optional(),
  some: z.lazy(() => UserWhereInputSchema).optional(),
  none: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const CityRelationFilterSchema: z.ZodType<Prisma.CityRelationFilter> = z.object({
  is: z.lazy(() => CityWhereInputSchema).optional(),
  isNot: z.lazy(() => CityWhereInputSchema).optional()
}).strict();

export const UserOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LocationCountOrderByAggregateInputSchema: z.ZodType<Prisma.LocationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  postalCode: z.lazy(() => SortOrderSchema).optional(),
  cityId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LocationAvgOrderByAggregateInputSchema: z.ZodType<Prisma.LocationAvgOrderByAggregateInput> = z.object({
  postalCode: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LocationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LocationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  postalCode: z.lazy(() => SortOrderSchema).optional(),
  cityId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LocationMinOrderByAggregateInputSchema: z.ZodType<Prisma.LocationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  postalCode: z.lazy(() => SortOrderSchema).optional(),
  cityId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LocationSumOrderByAggregateInputSchema: z.ZodType<Prisma.LocationSumOrderByAggregateInput> = z.object({
  postalCode: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LocationListRelationFilterSchema: z.ZodType<Prisma.LocationListRelationFilter> = z.object({
  every: z.lazy(() => LocationWhereInputSchema).optional(),
  some: z.lazy(() => LocationWhereInputSchema).optional(),
  none: z.lazy(() => LocationWhereInputSchema).optional()
}).strict();

export const LocationOrderByRelationAggregateInputSchema: z.ZodType<Prisma.LocationOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CityCountOrderByAggregateInputSchema: z.ZodType<Prisma.CityCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CityMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CityMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CityMinOrderByAggregateInputSchema: z.ZodType<Prisma.CityMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JobProfileCountOrderByAggregateInputSchema: z.ZodType<Prisma.JobProfileCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  jobProfileName: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JobProfileMaxOrderByAggregateInputSchema: z.ZodType<Prisma.JobProfileMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  jobProfileName: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JobProfileMinOrderByAggregateInputSchema: z.ZodType<Prisma.JobProfileMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  jobProfileName: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SkillCreateNestedManyWithoutJobPostInputSchema: z.ZodType<Prisma.SkillCreateNestedManyWithoutJobPostInput> = z.object({
  create: z.union([ z.lazy(() => SkillCreateWithoutJobPostInputSchema),z.lazy(() => SkillCreateWithoutJobPostInputSchema).array(),z.lazy(() => SkillUncheckedCreateWithoutJobPostInputSchema),z.lazy(() => SkillUncheckedCreateWithoutJobPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SkillCreateOrConnectWithoutJobPostInputSchema),z.lazy(() => SkillCreateOrConnectWithoutJobPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SkillCreateManyJobPostInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SkillWhereUniqueInputSchema),z.lazy(() => SkillWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PerkCreateNestedManyWithoutJobPostInputSchema: z.ZodType<Prisma.PerkCreateNestedManyWithoutJobPostInput> = z.object({
  create: z.union([ z.lazy(() => PerkCreateWithoutJobPostInputSchema),z.lazy(() => PerkCreateWithoutJobPostInputSchema).array(),z.lazy(() => PerkUncheckedCreateWithoutJobPostInputSchema),z.lazy(() => PerkUncheckedCreateWithoutJobPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PerkCreateOrConnectWithoutJobPostInputSchema),z.lazy(() => PerkCreateOrConnectWithoutJobPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PerkCreateManyJobPostInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PerkWhereUniqueInputSchema),z.lazy(() => PerkWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ApplicantCreateNestedManyWithoutJobPostInputSchema: z.ZodType<Prisma.ApplicantCreateNestedManyWithoutJobPostInput> = z.object({
  create: z.union([ z.lazy(() => ApplicantCreateWithoutJobPostInputSchema),z.lazy(() => ApplicantCreateWithoutJobPostInputSchema).array(),z.lazy(() => ApplicantUncheckedCreateWithoutJobPostInputSchema),z.lazy(() => ApplicantUncheckedCreateWithoutJobPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ApplicantCreateOrConnectWithoutJobPostInputSchema),z.lazy(() => ApplicantCreateOrConnectWithoutJobPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ApplicantCreateManyJobPostInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ApplicantWhereUniqueInputSchema),z.lazy(() => ApplicantWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutPostedJobsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPostedJobsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPostedJobsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPostedJobsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPostedJobsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const SkillUncheckedCreateNestedManyWithoutJobPostInputSchema: z.ZodType<Prisma.SkillUncheckedCreateNestedManyWithoutJobPostInput> = z.object({
  create: z.union([ z.lazy(() => SkillCreateWithoutJobPostInputSchema),z.lazy(() => SkillCreateWithoutJobPostInputSchema).array(),z.lazy(() => SkillUncheckedCreateWithoutJobPostInputSchema),z.lazy(() => SkillUncheckedCreateWithoutJobPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SkillCreateOrConnectWithoutJobPostInputSchema),z.lazy(() => SkillCreateOrConnectWithoutJobPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SkillCreateManyJobPostInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SkillWhereUniqueInputSchema),z.lazy(() => SkillWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PerkUncheckedCreateNestedManyWithoutJobPostInputSchema: z.ZodType<Prisma.PerkUncheckedCreateNestedManyWithoutJobPostInput> = z.object({
  create: z.union([ z.lazy(() => PerkCreateWithoutJobPostInputSchema),z.lazy(() => PerkCreateWithoutJobPostInputSchema).array(),z.lazy(() => PerkUncheckedCreateWithoutJobPostInputSchema),z.lazy(() => PerkUncheckedCreateWithoutJobPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PerkCreateOrConnectWithoutJobPostInputSchema),z.lazy(() => PerkCreateOrConnectWithoutJobPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PerkCreateManyJobPostInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PerkWhereUniqueInputSchema),z.lazy(() => PerkWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ApplicantUncheckedCreateNestedManyWithoutJobPostInputSchema: z.ZodType<Prisma.ApplicantUncheckedCreateNestedManyWithoutJobPostInput> = z.object({
  create: z.union([ z.lazy(() => ApplicantCreateWithoutJobPostInputSchema),z.lazy(() => ApplicantCreateWithoutJobPostInputSchema).array(),z.lazy(() => ApplicantUncheckedCreateWithoutJobPostInputSchema),z.lazy(() => ApplicantUncheckedCreateWithoutJobPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ApplicantCreateOrConnectWithoutJobPostInputSchema),z.lazy(() => ApplicantCreateOrConnectWithoutJobPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ApplicantCreateManyJobPostInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ApplicantWhereUniqueInputSchema),z.lazy(() => ApplicantWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableEnummodeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnummodeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => modeSchema).optional().nullable()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const EnumJobTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumJobTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => JobTypeSchema).optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const EnumExperienceEnumFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumExperienceEnumFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ExperienceEnumSchema).optional()
}).strict();

export const SkillUpdateManyWithoutJobPostNestedInputSchema: z.ZodType<Prisma.SkillUpdateManyWithoutJobPostNestedInput> = z.object({
  create: z.union([ z.lazy(() => SkillCreateWithoutJobPostInputSchema),z.lazy(() => SkillCreateWithoutJobPostInputSchema).array(),z.lazy(() => SkillUncheckedCreateWithoutJobPostInputSchema),z.lazy(() => SkillUncheckedCreateWithoutJobPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SkillCreateOrConnectWithoutJobPostInputSchema),z.lazy(() => SkillCreateOrConnectWithoutJobPostInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SkillUpsertWithWhereUniqueWithoutJobPostInputSchema),z.lazy(() => SkillUpsertWithWhereUniqueWithoutJobPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SkillCreateManyJobPostInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SkillWhereUniqueInputSchema),z.lazy(() => SkillWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SkillWhereUniqueInputSchema),z.lazy(() => SkillWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SkillWhereUniqueInputSchema),z.lazy(() => SkillWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SkillWhereUniqueInputSchema),z.lazy(() => SkillWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SkillUpdateWithWhereUniqueWithoutJobPostInputSchema),z.lazy(() => SkillUpdateWithWhereUniqueWithoutJobPostInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SkillUpdateManyWithWhereWithoutJobPostInputSchema),z.lazy(() => SkillUpdateManyWithWhereWithoutJobPostInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SkillScalarWhereInputSchema),z.lazy(() => SkillScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PerkUpdateManyWithoutJobPostNestedInputSchema: z.ZodType<Prisma.PerkUpdateManyWithoutJobPostNestedInput> = z.object({
  create: z.union([ z.lazy(() => PerkCreateWithoutJobPostInputSchema),z.lazy(() => PerkCreateWithoutJobPostInputSchema).array(),z.lazy(() => PerkUncheckedCreateWithoutJobPostInputSchema),z.lazy(() => PerkUncheckedCreateWithoutJobPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PerkCreateOrConnectWithoutJobPostInputSchema),z.lazy(() => PerkCreateOrConnectWithoutJobPostInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PerkUpsertWithWhereUniqueWithoutJobPostInputSchema),z.lazy(() => PerkUpsertWithWhereUniqueWithoutJobPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PerkCreateManyJobPostInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PerkWhereUniqueInputSchema),z.lazy(() => PerkWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PerkWhereUniqueInputSchema),z.lazy(() => PerkWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PerkWhereUniqueInputSchema),z.lazy(() => PerkWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PerkWhereUniqueInputSchema),z.lazy(() => PerkWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PerkUpdateWithWhereUniqueWithoutJobPostInputSchema),z.lazy(() => PerkUpdateWithWhereUniqueWithoutJobPostInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PerkUpdateManyWithWhereWithoutJobPostInputSchema),z.lazy(() => PerkUpdateManyWithWhereWithoutJobPostInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PerkScalarWhereInputSchema),z.lazy(() => PerkScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ApplicantUpdateManyWithoutJobPostNestedInputSchema: z.ZodType<Prisma.ApplicantUpdateManyWithoutJobPostNestedInput> = z.object({
  create: z.union([ z.lazy(() => ApplicantCreateWithoutJobPostInputSchema),z.lazy(() => ApplicantCreateWithoutJobPostInputSchema).array(),z.lazy(() => ApplicantUncheckedCreateWithoutJobPostInputSchema),z.lazy(() => ApplicantUncheckedCreateWithoutJobPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ApplicantCreateOrConnectWithoutJobPostInputSchema),z.lazy(() => ApplicantCreateOrConnectWithoutJobPostInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ApplicantUpsertWithWhereUniqueWithoutJobPostInputSchema),z.lazy(() => ApplicantUpsertWithWhereUniqueWithoutJobPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ApplicantCreateManyJobPostInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ApplicantWhereUniqueInputSchema),z.lazy(() => ApplicantWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ApplicantWhereUniqueInputSchema),z.lazy(() => ApplicantWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ApplicantWhereUniqueInputSchema),z.lazy(() => ApplicantWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ApplicantWhereUniqueInputSchema),z.lazy(() => ApplicantWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ApplicantUpdateWithWhereUniqueWithoutJobPostInputSchema),z.lazy(() => ApplicantUpdateWithWhereUniqueWithoutJobPostInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ApplicantUpdateManyWithWhereWithoutJobPostInputSchema),z.lazy(() => ApplicantUpdateManyWithWhereWithoutJobPostInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ApplicantScalarWhereInputSchema),z.lazy(() => ApplicantScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutPostedJobsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPostedJobsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPostedJobsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPostedJobsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPostedJobsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPostedJobsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutPostedJobsInputSchema),z.lazy(() => UserUpdateWithoutPostedJobsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPostedJobsInputSchema) ]).optional(),
}).strict();

export const SkillUncheckedUpdateManyWithoutJobPostNestedInputSchema: z.ZodType<Prisma.SkillUncheckedUpdateManyWithoutJobPostNestedInput> = z.object({
  create: z.union([ z.lazy(() => SkillCreateWithoutJobPostInputSchema),z.lazy(() => SkillCreateWithoutJobPostInputSchema).array(),z.lazy(() => SkillUncheckedCreateWithoutJobPostInputSchema),z.lazy(() => SkillUncheckedCreateWithoutJobPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SkillCreateOrConnectWithoutJobPostInputSchema),z.lazy(() => SkillCreateOrConnectWithoutJobPostInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SkillUpsertWithWhereUniqueWithoutJobPostInputSchema),z.lazy(() => SkillUpsertWithWhereUniqueWithoutJobPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SkillCreateManyJobPostInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SkillWhereUniqueInputSchema),z.lazy(() => SkillWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SkillWhereUniqueInputSchema),z.lazy(() => SkillWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SkillWhereUniqueInputSchema),z.lazy(() => SkillWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SkillWhereUniqueInputSchema),z.lazy(() => SkillWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SkillUpdateWithWhereUniqueWithoutJobPostInputSchema),z.lazy(() => SkillUpdateWithWhereUniqueWithoutJobPostInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SkillUpdateManyWithWhereWithoutJobPostInputSchema),z.lazy(() => SkillUpdateManyWithWhereWithoutJobPostInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SkillScalarWhereInputSchema),z.lazy(() => SkillScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PerkUncheckedUpdateManyWithoutJobPostNestedInputSchema: z.ZodType<Prisma.PerkUncheckedUpdateManyWithoutJobPostNestedInput> = z.object({
  create: z.union([ z.lazy(() => PerkCreateWithoutJobPostInputSchema),z.lazy(() => PerkCreateWithoutJobPostInputSchema).array(),z.lazy(() => PerkUncheckedCreateWithoutJobPostInputSchema),z.lazy(() => PerkUncheckedCreateWithoutJobPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PerkCreateOrConnectWithoutJobPostInputSchema),z.lazy(() => PerkCreateOrConnectWithoutJobPostInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PerkUpsertWithWhereUniqueWithoutJobPostInputSchema),z.lazy(() => PerkUpsertWithWhereUniqueWithoutJobPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PerkCreateManyJobPostInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PerkWhereUniqueInputSchema),z.lazy(() => PerkWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PerkWhereUniqueInputSchema),z.lazy(() => PerkWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PerkWhereUniqueInputSchema),z.lazy(() => PerkWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PerkWhereUniqueInputSchema),z.lazy(() => PerkWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PerkUpdateWithWhereUniqueWithoutJobPostInputSchema),z.lazy(() => PerkUpdateWithWhereUniqueWithoutJobPostInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PerkUpdateManyWithWhereWithoutJobPostInputSchema),z.lazy(() => PerkUpdateManyWithWhereWithoutJobPostInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PerkScalarWhereInputSchema),z.lazy(() => PerkScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ApplicantUncheckedUpdateManyWithoutJobPostNestedInputSchema: z.ZodType<Prisma.ApplicantUncheckedUpdateManyWithoutJobPostNestedInput> = z.object({
  create: z.union([ z.lazy(() => ApplicantCreateWithoutJobPostInputSchema),z.lazy(() => ApplicantCreateWithoutJobPostInputSchema).array(),z.lazy(() => ApplicantUncheckedCreateWithoutJobPostInputSchema),z.lazy(() => ApplicantUncheckedCreateWithoutJobPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ApplicantCreateOrConnectWithoutJobPostInputSchema),z.lazy(() => ApplicantCreateOrConnectWithoutJobPostInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ApplicantUpsertWithWhereUniqueWithoutJobPostInputSchema),z.lazy(() => ApplicantUpsertWithWhereUniqueWithoutJobPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ApplicantCreateManyJobPostInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ApplicantWhereUniqueInputSchema),z.lazy(() => ApplicantWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ApplicantWhereUniqueInputSchema),z.lazy(() => ApplicantWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ApplicantWhereUniqueInputSchema),z.lazy(() => ApplicantWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ApplicantWhereUniqueInputSchema),z.lazy(() => ApplicantWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ApplicantUpdateWithWhereUniqueWithoutJobPostInputSchema),z.lazy(() => ApplicantUpdateWithWhereUniqueWithoutJobPostInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ApplicantUpdateManyWithWhereWithoutJobPostInputSchema),z.lazy(() => ApplicantUpdateManyWithWhereWithoutJobPostInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ApplicantScalarWhereInputSchema),z.lazy(() => ApplicantScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MediaCreateNestedOneWithoutApplicantInputSchema: z.ZodType<Prisma.MediaCreateNestedOneWithoutApplicantInput> = z.object({
  create: z.union([ z.lazy(() => MediaCreateWithoutApplicantInputSchema),z.lazy(() => MediaUncheckedCreateWithoutApplicantInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MediaCreateOrConnectWithoutApplicantInputSchema).optional(),
  connect: z.lazy(() => MediaWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutAppliedJobsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAppliedJobsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAppliedJobsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAppliedJobsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAppliedJobsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const JobPostCreateNestedOneWithoutApplicantsInputSchema: z.ZodType<Prisma.JobPostCreateNestedOneWithoutApplicantsInput> = z.object({
  create: z.union([ z.lazy(() => JobPostCreateWithoutApplicantsInputSchema),z.lazy(() => JobPostUncheckedCreateWithoutApplicantsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => JobPostCreateOrConnectWithoutApplicantsInputSchema).optional(),
  connect: z.lazy(() => JobPostWhereUniqueInputSchema).optional()
}).strict();

export const MediaUncheckedCreateNestedOneWithoutApplicantInputSchema: z.ZodType<Prisma.MediaUncheckedCreateNestedOneWithoutApplicantInput> = z.object({
  create: z.union([ z.lazy(() => MediaCreateWithoutApplicantInputSchema),z.lazy(() => MediaUncheckedCreateWithoutApplicantInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MediaCreateOrConnectWithoutApplicantInputSchema).optional(),
  connect: z.lazy(() => MediaWhereUniqueInputSchema).optional()
}).strict();

export const EnumApprovalStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumApprovalStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ApprovalStatusSchema).optional()
}).strict();

export const MediaUpdateOneWithoutApplicantNestedInputSchema: z.ZodType<Prisma.MediaUpdateOneWithoutApplicantNestedInput> = z.object({
  create: z.union([ z.lazy(() => MediaCreateWithoutApplicantInputSchema),z.lazy(() => MediaUncheckedCreateWithoutApplicantInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MediaCreateOrConnectWithoutApplicantInputSchema).optional(),
  upsert: z.lazy(() => MediaUpsertWithoutApplicantInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => MediaWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => MediaWhereInputSchema) ]).optional(),
  connect: z.lazy(() => MediaWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => MediaUpdateToOneWithWhereWithoutApplicantInputSchema),z.lazy(() => MediaUpdateWithoutApplicantInputSchema),z.lazy(() => MediaUncheckedUpdateWithoutApplicantInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutAppliedJobsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAppliedJobsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAppliedJobsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAppliedJobsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAppliedJobsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAppliedJobsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAppliedJobsInputSchema),z.lazy(() => UserUpdateWithoutAppliedJobsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAppliedJobsInputSchema) ]).optional(),
}).strict();

export const JobPostUpdateOneRequiredWithoutApplicantsNestedInputSchema: z.ZodType<Prisma.JobPostUpdateOneRequiredWithoutApplicantsNestedInput> = z.object({
  create: z.union([ z.lazy(() => JobPostCreateWithoutApplicantsInputSchema),z.lazy(() => JobPostUncheckedCreateWithoutApplicantsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => JobPostCreateOrConnectWithoutApplicantsInputSchema).optional(),
  upsert: z.lazy(() => JobPostUpsertWithoutApplicantsInputSchema).optional(),
  connect: z.lazy(() => JobPostWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => JobPostUpdateToOneWithWhereWithoutApplicantsInputSchema),z.lazy(() => JobPostUpdateWithoutApplicantsInputSchema),z.lazy(() => JobPostUncheckedUpdateWithoutApplicantsInputSchema) ]).optional(),
}).strict();

export const MediaUncheckedUpdateOneWithoutApplicantNestedInputSchema: z.ZodType<Prisma.MediaUncheckedUpdateOneWithoutApplicantNestedInput> = z.object({
  create: z.union([ z.lazy(() => MediaCreateWithoutApplicantInputSchema),z.lazy(() => MediaUncheckedCreateWithoutApplicantInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MediaCreateOrConnectWithoutApplicantInputSchema).optional(),
  upsert: z.lazy(() => MediaUpsertWithoutApplicantInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => MediaWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => MediaWhereInputSchema) ]).optional(),
  connect: z.lazy(() => MediaWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => MediaUpdateToOneWithWhereWithoutApplicantInputSchema),z.lazy(() => MediaUpdateWithoutApplicantInputSchema),z.lazy(() => MediaUncheckedUpdateWithoutApplicantInputSchema) ]).optional(),
}).strict();

export const SkillCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SkillCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SkillCreateWithoutUserInputSchema),z.lazy(() => SkillCreateWithoutUserInputSchema).array(),z.lazy(() => SkillUncheckedCreateWithoutUserInputSchema),z.lazy(() => SkillUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SkillCreateOrConnectWithoutUserInputSchema),z.lazy(() => SkillCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SkillCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SkillWhereUniqueInputSchema),z.lazy(() => SkillWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MediaCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.MediaCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => MediaCreateWithoutUserInputSchema),z.lazy(() => MediaCreateWithoutUserInputSchema).array(),z.lazy(() => MediaUncheckedCreateWithoutUserInputSchema),z.lazy(() => MediaUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MediaCreateOrConnectWithoutUserInputSchema),z.lazy(() => MediaCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MediaCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LocationCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.LocationCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => LocationCreateWithoutUserInputSchema),z.lazy(() => LocationUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LocationCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => LocationWhereUniqueInputSchema).optional()
}).strict();

export const JobPostCreateNestedManyWithoutPostedByInputSchema: z.ZodType<Prisma.JobPostCreateNestedManyWithoutPostedByInput> = z.object({
  create: z.union([ z.lazy(() => JobPostCreateWithoutPostedByInputSchema),z.lazy(() => JobPostCreateWithoutPostedByInputSchema).array(),z.lazy(() => JobPostUncheckedCreateWithoutPostedByInputSchema),z.lazy(() => JobPostUncheckedCreateWithoutPostedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JobPostCreateOrConnectWithoutPostedByInputSchema),z.lazy(() => JobPostCreateOrConnectWithoutPostedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JobPostCreateManyPostedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => JobPostWhereUniqueInputSchema),z.lazy(() => JobPostWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ApplicantCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ApplicantCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ApplicantCreateWithoutUserInputSchema),z.lazy(() => ApplicantCreateWithoutUserInputSchema).array(),z.lazy(() => ApplicantUncheckedCreateWithoutUserInputSchema),z.lazy(() => ApplicantUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ApplicantCreateOrConnectWithoutUserInputSchema),z.lazy(() => ApplicantCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ApplicantCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ApplicantWhereUniqueInputSchema),z.lazy(() => ApplicantWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SkillUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SkillUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SkillCreateWithoutUserInputSchema),z.lazy(() => SkillCreateWithoutUserInputSchema).array(),z.lazy(() => SkillUncheckedCreateWithoutUserInputSchema),z.lazy(() => SkillUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SkillCreateOrConnectWithoutUserInputSchema),z.lazy(() => SkillCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SkillCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SkillWhereUniqueInputSchema),z.lazy(() => SkillWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MediaUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.MediaUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => MediaCreateWithoutUserInputSchema),z.lazy(() => MediaCreateWithoutUserInputSchema).array(),z.lazy(() => MediaUncheckedCreateWithoutUserInputSchema),z.lazy(() => MediaUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MediaCreateOrConnectWithoutUserInputSchema),z.lazy(() => MediaCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MediaCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const JobPostUncheckedCreateNestedManyWithoutPostedByInputSchema: z.ZodType<Prisma.JobPostUncheckedCreateNestedManyWithoutPostedByInput> = z.object({
  create: z.union([ z.lazy(() => JobPostCreateWithoutPostedByInputSchema),z.lazy(() => JobPostCreateWithoutPostedByInputSchema).array(),z.lazy(() => JobPostUncheckedCreateWithoutPostedByInputSchema),z.lazy(() => JobPostUncheckedCreateWithoutPostedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JobPostCreateOrConnectWithoutPostedByInputSchema),z.lazy(() => JobPostCreateOrConnectWithoutPostedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JobPostCreateManyPostedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => JobPostWhereUniqueInputSchema),z.lazy(() => JobPostWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ApplicantUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ApplicantUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ApplicantCreateWithoutUserInputSchema),z.lazy(() => ApplicantCreateWithoutUserInputSchema).array(),z.lazy(() => ApplicantUncheckedCreateWithoutUserInputSchema),z.lazy(() => ApplicantUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ApplicantCreateOrConnectWithoutUserInputSchema),z.lazy(() => ApplicantCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ApplicantCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ApplicantWhereUniqueInputSchema),z.lazy(() => ApplicantWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRoleFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => RoleSchema).optional()
}).strict();

export const SkillUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SkillUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SkillCreateWithoutUserInputSchema),z.lazy(() => SkillCreateWithoutUserInputSchema).array(),z.lazy(() => SkillUncheckedCreateWithoutUserInputSchema),z.lazy(() => SkillUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SkillCreateOrConnectWithoutUserInputSchema),z.lazy(() => SkillCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SkillUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SkillUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SkillCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SkillWhereUniqueInputSchema),z.lazy(() => SkillWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SkillWhereUniqueInputSchema),z.lazy(() => SkillWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SkillWhereUniqueInputSchema),z.lazy(() => SkillWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SkillWhereUniqueInputSchema),z.lazy(() => SkillWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SkillUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SkillUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SkillUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SkillUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SkillScalarWhereInputSchema),z.lazy(() => SkillScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MediaUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.MediaUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => MediaCreateWithoutUserInputSchema),z.lazy(() => MediaCreateWithoutUserInputSchema).array(),z.lazy(() => MediaUncheckedCreateWithoutUserInputSchema),z.lazy(() => MediaUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MediaCreateOrConnectWithoutUserInputSchema),z.lazy(() => MediaCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MediaUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => MediaUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MediaCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MediaUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => MediaUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MediaUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => MediaUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MediaScalarWhereInputSchema),z.lazy(() => MediaScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LocationUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.LocationUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => LocationCreateWithoutUserInputSchema),z.lazy(() => LocationUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LocationCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => LocationUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => LocationWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => LocationWhereInputSchema) ]).optional(),
  connect: z.lazy(() => LocationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => LocationUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => LocationUpdateWithoutUserInputSchema),z.lazy(() => LocationUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const JobPostUpdateManyWithoutPostedByNestedInputSchema: z.ZodType<Prisma.JobPostUpdateManyWithoutPostedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => JobPostCreateWithoutPostedByInputSchema),z.lazy(() => JobPostCreateWithoutPostedByInputSchema).array(),z.lazy(() => JobPostUncheckedCreateWithoutPostedByInputSchema),z.lazy(() => JobPostUncheckedCreateWithoutPostedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JobPostCreateOrConnectWithoutPostedByInputSchema),z.lazy(() => JobPostCreateOrConnectWithoutPostedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => JobPostUpsertWithWhereUniqueWithoutPostedByInputSchema),z.lazy(() => JobPostUpsertWithWhereUniqueWithoutPostedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JobPostCreateManyPostedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => JobPostWhereUniqueInputSchema),z.lazy(() => JobPostWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => JobPostWhereUniqueInputSchema),z.lazy(() => JobPostWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => JobPostWhereUniqueInputSchema),z.lazy(() => JobPostWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => JobPostWhereUniqueInputSchema),z.lazy(() => JobPostWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => JobPostUpdateWithWhereUniqueWithoutPostedByInputSchema),z.lazy(() => JobPostUpdateWithWhereUniqueWithoutPostedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => JobPostUpdateManyWithWhereWithoutPostedByInputSchema),z.lazy(() => JobPostUpdateManyWithWhereWithoutPostedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => JobPostScalarWhereInputSchema),z.lazy(() => JobPostScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ApplicantUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ApplicantUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ApplicantCreateWithoutUserInputSchema),z.lazy(() => ApplicantCreateWithoutUserInputSchema).array(),z.lazy(() => ApplicantUncheckedCreateWithoutUserInputSchema),z.lazy(() => ApplicantUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ApplicantCreateOrConnectWithoutUserInputSchema),z.lazy(() => ApplicantCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ApplicantUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ApplicantUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ApplicantCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ApplicantWhereUniqueInputSchema),z.lazy(() => ApplicantWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ApplicantWhereUniqueInputSchema),z.lazy(() => ApplicantWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ApplicantWhereUniqueInputSchema),z.lazy(() => ApplicantWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ApplicantWhereUniqueInputSchema),z.lazy(() => ApplicantWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ApplicantUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ApplicantUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ApplicantUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ApplicantUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ApplicantScalarWhereInputSchema),z.lazy(() => ApplicantScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const SkillUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SkillUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SkillCreateWithoutUserInputSchema),z.lazy(() => SkillCreateWithoutUserInputSchema).array(),z.lazy(() => SkillUncheckedCreateWithoutUserInputSchema),z.lazy(() => SkillUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SkillCreateOrConnectWithoutUserInputSchema),z.lazy(() => SkillCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SkillUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SkillUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SkillCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SkillWhereUniqueInputSchema),z.lazy(() => SkillWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SkillWhereUniqueInputSchema),z.lazy(() => SkillWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SkillWhereUniqueInputSchema),z.lazy(() => SkillWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SkillWhereUniqueInputSchema),z.lazy(() => SkillWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SkillUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SkillUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SkillUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SkillUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SkillScalarWhereInputSchema),z.lazy(() => SkillScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MediaUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.MediaUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => MediaCreateWithoutUserInputSchema),z.lazy(() => MediaCreateWithoutUserInputSchema).array(),z.lazy(() => MediaUncheckedCreateWithoutUserInputSchema),z.lazy(() => MediaUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MediaCreateOrConnectWithoutUserInputSchema),z.lazy(() => MediaCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MediaUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => MediaUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MediaCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MediaWhereUniqueInputSchema),z.lazy(() => MediaWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MediaUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => MediaUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MediaUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => MediaUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MediaScalarWhereInputSchema),z.lazy(() => MediaScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const JobPostUncheckedUpdateManyWithoutPostedByNestedInputSchema: z.ZodType<Prisma.JobPostUncheckedUpdateManyWithoutPostedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => JobPostCreateWithoutPostedByInputSchema),z.lazy(() => JobPostCreateWithoutPostedByInputSchema).array(),z.lazy(() => JobPostUncheckedCreateWithoutPostedByInputSchema),z.lazy(() => JobPostUncheckedCreateWithoutPostedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JobPostCreateOrConnectWithoutPostedByInputSchema),z.lazy(() => JobPostCreateOrConnectWithoutPostedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => JobPostUpsertWithWhereUniqueWithoutPostedByInputSchema),z.lazy(() => JobPostUpsertWithWhereUniqueWithoutPostedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JobPostCreateManyPostedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => JobPostWhereUniqueInputSchema),z.lazy(() => JobPostWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => JobPostWhereUniqueInputSchema),z.lazy(() => JobPostWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => JobPostWhereUniqueInputSchema),z.lazy(() => JobPostWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => JobPostWhereUniqueInputSchema),z.lazy(() => JobPostWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => JobPostUpdateWithWhereUniqueWithoutPostedByInputSchema),z.lazy(() => JobPostUpdateWithWhereUniqueWithoutPostedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => JobPostUpdateManyWithWhereWithoutPostedByInputSchema),z.lazy(() => JobPostUpdateManyWithWhereWithoutPostedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => JobPostScalarWhereInputSchema),z.lazy(() => JobPostScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ApplicantUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ApplicantUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ApplicantCreateWithoutUserInputSchema),z.lazy(() => ApplicantCreateWithoutUserInputSchema).array(),z.lazy(() => ApplicantUncheckedCreateWithoutUserInputSchema),z.lazy(() => ApplicantUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ApplicantCreateOrConnectWithoutUserInputSchema),z.lazy(() => ApplicantCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ApplicantUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ApplicantUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ApplicantCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ApplicantWhereUniqueInputSchema),z.lazy(() => ApplicantWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ApplicantWhereUniqueInputSchema),z.lazy(() => ApplicantWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ApplicantWhereUniqueInputSchema),z.lazy(() => ApplicantWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ApplicantWhereUniqueInputSchema),z.lazy(() => ApplicantWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ApplicantUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ApplicantUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ApplicantUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ApplicantUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ApplicantScalarWhereInputSchema),z.lazy(() => ApplicantScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSkillsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSkillsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSkillsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSkillsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSkillsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const JobPostCreateNestedOneWithoutSkillsInputSchema: z.ZodType<Prisma.JobPostCreateNestedOneWithoutSkillsInput> = z.object({
  create: z.union([ z.lazy(() => JobPostCreateWithoutSkillsInputSchema),z.lazy(() => JobPostUncheckedCreateWithoutSkillsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => JobPostCreateOrConnectWithoutSkillsInputSchema).optional(),
  connect: z.lazy(() => JobPostWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneWithoutSkillsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutSkillsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSkillsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSkillsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSkillsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSkillsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSkillsInputSchema),z.lazy(() => UserUpdateWithoutSkillsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSkillsInputSchema) ]).optional(),
}).strict();

export const JobPostUpdateOneWithoutSkillsNestedInputSchema: z.ZodType<Prisma.JobPostUpdateOneWithoutSkillsNestedInput> = z.object({
  create: z.union([ z.lazy(() => JobPostCreateWithoutSkillsInputSchema),z.lazy(() => JobPostUncheckedCreateWithoutSkillsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => JobPostCreateOrConnectWithoutSkillsInputSchema).optional(),
  upsert: z.lazy(() => JobPostUpsertWithoutSkillsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => JobPostWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => JobPostWhereInputSchema) ]).optional(),
  connect: z.lazy(() => JobPostWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => JobPostUpdateToOneWithWhereWithoutSkillsInputSchema),z.lazy(() => JobPostUpdateWithoutSkillsInputSchema),z.lazy(() => JobPostUncheckedUpdateWithoutSkillsInputSchema) ]).optional(),
}).strict();

export const JobPostCreateNestedOneWithoutPerksInputSchema: z.ZodType<Prisma.JobPostCreateNestedOneWithoutPerksInput> = z.object({
  create: z.union([ z.lazy(() => JobPostCreateWithoutPerksInputSchema),z.lazy(() => JobPostUncheckedCreateWithoutPerksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => JobPostCreateOrConnectWithoutPerksInputSchema).optional(),
  connect: z.lazy(() => JobPostWhereUniqueInputSchema).optional()
}).strict();

export const JobPostUpdateOneWithoutPerksNestedInputSchema: z.ZodType<Prisma.JobPostUpdateOneWithoutPerksNestedInput> = z.object({
  create: z.union([ z.lazy(() => JobPostCreateWithoutPerksInputSchema),z.lazy(() => JobPostUncheckedCreateWithoutPerksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => JobPostCreateOrConnectWithoutPerksInputSchema).optional(),
  upsert: z.lazy(() => JobPostUpsertWithoutPerksInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => JobPostWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => JobPostWhereInputSchema) ]).optional(),
  connect: z.lazy(() => JobPostWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => JobPostUpdateToOneWithWhereWithoutPerksInputSchema),z.lazy(() => JobPostUpdateWithoutPerksInputSchema),z.lazy(() => JobPostUncheckedUpdateWithoutPerksInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutMediaInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutMediaInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutMediaInputSchema),z.lazy(() => UserUncheckedCreateWithoutMediaInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutMediaInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const ApplicantCreateNestedOneWithoutResumeInputSchema: z.ZodType<Prisma.ApplicantCreateNestedOneWithoutResumeInput> = z.object({
  create: z.union([ z.lazy(() => ApplicantCreateWithoutResumeInputSchema),z.lazy(() => ApplicantUncheckedCreateWithoutResumeInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ApplicantCreateOrConnectWithoutResumeInputSchema).optional(),
  connect: z.lazy(() => ApplicantWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutMediaNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutMediaNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutMediaInputSchema),z.lazy(() => UserUncheckedCreateWithoutMediaInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutMediaInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutMediaInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutMediaInputSchema),z.lazy(() => UserUpdateWithoutMediaInputSchema),z.lazy(() => UserUncheckedUpdateWithoutMediaInputSchema) ]).optional(),
}).strict();

export const ApplicantUpdateOneWithoutResumeNestedInputSchema: z.ZodType<Prisma.ApplicantUpdateOneWithoutResumeNestedInput> = z.object({
  create: z.union([ z.lazy(() => ApplicantCreateWithoutResumeInputSchema),z.lazy(() => ApplicantUncheckedCreateWithoutResumeInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ApplicantCreateOrConnectWithoutResumeInputSchema).optional(),
  upsert: z.lazy(() => ApplicantUpsertWithoutResumeInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ApplicantWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ApplicantWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ApplicantWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ApplicantUpdateToOneWithWhereWithoutResumeInputSchema),z.lazy(() => ApplicantUpdateWithoutResumeInputSchema),z.lazy(() => ApplicantUncheckedUpdateWithoutResumeInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSessionsInputSchema),z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedManyWithoutAddressInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutAddressInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAddressInputSchema),z.lazy(() => UserCreateWithoutAddressInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutAddressInputSchema),z.lazy(() => UserUncheckedCreateWithoutAddressInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutAddressInputSchema),z.lazy(() => UserCreateOrConnectWithoutAddressInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyAddressInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CityCreateNestedOneWithoutLocationInputSchema: z.ZodType<Prisma.CityCreateNestedOneWithoutLocationInput> = z.object({
  create: z.union([ z.lazy(() => CityCreateWithoutLocationInputSchema),z.lazy(() => CityUncheckedCreateWithoutLocationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CityCreateOrConnectWithoutLocationInputSchema).optional(),
  connect: z.lazy(() => CityWhereUniqueInputSchema).optional()
}).strict();

export const UserUncheckedCreateNestedManyWithoutAddressInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutAddressInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAddressInputSchema),z.lazy(() => UserCreateWithoutAddressInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutAddressInputSchema),z.lazy(() => UserUncheckedCreateWithoutAddressInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutAddressInputSchema),z.lazy(() => UserCreateOrConnectWithoutAddressInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyAddressInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateManyWithoutAddressNestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutAddressNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAddressInputSchema),z.lazy(() => UserCreateWithoutAddressInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutAddressInputSchema),z.lazy(() => UserUncheckedCreateWithoutAddressInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutAddressInputSchema),z.lazy(() => UserCreateOrConnectWithoutAddressInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutAddressInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutAddressInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyAddressInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutAddressInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutAddressInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutAddressInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutAddressInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CityUpdateOneRequiredWithoutLocationNestedInputSchema: z.ZodType<Prisma.CityUpdateOneRequiredWithoutLocationNestedInput> = z.object({
  create: z.union([ z.lazy(() => CityCreateWithoutLocationInputSchema),z.lazy(() => CityUncheckedCreateWithoutLocationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CityCreateOrConnectWithoutLocationInputSchema).optional(),
  upsert: z.lazy(() => CityUpsertWithoutLocationInputSchema).optional(),
  connect: z.lazy(() => CityWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CityUpdateToOneWithWhereWithoutLocationInputSchema),z.lazy(() => CityUpdateWithoutLocationInputSchema),z.lazy(() => CityUncheckedUpdateWithoutLocationInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyWithoutAddressNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutAddressNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAddressInputSchema),z.lazy(() => UserCreateWithoutAddressInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutAddressInputSchema),z.lazy(() => UserUncheckedCreateWithoutAddressInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutAddressInputSchema),z.lazy(() => UserCreateOrConnectWithoutAddressInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutAddressInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutAddressInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyAddressInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutAddressInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutAddressInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutAddressInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutAddressInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LocationCreateNestedManyWithoutCityInputSchema: z.ZodType<Prisma.LocationCreateNestedManyWithoutCityInput> = z.object({
  create: z.union([ z.lazy(() => LocationCreateWithoutCityInputSchema),z.lazy(() => LocationCreateWithoutCityInputSchema).array(),z.lazy(() => LocationUncheckedCreateWithoutCityInputSchema),z.lazy(() => LocationUncheckedCreateWithoutCityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LocationCreateOrConnectWithoutCityInputSchema),z.lazy(() => LocationCreateOrConnectWithoutCityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LocationCreateManyCityInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LocationUncheckedCreateNestedManyWithoutCityInputSchema: z.ZodType<Prisma.LocationUncheckedCreateNestedManyWithoutCityInput> = z.object({
  create: z.union([ z.lazy(() => LocationCreateWithoutCityInputSchema),z.lazy(() => LocationCreateWithoutCityInputSchema).array(),z.lazy(() => LocationUncheckedCreateWithoutCityInputSchema),z.lazy(() => LocationUncheckedCreateWithoutCityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LocationCreateOrConnectWithoutCityInputSchema),z.lazy(() => LocationCreateOrConnectWithoutCityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LocationCreateManyCityInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LocationUpdateManyWithoutCityNestedInputSchema: z.ZodType<Prisma.LocationUpdateManyWithoutCityNestedInput> = z.object({
  create: z.union([ z.lazy(() => LocationCreateWithoutCityInputSchema),z.lazy(() => LocationCreateWithoutCityInputSchema).array(),z.lazy(() => LocationUncheckedCreateWithoutCityInputSchema),z.lazy(() => LocationUncheckedCreateWithoutCityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LocationCreateOrConnectWithoutCityInputSchema),z.lazy(() => LocationCreateOrConnectWithoutCityInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LocationUpsertWithWhereUniqueWithoutCityInputSchema),z.lazy(() => LocationUpsertWithWhereUniqueWithoutCityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LocationCreateManyCityInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LocationUpdateWithWhereUniqueWithoutCityInputSchema),z.lazy(() => LocationUpdateWithWhereUniqueWithoutCityInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LocationUpdateManyWithWhereWithoutCityInputSchema),z.lazy(() => LocationUpdateManyWithWhereWithoutCityInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LocationScalarWhereInputSchema),z.lazy(() => LocationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LocationUncheckedUpdateManyWithoutCityNestedInputSchema: z.ZodType<Prisma.LocationUncheckedUpdateManyWithoutCityNestedInput> = z.object({
  create: z.union([ z.lazy(() => LocationCreateWithoutCityInputSchema),z.lazy(() => LocationCreateWithoutCityInputSchema).array(),z.lazy(() => LocationUncheckedCreateWithoutCityInputSchema),z.lazy(() => LocationUncheckedCreateWithoutCityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LocationCreateOrConnectWithoutCityInputSchema),z.lazy(() => LocationCreateOrConnectWithoutCityInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LocationUpsertWithWhereUniqueWithoutCityInputSchema),z.lazy(() => LocationUpsertWithWhereUniqueWithoutCityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LocationCreateManyCityInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LocationUpdateWithWhereUniqueWithoutCityInputSchema),z.lazy(() => LocationUpdateWithWhereUniqueWithoutCityInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LocationUpdateManyWithWhereWithoutCityInputSchema),z.lazy(() => LocationUpdateManyWithWhereWithoutCityInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LocationScalarWhereInputSchema),z.lazy(() => LocationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedEnummodeNullableFilterSchema: z.ZodType<Prisma.NestedEnummodeNullableFilter> = z.object({
  equals: z.lazy(() => modeSchema).optional().nullable(),
  in: z.lazy(() => modeSchema).array().optional().nullable(),
  notIn: z.lazy(() => modeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => modeSchema),z.lazy(() => NestedEnummodeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedEnumJobTypeFilterSchema: z.ZodType<Prisma.NestedEnumJobTypeFilter> = z.object({
  equals: z.lazy(() => JobTypeSchema).optional(),
  in: z.lazy(() => JobTypeSchema).array().optional(),
  notIn: z.lazy(() => JobTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => JobTypeSchema),z.lazy(() => NestedEnumJobTypeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumExperienceEnumFilterSchema: z.ZodType<Prisma.NestedEnumExperienceEnumFilter> = z.object({
  equals: z.lazy(() => ExperienceEnumSchema).optional(),
  in: z.lazy(() => ExperienceEnumSchema).array().optional(),
  notIn: z.lazy(() => ExperienceEnumSchema).array().optional(),
  not: z.union([ z.lazy(() => ExperienceEnumSchema),z.lazy(() => NestedEnumExperienceEnumFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedEnummodeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnummodeNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => modeSchema).optional().nullable(),
  in: z.lazy(() => modeSchema).array().optional().nullable(),
  notIn: z.lazy(() => modeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => modeSchema),z.lazy(() => NestedEnummodeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnummodeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnummodeNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedEnumJobTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumJobTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => JobTypeSchema).optional(),
  in: z.lazy(() => JobTypeSchema).array().optional(),
  notIn: z.lazy(() => JobTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => JobTypeSchema),z.lazy(() => NestedEnumJobTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumJobTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumJobTypeFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedEnumExperienceEnumWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumExperienceEnumWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ExperienceEnumSchema).optional(),
  in: z.lazy(() => ExperienceEnumSchema).array().optional(),
  notIn: z.lazy(() => ExperienceEnumSchema).array().optional(),
  not: z.union([ z.lazy(() => ExperienceEnumSchema),z.lazy(() => NestedEnumExperienceEnumWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumExperienceEnumFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumExperienceEnumFilterSchema).optional()
}).strict();

export const NestedEnumApprovalStatusFilterSchema: z.ZodType<Prisma.NestedEnumApprovalStatusFilter> = z.object({
  equals: z.lazy(() => ApprovalStatusSchema).optional(),
  in: z.lazy(() => ApprovalStatusSchema).array().optional(),
  notIn: z.lazy(() => ApprovalStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ApprovalStatusSchema),z.lazy(() => NestedEnumApprovalStatusFilterSchema) ]).optional(),
}).strict();

export const NestedEnumApprovalStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumApprovalStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ApprovalStatusSchema).optional(),
  in: z.lazy(() => ApprovalStatusSchema).array().optional(),
  notIn: z.lazy(() => ApprovalStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ApprovalStatusSchema),z.lazy(() => NestedEnumApprovalStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumApprovalStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumApprovalStatusFilterSchema).optional()
}).strict();

export const NestedEnumRoleFilterSchema: z.ZodType<Prisma.NestedEnumRoleFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const SkillCreateWithoutJobPostInputSchema: z.ZodType<Prisma.SkillCreateWithoutJobPostInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutSkillsInputSchema).optional()
}).strict();

export const SkillUncheckedCreateWithoutJobPostInputSchema: z.ZodType<Prisma.SkillUncheckedCreateWithoutJobPostInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  userId: z.string().optional().nullable()
}).strict();

export const SkillCreateOrConnectWithoutJobPostInputSchema: z.ZodType<Prisma.SkillCreateOrConnectWithoutJobPostInput> = z.object({
  where: z.lazy(() => SkillWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SkillCreateWithoutJobPostInputSchema),z.lazy(() => SkillUncheckedCreateWithoutJobPostInputSchema) ]),
}).strict();

export const SkillCreateManyJobPostInputEnvelopeSchema: z.ZodType<Prisma.SkillCreateManyJobPostInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SkillCreateManyJobPostInputSchema),z.lazy(() => SkillCreateManyJobPostInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PerkCreateWithoutJobPostInputSchema: z.ZodType<Prisma.PerkCreateWithoutJobPostInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string()
}).strict();

export const PerkUncheckedCreateWithoutJobPostInputSchema: z.ZodType<Prisma.PerkUncheckedCreateWithoutJobPostInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string()
}).strict();

export const PerkCreateOrConnectWithoutJobPostInputSchema: z.ZodType<Prisma.PerkCreateOrConnectWithoutJobPostInput> = z.object({
  where: z.lazy(() => PerkWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PerkCreateWithoutJobPostInputSchema),z.lazy(() => PerkUncheckedCreateWithoutJobPostInputSchema) ]),
}).strict();

export const PerkCreateManyJobPostInputEnvelopeSchema: z.ZodType<Prisma.PerkCreateManyJobPostInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PerkCreateManyJobPostInputSchema),z.lazy(() => PerkCreateManyJobPostInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ApplicantCreateWithoutJobPostInputSchema: z.ZodType<Prisma.ApplicantCreateWithoutJobPostInput> = z.object({
  id: z.string().cuid().optional(),
  coverLetter: z.string(),
  availability: z.string(),
  approvalStatus: z.lazy(() => ApprovalStatusSchema).optional(),
  resume: z.lazy(() => MediaCreateNestedOneWithoutApplicantInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAppliedJobsInputSchema)
}).strict();

export const ApplicantUncheckedCreateWithoutJobPostInputSchema: z.ZodType<Prisma.ApplicantUncheckedCreateWithoutJobPostInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  coverLetter: z.string(),
  availability: z.string(),
  approvalStatus: z.lazy(() => ApprovalStatusSchema).optional(),
  resume: z.lazy(() => MediaUncheckedCreateNestedOneWithoutApplicantInputSchema).optional()
}).strict();

export const ApplicantCreateOrConnectWithoutJobPostInputSchema: z.ZodType<Prisma.ApplicantCreateOrConnectWithoutJobPostInput> = z.object({
  where: z.lazy(() => ApplicantWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ApplicantCreateWithoutJobPostInputSchema),z.lazy(() => ApplicantUncheckedCreateWithoutJobPostInputSchema) ]),
}).strict();

export const ApplicantCreateManyJobPostInputEnvelopeSchema: z.ZodType<Prisma.ApplicantCreateManyJobPostInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ApplicantCreateManyJobPostInputSchema),z.lazy(() => ApplicantCreateManyJobPostInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserCreateWithoutPostedJobsInputSchema: z.ZodType<Prisma.UserCreateWithoutPostedJobsInput> = z.object({
  id: z.string().cuid().optional(),
  username: z.string(),
  firstName: z.string(),
  secondName: z.string(),
  email: z.string(),
  hashedPassword: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  skills: z.lazy(() => SkillCreateNestedManyWithoutUserInputSchema).optional(),
  media: z.lazy(() => MediaCreateNestedManyWithoutUserInputSchema).optional(),
  address: z.lazy(() => LocationCreateNestedOneWithoutUserInputSchema).optional(),
  appliedJobs: z.lazy(() => ApplicantCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutPostedJobsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPostedJobsInput> = z.object({
  id: z.string().cuid().optional(),
  username: z.string(),
  firstName: z.string(),
  secondName: z.string(),
  email: z.string(),
  hashedPassword: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  locationId: z.string().optional().nullable(),
  skills: z.lazy(() => SkillUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  media: z.lazy(() => MediaUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  appliedJobs: z.lazy(() => ApplicantUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutPostedJobsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPostedJobsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutPostedJobsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPostedJobsInputSchema) ]),
}).strict();

export const SkillUpsertWithWhereUniqueWithoutJobPostInputSchema: z.ZodType<Prisma.SkillUpsertWithWhereUniqueWithoutJobPostInput> = z.object({
  where: z.lazy(() => SkillWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SkillUpdateWithoutJobPostInputSchema),z.lazy(() => SkillUncheckedUpdateWithoutJobPostInputSchema) ]),
  create: z.union([ z.lazy(() => SkillCreateWithoutJobPostInputSchema),z.lazy(() => SkillUncheckedCreateWithoutJobPostInputSchema) ]),
}).strict();

export const SkillUpdateWithWhereUniqueWithoutJobPostInputSchema: z.ZodType<Prisma.SkillUpdateWithWhereUniqueWithoutJobPostInput> = z.object({
  where: z.lazy(() => SkillWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SkillUpdateWithoutJobPostInputSchema),z.lazy(() => SkillUncheckedUpdateWithoutJobPostInputSchema) ]),
}).strict();

export const SkillUpdateManyWithWhereWithoutJobPostInputSchema: z.ZodType<Prisma.SkillUpdateManyWithWhereWithoutJobPostInput> = z.object({
  where: z.lazy(() => SkillScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SkillUpdateManyMutationInputSchema),z.lazy(() => SkillUncheckedUpdateManyWithoutJobPostInputSchema) ]),
}).strict();

export const SkillScalarWhereInputSchema: z.ZodType<Prisma.SkillScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SkillScalarWhereInputSchema),z.lazy(() => SkillScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SkillScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SkillScalarWhereInputSchema),z.lazy(() => SkillScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  jobPostId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const PerkUpsertWithWhereUniqueWithoutJobPostInputSchema: z.ZodType<Prisma.PerkUpsertWithWhereUniqueWithoutJobPostInput> = z.object({
  where: z.lazy(() => PerkWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PerkUpdateWithoutJobPostInputSchema),z.lazy(() => PerkUncheckedUpdateWithoutJobPostInputSchema) ]),
  create: z.union([ z.lazy(() => PerkCreateWithoutJobPostInputSchema),z.lazy(() => PerkUncheckedCreateWithoutJobPostInputSchema) ]),
}).strict();

export const PerkUpdateWithWhereUniqueWithoutJobPostInputSchema: z.ZodType<Prisma.PerkUpdateWithWhereUniqueWithoutJobPostInput> = z.object({
  where: z.lazy(() => PerkWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PerkUpdateWithoutJobPostInputSchema),z.lazy(() => PerkUncheckedUpdateWithoutJobPostInputSchema) ]),
}).strict();

export const PerkUpdateManyWithWhereWithoutJobPostInputSchema: z.ZodType<Prisma.PerkUpdateManyWithWhereWithoutJobPostInput> = z.object({
  where: z.lazy(() => PerkScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PerkUpdateManyMutationInputSchema),z.lazy(() => PerkUncheckedUpdateManyWithoutJobPostInputSchema) ]),
}).strict();

export const PerkScalarWhereInputSchema: z.ZodType<Prisma.PerkScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PerkScalarWhereInputSchema),z.lazy(() => PerkScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PerkScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PerkScalarWhereInputSchema),z.lazy(() => PerkScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  jobPostId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const ApplicantUpsertWithWhereUniqueWithoutJobPostInputSchema: z.ZodType<Prisma.ApplicantUpsertWithWhereUniqueWithoutJobPostInput> = z.object({
  where: z.lazy(() => ApplicantWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ApplicantUpdateWithoutJobPostInputSchema),z.lazy(() => ApplicantUncheckedUpdateWithoutJobPostInputSchema) ]),
  create: z.union([ z.lazy(() => ApplicantCreateWithoutJobPostInputSchema),z.lazy(() => ApplicantUncheckedCreateWithoutJobPostInputSchema) ]),
}).strict();

export const ApplicantUpdateWithWhereUniqueWithoutJobPostInputSchema: z.ZodType<Prisma.ApplicantUpdateWithWhereUniqueWithoutJobPostInput> = z.object({
  where: z.lazy(() => ApplicantWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ApplicantUpdateWithoutJobPostInputSchema),z.lazy(() => ApplicantUncheckedUpdateWithoutJobPostInputSchema) ]),
}).strict();

export const ApplicantUpdateManyWithWhereWithoutJobPostInputSchema: z.ZodType<Prisma.ApplicantUpdateManyWithWhereWithoutJobPostInput> = z.object({
  where: z.lazy(() => ApplicantScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ApplicantUpdateManyMutationInputSchema),z.lazy(() => ApplicantUncheckedUpdateManyWithoutJobPostInputSchema) ]),
}).strict();

export const ApplicantScalarWhereInputSchema: z.ZodType<Prisma.ApplicantScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ApplicantScalarWhereInputSchema),z.lazy(() => ApplicantScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ApplicantScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ApplicantScalarWhereInputSchema),z.lazy(() => ApplicantScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  coverLetter: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  availability: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  approvalStatus: z.union([ z.lazy(() => EnumApprovalStatusFilterSchema),z.lazy(() => ApprovalStatusSchema) ]).optional(),
  jobId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UserUpsertWithoutPostedJobsInputSchema: z.ZodType<Prisma.UserUpsertWithoutPostedJobsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutPostedJobsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPostedJobsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutPostedJobsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPostedJobsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutPostedJobsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPostedJobsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutPostedJobsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPostedJobsInputSchema) ]),
}).strict();

export const UserUpdateWithoutPostedJobsInputSchema: z.ZodType<Prisma.UserUpdateWithoutPostedJobsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  secondName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  skills: z.lazy(() => SkillUpdateManyWithoutUserNestedInputSchema).optional(),
  media: z.lazy(() => MediaUpdateManyWithoutUserNestedInputSchema).optional(),
  address: z.lazy(() => LocationUpdateOneWithoutUserNestedInputSchema).optional(),
  appliedJobs: z.lazy(() => ApplicantUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutPostedJobsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutPostedJobsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  secondName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  locationId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skills: z.lazy(() => SkillUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  media: z.lazy(() => MediaUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  appliedJobs: z.lazy(() => ApplicantUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const MediaCreateWithoutApplicantInputSchema: z.ZodType<Prisma.MediaCreateWithoutApplicantInput> = z.object({
  id: z.string().cuid().optional(),
  mediaType: z.string(),
  url: z.string(),
  mediaName: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutMediaInputSchema)
}).strict();

export const MediaUncheckedCreateWithoutApplicantInputSchema: z.ZodType<Prisma.MediaUncheckedCreateWithoutApplicantInput> = z.object({
  id: z.string().cuid().optional(),
  mediaType: z.string(),
  url: z.string(),
  mediaName: z.string(),
  userId: z.string()
}).strict();

export const MediaCreateOrConnectWithoutApplicantInputSchema: z.ZodType<Prisma.MediaCreateOrConnectWithoutApplicantInput> = z.object({
  where: z.lazy(() => MediaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MediaCreateWithoutApplicantInputSchema),z.lazy(() => MediaUncheckedCreateWithoutApplicantInputSchema) ]),
}).strict();

export const UserCreateWithoutAppliedJobsInputSchema: z.ZodType<Prisma.UserCreateWithoutAppliedJobsInput> = z.object({
  id: z.string().cuid().optional(),
  username: z.string(),
  firstName: z.string(),
  secondName: z.string(),
  email: z.string(),
  hashedPassword: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  skills: z.lazy(() => SkillCreateNestedManyWithoutUserInputSchema).optional(),
  media: z.lazy(() => MediaCreateNestedManyWithoutUserInputSchema).optional(),
  address: z.lazy(() => LocationCreateNestedOneWithoutUserInputSchema).optional(),
  postedJobs: z.lazy(() => JobPostCreateNestedManyWithoutPostedByInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAppliedJobsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAppliedJobsInput> = z.object({
  id: z.string().cuid().optional(),
  username: z.string(),
  firstName: z.string(),
  secondName: z.string(),
  email: z.string(),
  hashedPassword: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  locationId: z.string().optional().nullable(),
  skills: z.lazy(() => SkillUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  media: z.lazy(() => MediaUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  postedJobs: z.lazy(() => JobPostUncheckedCreateNestedManyWithoutPostedByInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAppliedJobsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAppliedJobsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAppliedJobsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAppliedJobsInputSchema) ]),
}).strict();

export const JobPostCreateWithoutApplicantsInputSchema: z.ZodType<Prisma.JobPostCreateWithoutApplicantsInput> = z.object({
  id: z.string().cuid().optional(),
  jobTitle: z.string(),
  jobDescription: z.string(),
  organisationName: z.string(),
  modeOfWork: z.lazy(() => modeSchema).optional().nullable(),
  minExperience: z.coerce.number().optional(),
  maxExperience: z.coerce.number(),
  minSalary: z.coerce.number().optional(),
  maxSalary: z.coerce.number(),
  jobType: z.lazy(() => JobTypeSchema).optional(),
  postedAt: z.coerce.date().optional(),
  whoCanApply: z.lazy(() => ExperienceEnumSchema).optional(),
  skills: z.lazy(() => SkillCreateNestedManyWithoutJobPostInputSchema).optional(),
  perks: z.lazy(() => PerkCreateNestedManyWithoutJobPostInputSchema).optional(),
  postedBy: z.lazy(() => UserCreateNestedOneWithoutPostedJobsInputSchema)
}).strict();

export const JobPostUncheckedCreateWithoutApplicantsInputSchema: z.ZodType<Prisma.JobPostUncheckedCreateWithoutApplicantsInput> = z.object({
  id: z.string().cuid().optional(),
  jobTitle: z.string(),
  jobDescription: z.string(),
  organisationName: z.string(),
  modeOfWork: z.lazy(() => modeSchema).optional().nullable(),
  minExperience: z.coerce.number().optional(),
  maxExperience: z.coerce.number(),
  minSalary: z.coerce.number().optional(),
  maxSalary: z.coerce.number(),
  jobType: z.lazy(() => JobTypeSchema).optional(),
  postedAt: z.coerce.date().optional(),
  whoCanApply: z.lazy(() => ExperienceEnumSchema).optional(),
  userId: z.string(),
  skills: z.lazy(() => SkillUncheckedCreateNestedManyWithoutJobPostInputSchema).optional(),
  perks: z.lazy(() => PerkUncheckedCreateNestedManyWithoutJobPostInputSchema).optional()
}).strict();

export const JobPostCreateOrConnectWithoutApplicantsInputSchema: z.ZodType<Prisma.JobPostCreateOrConnectWithoutApplicantsInput> = z.object({
  where: z.lazy(() => JobPostWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => JobPostCreateWithoutApplicantsInputSchema),z.lazy(() => JobPostUncheckedCreateWithoutApplicantsInputSchema) ]),
}).strict();

export const MediaUpsertWithoutApplicantInputSchema: z.ZodType<Prisma.MediaUpsertWithoutApplicantInput> = z.object({
  update: z.union([ z.lazy(() => MediaUpdateWithoutApplicantInputSchema),z.lazy(() => MediaUncheckedUpdateWithoutApplicantInputSchema) ]),
  create: z.union([ z.lazy(() => MediaCreateWithoutApplicantInputSchema),z.lazy(() => MediaUncheckedCreateWithoutApplicantInputSchema) ]),
  where: z.lazy(() => MediaWhereInputSchema).optional()
}).strict();

export const MediaUpdateToOneWithWhereWithoutApplicantInputSchema: z.ZodType<Prisma.MediaUpdateToOneWithWhereWithoutApplicantInput> = z.object({
  where: z.lazy(() => MediaWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => MediaUpdateWithoutApplicantInputSchema),z.lazy(() => MediaUncheckedUpdateWithoutApplicantInputSchema) ]),
}).strict();

export const MediaUpdateWithoutApplicantInputSchema: z.ZodType<Prisma.MediaUpdateWithoutApplicantInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mediaType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mediaName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutMediaNestedInputSchema).optional()
}).strict();

export const MediaUncheckedUpdateWithoutApplicantInputSchema: z.ZodType<Prisma.MediaUncheckedUpdateWithoutApplicantInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mediaType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mediaName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUpsertWithoutAppliedJobsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAppliedJobsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAppliedJobsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAppliedJobsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAppliedJobsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAppliedJobsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutAppliedJobsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAppliedJobsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAppliedJobsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAppliedJobsInputSchema) ]),
}).strict();

export const UserUpdateWithoutAppliedJobsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAppliedJobsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  secondName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  skills: z.lazy(() => SkillUpdateManyWithoutUserNestedInputSchema).optional(),
  media: z.lazy(() => MediaUpdateManyWithoutUserNestedInputSchema).optional(),
  address: z.lazy(() => LocationUpdateOneWithoutUserNestedInputSchema).optional(),
  postedJobs: z.lazy(() => JobPostUpdateManyWithoutPostedByNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAppliedJobsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAppliedJobsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  secondName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  locationId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skills: z.lazy(() => SkillUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  media: z.lazy(() => MediaUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  postedJobs: z.lazy(() => JobPostUncheckedUpdateManyWithoutPostedByNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const JobPostUpsertWithoutApplicantsInputSchema: z.ZodType<Prisma.JobPostUpsertWithoutApplicantsInput> = z.object({
  update: z.union([ z.lazy(() => JobPostUpdateWithoutApplicantsInputSchema),z.lazy(() => JobPostUncheckedUpdateWithoutApplicantsInputSchema) ]),
  create: z.union([ z.lazy(() => JobPostCreateWithoutApplicantsInputSchema),z.lazy(() => JobPostUncheckedCreateWithoutApplicantsInputSchema) ]),
  where: z.lazy(() => JobPostWhereInputSchema).optional()
}).strict();

export const JobPostUpdateToOneWithWhereWithoutApplicantsInputSchema: z.ZodType<Prisma.JobPostUpdateToOneWithWhereWithoutApplicantsInput> = z.object({
  where: z.lazy(() => JobPostWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => JobPostUpdateWithoutApplicantsInputSchema),z.lazy(() => JobPostUncheckedUpdateWithoutApplicantsInputSchema) ]),
}).strict();

export const JobPostUpdateWithoutApplicantsInputSchema: z.ZodType<Prisma.JobPostUpdateWithoutApplicantsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  organisationName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modeOfWork: z.union([ z.lazy(() => modeSchema),z.lazy(() => NullableEnummodeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minExperience: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  maxExperience: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  minSalary: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  maxSalary: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jobType: z.union([ z.lazy(() => JobTypeSchema),z.lazy(() => EnumJobTypeFieldUpdateOperationsInputSchema) ]).optional(),
  postedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  whoCanApply: z.union([ z.lazy(() => ExperienceEnumSchema),z.lazy(() => EnumExperienceEnumFieldUpdateOperationsInputSchema) ]).optional(),
  skills: z.lazy(() => SkillUpdateManyWithoutJobPostNestedInputSchema).optional(),
  perks: z.lazy(() => PerkUpdateManyWithoutJobPostNestedInputSchema).optional(),
  postedBy: z.lazy(() => UserUpdateOneRequiredWithoutPostedJobsNestedInputSchema).optional()
}).strict();

export const JobPostUncheckedUpdateWithoutApplicantsInputSchema: z.ZodType<Prisma.JobPostUncheckedUpdateWithoutApplicantsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  organisationName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modeOfWork: z.union([ z.lazy(() => modeSchema),z.lazy(() => NullableEnummodeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minExperience: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  maxExperience: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  minSalary: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  maxSalary: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jobType: z.union([ z.lazy(() => JobTypeSchema),z.lazy(() => EnumJobTypeFieldUpdateOperationsInputSchema) ]).optional(),
  postedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  whoCanApply: z.union([ z.lazy(() => ExperienceEnumSchema),z.lazy(() => EnumExperienceEnumFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  skills: z.lazy(() => SkillUncheckedUpdateManyWithoutJobPostNestedInputSchema).optional(),
  perks: z.lazy(() => PerkUncheckedUpdateManyWithoutJobPostNestedInputSchema).optional()
}).strict();

export const SkillCreateWithoutUserInputSchema: z.ZodType<Prisma.SkillCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  JobPost: z.lazy(() => JobPostCreateNestedOneWithoutSkillsInputSchema).optional()
}).strict();

export const SkillUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SkillUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  jobPostId: z.string().optional().nullable()
}).strict();

export const SkillCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SkillCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SkillWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SkillCreateWithoutUserInputSchema),z.lazy(() => SkillUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SkillCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SkillCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SkillCreateManyUserInputSchema),z.lazy(() => SkillCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const MediaCreateWithoutUserInputSchema: z.ZodType<Prisma.MediaCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  mediaType: z.string(),
  url: z.string(),
  mediaName: z.string(),
  applicant: z.lazy(() => ApplicantCreateNestedOneWithoutResumeInputSchema).optional()
}).strict();

export const MediaUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.MediaUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  mediaType: z.string(),
  url: z.string(),
  mediaName: z.string(),
  applicantId: z.string().optional().nullable()
}).strict();

export const MediaCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.MediaCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => MediaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MediaCreateWithoutUserInputSchema),z.lazy(() => MediaUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const MediaCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.MediaCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MediaCreateManyUserInputSchema),z.lazy(() => MediaCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const LocationCreateWithoutUserInputSchema: z.ZodType<Prisma.LocationCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  address: z.string().optional().nullable(),
  postalCode: z.number().int(),
  city: z.lazy(() => CityCreateNestedOneWithoutLocationInputSchema)
}).strict();

export const LocationUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.LocationUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  address: z.string().optional().nullable(),
  postalCode: z.number().int(),
  cityId: z.string()
}).strict();

export const LocationCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.LocationCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => LocationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LocationCreateWithoutUserInputSchema),z.lazy(() => LocationUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const JobPostCreateWithoutPostedByInputSchema: z.ZodType<Prisma.JobPostCreateWithoutPostedByInput> = z.object({
  id: z.string().cuid().optional(),
  jobTitle: z.string(),
  jobDescription: z.string(),
  organisationName: z.string(),
  modeOfWork: z.lazy(() => modeSchema).optional().nullable(),
  minExperience: z.coerce.number().optional(),
  maxExperience: z.coerce.number(),
  minSalary: z.coerce.number().optional(),
  maxSalary: z.coerce.number(),
  jobType: z.lazy(() => JobTypeSchema).optional(),
  postedAt: z.coerce.date().optional(),
  whoCanApply: z.lazy(() => ExperienceEnumSchema).optional(),
  skills: z.lazy(() => SkillCreateNestedManyWithoutJobPostInputSchema).optional(),
  perks: z.lazy(() => PerkCreateNestedManyWithoutJobPostInputSchema).optional(),
  applicants: z.lazy(() => ApplicantCreateNestedManyWithoutJobPostInputSchema).optional()
}).strict();

export const JobPostUncheckedCreateWithoutPostedByInputSchema: z.ZodType<Prisma.JobPostUncheckedCreateWithoutPostedByInput> = z.object({
  id: z.string().cuid().optional(),
  jobTitle: z.string(),
  jobDescription: z.string(),
  organisationName: z.string(),
  modeOfWork: z.lazy(() => modeSchema).optional().nullable(),
  minExperience: z.coerce.number().optional(),
  maxExperience: z.coerce.number(),
  minSalary: z.coerce.number().optional(),
  maxSalary: z.coerce.number(),
  jobType: z.lazy(() => JobTypeSchema).optional(),
  postedAt: z.coerce.date().optional(),
  whoCanApply: z.lazy(() => ExperienceEnumSchema).optional(),
  skills: z.lazy(() => SkillUncheckedCreateNestedManyWithoutJobPostInputSchema).optional(),
  perks: z.lazy(() => PerkUncheckedCreateNestedManyWithoutJobPostInputSchema).optional(),
  applicants: z.lazy(() => ApplicantUncheckedCreateNestedManyWithoutJobPostInputSchema).optional()
}).strict();

export const JobPostCreateOrConnectWithoutPostedByInputSchema: z.ZodType<Prisma.JobPostCreateOrConnectWithoutPostedByInput> = z.object({
  where: z.lazy(() => JobPostWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => JobPostCreateWithoutPostedByInputSchema),z.lazy(() => JobPostUncheckedCreateWithoutPostedByInputSchema) ]),
}).strict();

export const JobPostCreateManyPostedByInputEnvelopeSchema: z.ZodType<Prisma.JobPostCreateManyPostedByInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => JobPostCreateManyPostedByInputSchema),z.lazy(() => JobPostCreateManyPostedByInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ApplicantCreateWithoutUserInputSchema: z.ZodType<Prisma.ApplicantCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  coverLetter: z.string(),
  availability: z.string(),
  approvalStatus: z.lazy(() => ApprovalStatusSchema).optional(),
  resume: z.lazy(() => MediaCreateNestedOneWithoutApplicantInputSchema).optional(),
  jobPost: z.lazy(() => JobPostCreateNestedOneWithoutApplicantsInputSchema)
}).strict();

export const ApplicantUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ApplicantUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  coverLetter: z.string(),
  availability: z.string(),
  approvalStatus: z.lazy(() => ApprovalStatusSchema).optional(),
  jobId: z.string(),
  resume: z.lazy(() => MediaUncheckedCreateNestedOneWithoutApplicantInputSchema).optional()
}).strict();

export const ApplicantCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ApplicantCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ApplicantWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ApplicantCreateWithoutUserInputSchema),z.lazy(() => ApplicantUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ApplicantCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ApplicantCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ApplicantCreateManyUserInputSchema),z.lazy(() => ApplicantCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  expiresAt: z.coerce.date()
}).strict();

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  expiresAt: z.coerce.date()
}).strict();

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionCreateManyUserInputSchema),z.lazy(() => SessionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SkillUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SkillUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SkillWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SkillUpdateWithoutUserInputSchema),z.lazy(() => SkillUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SkillCreateWithoutUserInputSchema),z.lazy(() => SkillUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SkillUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SkillUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SkillWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SkillUpdateWithoutUserInputSchema),z.lazy(() => SkillUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SkillUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SkillUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SkillScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SkillUpdateManyMutationInputSchema),z.lazy(() => SkillUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const MediaUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.MediaUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => MediaWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MediaUpdateWithoutUserInputSchema),z.lazy(() => MediaUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => MediaCreateWithoutUserInputSchema),z.lazy(() => MediaUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const MediaUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.MediaUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => MediaWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MediaUpdateWithoutUserInputSchema),z.lazy(() => MediaUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const MediaUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.MediaUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => MediaScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MediaUpdateManyMutationInputSchema),z.lazy(() => MediaUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const MediaScalarWhereInputSchema: z.ZodType<Prisma.MediaScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MediaScalarWhereInputSchema),z.lazy(() => MediaScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MediaScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MediaScalarWhereInputSchema),z.lazy(() => MediaScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  mediaType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  mediaName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  applicantId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const LocationUpsertWithoutUserInputSchema: z.ZodType<Prisma.LocationUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => LocationUpdateWithoutUserInputSchema),z.lazy(() => LocationUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => LocationCreateWithoutUserInputSchema),z.lazy(() => LocationUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => LocationWhereInputSchema).optional()
}).strict();

export const LocationUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.LocationUpdateToOneWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => LocationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => LocationUpdateWithoutUserInputSchema),z.lazy(() => LocationUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const LocationUpdateWithoutUserInputSchema: z.ZodType<Prisma.LocationUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  postalCode: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.lazy(() => CityUpdateOneRequiredWithoutLocationNestedInputSchema).optional()
}).strict();

export const LocationUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.LocationUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  postalCode: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cityId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const JobPostUpsertWithWhereUniqueWithoutPostedByInputSchema: z.ZodType<Prisma.JobPostUpsertWithWhereUniqueWithoutPostedByInput> = z.object({
  where: z.lazy(() => JobPostWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => JobPostUpdateWithoutPostedByInputSchema),z.lazy(() => JobPostUncheckedUpdateWithoutPostedByInputSchema) ]),
  create: z.union([ z.lazy(() => JobPostCreateWithoutPostedByInputSchema),z.lazy(() => JobPostUncheckedCreateWithoutPostedByInputSchema) ]),
}).strict();

export const JobPostUpdateWithWhereUniqueWithoutPostedByInputSchema: z.ZodType<Prisma.JobPostUpdateWithWhereUniqueWithoutPostedByInput> = z.object({
  where: z.lazy(() => JobPostWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => JobPostUpdateWithoutPostedByInputSchema),z.lazy(() => JobPostUncheckedUpdateWithoutPostedByInputSchema) ]),
}).strict();

export const JobPostUpdateManyWithWhereWithoutPostedByInputSchema: z.ZodType<Prisma.JobPostUpdateManyWithWhereWithoutPostedByInput> = z.object({
  where: z.lazy(() => JobPostScalarWhereInputSchema),
  data: z.union([ z.lazy(() => JobPostUpdateManyMutationInputSchema),z.lazy(() => JobPostUncheckedUpdateManyWithoutPostedByInputSchema) ]),
}).strict();

export const JobPostScalarWhereInputSchema: z.ZodType<Prisma.JobPostScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => JobPostScalarWhereInputSchema),z.lazy(() => JobPostScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => JobPostScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JobPostScalarWhereInputSchema),z.lazy(() => JobPostScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  jobTitle: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  jobDescription: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  organisationName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  modeOfWork: z.union([ z.lazy(() => EnummodeNullableFilterSchema),z.lazy(() => modeSchema) ]).optional().nullable(),
  minExperience: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  maxExperience: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  minSalary: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  maxSalary: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  jobType: z.union([ z.lazy(() => EnumJobTypeFilterSchema),z.lazy(() => JobTypeSchema) ]).optional(),
  postedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  whoCanApply: z.union([ z.lazy(() => EnumExperienceEnumFilterSchema),z.lazy(() => ExperienceEnumSchema) ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const ApplicantUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ApplicantUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ApplicantWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ApplicantUpdateWithoutUserInputSchema),z.lazy(() => ApplicantUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ApplicantCreateWithoutUserInputSchema),z.lazy(() => ApplicantUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ApplicantUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ApplicantUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ApplicantWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ApplicantUpdateWithoutUserInputSchema),z.lazy(() => ApplicantUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const ApplicantUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ApplicantUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ApplicantScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ApplicantUpdateManyMutationInputSchema),z.lazy(() => ApplicantUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateWithoutSkillsInputSchema: z.ZodType<Prisma.UserCreateWithoutSkillsInput> = z.object({
  id: z.string().cuid().optional(),
  username: z.string(),
  firstName: z.string(),
  secondName: z.string(),
  email: z.string(),
  hashedPassword: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  media: z.lazy(() => MediaCreateNestedManyWithoutUserInputSchema).optional(),
  address: z.lazy(() => LocationCreateNestedOneWithoutUserInputSchema).optional(),
  postedJobs: z.lazy(() => JobPostCreateNestedManyWithoutPostedByInputSchema).optional(),
  appliedJobs: z.lazy(() => ApplicantCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSkillsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSkillsInput> = z.object({
  id: z.string().cuid().optional(),
  username: z.string(),
  firstName: z.string(),
  secondName: z.string(),
  email: z.string(),
  hashedPassword: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  locationId: z.string().optional().nullable(),
  media: z.lazy(() => MediaUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  postedJobs: z.lazy(() => JobPostUncheckedCreateNestedManyWithoutPostedByInputSchema).optional(),
  appliedJobs: z.lazy(() => ApplicantUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSkillsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSkillsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSkillsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSkillsInputSchema) ]),
}).strict();

export const JobPostCreateWithoutSkillsInputSchema: z.ZodType<Prisma.JobPostCreateWithoutSkillsInput> = z.object({
  id: z.string().cuid().optional(),
  jobTitle: z.string(),
  jobDescription: z.string(),
  organisationName: z.string(),
  modeOfWork: z.lazy(() => modeSchema).optional().nullable(),
  minExperience: z.coerce.number().optional(),
  maxExperience: z.coerce.number(),
  minSalary: z.coerce.number().optional(),
  maxSalary: z.coerce.number(),
  jobType: z.lazy(() => JobTypeSchema).optional(),
  postedAt: z.coerce.date().optional(),
  whoCanApply: z.lazy(() => ExperienceEnumSchema).optional(),
  perks: z.lazy(() => PerkCreateNestedManyWithoutJobPostInputSchema).optional(),
  applicants: z.lazy(() => ApplicantCreateNestedManyWithoutJobPostInputSchema).optional(),
  postedBy: z.lazy(() => UserCreateNestedOneWithoutPostedJobsInputSchema)
}).strict();

export const JobPostUncheckedCreateWithoutSkillsInputSchema: z.ZodType<Prisma.JobPostUncheckedCreateWithoutSkillsInput> = z.object({
  id: z.string().cuid().optional(),
  jobTitle: z.string(),
  jobDescription: z.string(),
  organisationName: z.string(),
  modeOfWork: z.lazy(() => modeSchema).optional().nullable(),
  minExperience: z.coerce.number().optional(),
  maxExperience: z.coerce.number(),
  minSalary: z.coerce.number().optional(),
  maxSalary: z.coerce.number(),
  jobType: z.lazy(() => JobTypeSchema).optional(),
  postedAt: z.coerce.date().optional(),
  whoCanApply: z.lazy(() => ExperienceEnumSchema).optional(),
  userId: z.string(),
  perks: z.lazy(() => PerkUncheckedCreateNestedManyWithoutJobPostInputSchema).optional(),
  applicants: z.lazy(() => ApplicantUncheckedCreateNestedManyWithoutJobPostInputSchema).optional()
}).strict();

export const JobPostCreateOrConnectWithoutSkillsInputSchema: z.ZodType<Prisma.JobPostCreateOrConnectWithoutSkillsInput> = z.object({
  where: z.lazy(() => JobPostWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => JobPostCreateWithoutSkillsInputSchema),z.lazy(() => JobPostUncheckedCreateWithoutSkillsInputSchema) ]),
}).strict();

export const UserUpsertWithoutSkillsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSkillsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSkillsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSkillsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSkillsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSkillsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSkillsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSkillsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSkillsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSkillsInputSchema) ]),
}).strict();

export const UserUpdateWithoutSkillsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSkillsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  secondName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  media: z.lazy(() => MediaUpdateManyWithoutUserNestedInputSchema).optional(),
  address: z.lazy(() => LocationUpdateOneWithoutUserNestedInputSchema).optional(),
  postedJobs: z.lazy(() => JobPostUpdateManyWithoutPostedByNestedInputSchema).optional(),
  appliedJobs: z.lazy(() => ApplicantUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSkillsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSkillsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  secondName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  locationId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  media: z.lazy(() => MediaUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  postedJobs: z.lazy(() => JobPostUncheckedUpdateManyWithoutPostedByNestedInputSchema).optional(),
  appliedJobs: z.lazy(() => ApplicantUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const JobPostUpsertWithoutSkillsInputSchema: z.ZodType<Prisma.JobPostUpsertWithoutSkillsInput> = z.object({
  update: z.union([ z.lazy(() => JobPostUpdateWithoutSkillsInputSchema),z.lazy(() => JobPostUncheckedUpdateWithoutSkillsInputSchema) ]),
  create: z.union([ z.lazy(() => JobPostCreateWithoutSkillsInputSchema),z.lazy(() => JobPostUncheckedCreateWithoutSkillsInputSchema) ]),
  where: z.lazy(() => JobPostWhereInputSchema).optional()
}).strict();

export const JobPostUpdateToOneWithWhereWithoutSkillsInputSchema: z.ZodType<Prisma.JobPostUpdateToOneWithWhereWithoutSkillsInput> = z.object({
  where: z.lazy(() => JobPostWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => JobPostUpdateWithoutSkillsInputSchema),z.lazy(() => JobPostUncheckedUpdateWithoutSkillsInputSchema) ]),
}).strict();

export const JobPostUpdateWithoutSkillsInputSchema: z.ZodType<Prisma.JobPostUpdateWithoutSkillsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  organisationName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modeOfWork: z.union([ z.lazy(() => modeSchema),z.lazy(() => NullableEnummodeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minExperience: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  maxExperience: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  minSalary: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  maxSalary: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jobType: z.union([ z.lazy(() => JobTypeSchema),z.lazy(() => EnumJobTypeFieldUpdateOperationsInputSchema) ]).optional(),
  postedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  whoCanApply: z.union([ z.lazy(() => ExperienceEnumSchema),z.lazy(() => EnumExperienceEnumFieldUpdateOperationsInputSchema) ]).optional(),
  perks: z.lazy(() => PerkUpdateManyWithoutJobPostNestedInputSchema).optional(),
  applicants: z.lazy(() => ApplicantUpdateManyWithoutJobPostNestedInputSchema).optional(),
  postedBy: z.lazy(() => UserUpdateOneRequiredWithoutPostedJobsNestedInputSchema).optional()
}).strict();

export const JobPostUncheckedUpdateWithoutSkillsInputSchema: z.ZodType<Prisma.JobPostUncheckedUpdateWithoutSkillsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  organisationName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modeOfWork: z.union([ z.lazy(() => modeSchema),z.lazy(() => NullableEnummodeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minExperience: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  maxExperience: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  minSalary: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  maxSalary: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jobType: z.union([ z.lazy(() => JobTypeSchema),z.lazy(() => EnumJobTypeFieldUpdateOperationsInputSchema) ]).optional(),
  postedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  whoCanApply: z.union([ z.lazy(() => ExperienceEnumSchema),z.lazy(() => EnumExperienceEnumFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  perks: z.lazy(() => PerkUncheckedUpdateManyWithoutJobPostNestedInputSchema).optional(),
  applicants: z.lazy(() => ApplicantUncheckedUpdateManyWithoutJobPostNestedInputSchema).optional()
}).strict();

export const JobPostCreateWithoutPerksInputSchema: z.ZodType<Prisma.JobPostCreateWithoutPerksInput> = z.object({
  id: z.string().cuid().optional(),
  jobTitle: z.string(),
  jobDescription: z.string(),
  organisationName: z.string(),
  modeOfWork: z.lazy(() => modeSchema).optional().nullable(),
  minExperience: z.coerce.number().optional(),
  maxExperience: z.coerce.number(),
  minSalary: z.coerce.number().optional(),
  maxSalary: z.coerce.number(),
  jobType: z.lazy(() => JobTypeSchema).optional(),
  postedAt: z.coerce.date().optional(),
  whoCanApply: z.lazy(() => ExperienceEnumSchema).optional(),
  skills: z.lazy(() => SkillCreateNestedManyWithoutJobPostInputSchema).optional(),
  applicants: z.lazy(() => ApplicantCreateNestedManyWithoutJobPostInputSchema).optional(),
  postedBy: z.lazy(() => UserCreateNestedOneWithoutPostedJobsInputSchema)
}).strict();

export const JobPostUncheckedCreateWithoutPerksInputSchema: z.ZodType<Prisma.JobPostUncheckedCreateWithoutPerksInput> = z.object({
  id: z.string().cuid().optional(),
  jobTitle: z.string(),
  jobDescription: z.string(),
  organisationName: z.string(),
  modeOfWork: z.lazy(() => modeSchema).optional().nullable(),
  minExperience: z.coerce.number().optional(),
  maxExperience: z.coerce.number(),
  minSalary: z.coerce.number().optional(),
  maxSalary: z.coerce.number(),
  jobType: z.lazy(() => JobTypeSchema).optional(),
  postedAt: z.coerce.date().optional(),
  whoCanApply: z.lazy(() => ExperienceEnumSchema).optional(),
  userId: z.string(),
  skills: z.lazy(() => SkillUncheckedCreateNestedManyWithoutJobPostInputSchema).optional(),
  applicants: z.lazy(() => ApplicantUncheckedCreateNestedManyWithoutJobPostInputSchema).optional()
}).strict();

export const JobPostCreateOrConnectWithoutPerksInputSchema: z.ZodType<Prisma.JobPostCreateOrConnectWithoutPerksInput> = z.object({
  where: z.lazy(() => JobPostWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => JobPostCreateWithoutPerksInputSchema),z.lazy(() => JobPostUncheckedCreateWithoutPerksInputSchema) ]),
}).strict();

export const JobPostUpsertWithoutPerksInputSchema: z.ZodType<Prisma.JobPostUpsertWithoutPerksInput> = z.object({
  update: z.union([ z.lazy(() => JobPostUpdateWithoutPerksInputSchema),z.lazy(() => JobPostUncheckedUpdateWithoutPerksInputSchema) ]),
  create: z.union([ z.lazy(() => JobPostCreateWithoutPerksInputSchema),z.lazy(() => JobPostUncheckedCreateWithoutPerksInputSchema) ]),
  where: z.lazy(() => JobPostWhereInputSchema).optional()
}).strict();

export const JobPostUpdateToOneWithWhereWithoutPerksInputSchema: z.ZodType<Prisma.JobPostUpdateToOneWithWhereWithoutPerksInput> = z.object({
  where: z.lazy(() => JobPostWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => JobPostUpdateWithoutPerksInputSchema),z.lazy(() => JobPostUncheckedUpdateWithoutPerksInputSchema) ]),
}).strict();

export const JobPostUpdateWithoutPerksInputSchema: z.ZodType<Prisma.JobPostUpdateWithoutPerksInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  organisationName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modeOfWork: z.union([ z.lazy(() => modeSchema),z.lazy(() => NullableEnummodeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minExperience: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  maxExperience: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  minSalary: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  maxSalary: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jobType: z.union([ z.lazy(() => JobTypeSchema),z.lazy(() => EnumJobTypeFieldUpdateOperationsInputSchema) ]).optional(),
  postedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  whoCanApply: z.union([ z.lazy(() => ExperienceEnumSchema),z.lazy(() => EnumExperienceEnumFieldUpdateOperationsInputSchema) ]).optional(),
  skills: z.lazy(() => SkillUpdateManyWithoutJobPostNestedInputSchema).optional(),
  applicants: z.lazy(() => ApplicantUpdateManyWithoutJobPostNestedInputSchema).optional(),
  postedBy: z.lazy(() => UserUpdateOneRequiredWithoutPostedJobsNestedInputSchema).optional()
}).strict();

export const JobPostUncheckedUpdateWithoutPerksInputSchema: z.ZodType<Prisma.JobPostUncheckedUpdateWithoutPerksInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  organisationName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modeOfWork: z.union([ z.lazy(() => modeSchema),z.lazy(() => NullableEnummodeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minExperience: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  maxExperience: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  minSalary: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  maxSalary: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jobType: z.union([ z.lazy(() => JobTypeSchema),z.lazy(() => EnumJobTypeFieldUpdateOperationsInputSchema) ]).optional(),
  postedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  whoCanApply: z.union([ z.lazy(() => ExperienceEnumSchema),z.lazy(() => EnumExperienceEnumFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  skills: z.lazy(() => SkillUncheckedUpdateManyWithoutJobPostNestedInputSchema).optional(),
  applicants: z.lazy(() => ApplicantUncheckedUpdateManyWithoutJobPostNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutMediaInputSchema: z.ZodType<Prisma.UserCreateWithoutMediaInput> = z.object({
  id: z.string().cuid().optional(),
  username: z.string(),
  firstName: z.string(),
  secondName: z.string(),
  email: z.string(),
  hashedPassword: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  skills: z.lazy(() => SkillCreateNestedManyWithoutUserInputSchema).optional(),
  address: z.lazy(() => LocationCreateNestedOneWithoutUserInputSchema).optional(),
  postedJobs: z.lazy(() => JobPostCreateNestedManyWithoutPostedByInputSchema).optional(),
  appliedJobs: z.lazy(() => ApplicantCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutMediaInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutMediaInput> = z.object({
  id: z.string().cuid().optional(),
  username: z.string(),
  firstName: z.string(),
  secondName: z.string(),
  email: z.string(),
  hashedPassword: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  locationId: z.string().optional().nullable(),
  skills: z.lazy(() => SkillUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  postedJobs: z.lazy(() => JobPostUncheckedCreateNestedManyWithoutPostedByInputSchema).optional(),
  appliedJobs: z.lazy(() => ApplicantUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutMediaInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutMediaInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutMediaInputSchema),z.lazy(() => UserUncheckedCreateWithoutMediaInputSchema) ]),
}).strict();

export const ApplicantCreateWithoutResumeInputSchema: z.ZodType<Prisma.ApplicantCreateWithoutResumeInput> = z.object({
  id: z.string().cuid().optional(),
  coverLetter: z.string(),
  availability: z.string(),
  approvalStatus: z.lazy(() => ApprovalStatusSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAppliedJobsInputSchema),
  jobPost: z.lazy(() => JobPostCreateNestedOneWithoutApplicantsInputSchema)
}).strict();

export const ApplicantUncheckedCreateWithoutResumeInputSchema: z.ZodType<Prisma.ApplicantUncheckedCreateWithoutResumeInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  coverLetter: z.string(),
  availability: z.string(),
  approvalStatus: z.lazy(() => ApprovalStatusSchema).optional(),
  jobId: z.string()
}).strict();

export const ApplicantCreateOrConnectWithoutResumeInputSchema: z.ZodType<Prisma.ApplicantCreateOrConnectWithoutResumeInput> = z.object({
  where: z.lazy(() => ApplicantWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ApplicantCreateWithoutResumeInputSchema),z.lazy(() => ApplicantUncheckedCreateWithoutResumeInputSchema) ]),
}).strict();

export const UserUpsertWithoutMediaInputSchema: z.ZodType<Prisma.UserUpsertWithoutMediaInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutMediaInputSchema),z.lazy(() => UserUncheckedUpdateWithoutMediaInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutMediaInputSchema),z.lazy(() => UserUncheckedCreateWithoutMediaInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutMediaInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutMediaInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutMediaInputSchema),z.lazy(() => UserUncheckedUpdateWithoutMediaInputSchema) ]),
}).strict();

export const UserUpdateWithoutMediaInputSchema: z.ZodType<Prisma.UserUpdateWithoutMediaInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  secondName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  skills: z.lazy(() => SkillUpdateManyWithoutUserNestedInputSchema).optional(),
  address: z.lazy(() => LocationUpdateOneWithoutUserNestedInputSchema).optional(),
  postedJobs: z.lazy(() => JobPostUpdateManyWithoutPostedByNestedInputSchema).optional(),
  appliedJobs: z.lazy(() => ApplicantUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutMediaInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutMediaInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  secondName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  locationId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skills: z.lazy(() => SkillUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  postedJobs: z.lazy(() => JobPostUncheckedUpdateManyWithoutPostedByNestedInputSchema).optional(),
  appliedJobs: z.lazy(() => ApplicantUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const ApplicantUpsertWithoutResumeInputSchema: z.ZodType<Prisma.ApplicantUpsertWithoutResumeInput> = z.object({
  update: z.union([ z.lazy(() => ApplicantUpdateWithoutResumeInputSchema),z.lazy(() => ApplicantUncheckedUpdateWithoutResumeInputSchema) ]),
  create: z.union([ z.lazy(() => ApplicantCreateWithoutResumeInputSchema),z.lazy(() => ApplicantUncheckedCreateWithoutResumeInputSchema) ]),
  where: z.lazy(() => ApplicantWhereInputSchema).optional()
}).strict();

export const ApplicantUpdateToOneWithWhereWithoutResumeInputSchema: z.ZodType<Prisma.ApplicantUpdateToOneWithWhereWithoutResumeInput> = z.object({
  where: z.lazy(() => ApplicantWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ApplicantUpdateWithoutResumeInputSchema),z.lazy(() => ApplicantUncheckedUpdateWithoutResumeInputSchema) ]),
}).strict();

export const ApplicantUpdateWithoutResumeInputSchema: z.ZodType<Prisma.ApplicantUpdateWithoutResumeInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coverLetter: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  availability: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  approvalStatus: z.union([ z.lazy(() => ApprovalStatusSchema),z.lazy(() => EnumApprovalStatusFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAppliedJobsNestedInputSchema).optional(),
  jobPost: z.lazy(() => JobPostUpdateOneRequiredWithoutApplicantsNestedInputSchema).optional()
}).strict();

export const ApplicantUncheckedUpdateWithoutResumeInputSchema: z.ZodType<Prisma.ApplicantUncheckedUpdateWithoutResumeInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coverLetter: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  availability: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  approvalStatus: z.union([ z.lazy(() => ApprovalStatusSchema),z.lazy(() => EnumApprovalStatusFieldUpdateOperationsInputSchema) ]).optional(),
  jobId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  username: z.string(),
  firstName: z.string(),
  secondName: z.string(),
  email: z.string(),
  hashedPassword: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  skills: z.lazy(() => SkillCreateNestedManyWithoutUserInputSchema).optional(),
  media: z.lazy(() => MediaCreateNestedManyWithoutUserInputSchema).optional(),
  address: z.lazy(() => LocationCreateNestedOneWithoutUserInputSchema).optional(),
  postedJobs: z.lazy(() => JobPostCreateNestedManyWithoutPostedByInputSchema).optional(),
  appliedJobs: z.lazy(() => ApplicantCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  username: z.string(),
  firstName: z.string(),
  secondName: z.string(),
  email: z.string(),
  hashedPassword: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  locationId: z.string().optional().nullable(),
  skills: z.lazy(() => SkillUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  media: z.lazy(() => MediaUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  postedJobs: z.lazy(() => JobPostUncheckedCreateNestedManyWithoutPostedByInputSchema).optional(),
  appliedJobs: z.lazy(() => ApplicantUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  secondName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  skills: z.lazy(() => SkillUpdateManyWithoutUserNestedInputSchema).optional(),
  media: z.lazy(() => MediaUpdateManyWithoutUserNestedInputSchema).optional(),
  address: z.lazy(() => LocationUpdateOneWithoutUserNestedInputSchema).optional(),
  postedJobs: z.lazy(() => JobPostUpdateManyWithoutPostedByNestedInputSchema).optional(),
  appliedJobs: z.lazy(() => ApplicantUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  secondName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  locationId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skills: z.lazy(() => SkillUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  media: z.lazy(() => MediaUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  postedJobs: z.lazy(() => JobPostUncheckedUpdateManyWithoutPostedByNestedInputSchema).optional(),
  appliedJobs: z.lazy(() => ApplicantUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutAddressInputSchema: z.ZodType<Prisma.UserCreateWithoutAddressInput> = z.object({
  id: z.string().cuid().optional(),
  username: z.string(),
  firstName: z.string(),
  secondName: z.string(),
  email: z.string(),
  hashedPassword: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  skills: z.lazy(() => SkillCreateNestedManyWithoutUserInputSchema).optional(),
  media: z.lazy(() => MediaCreateNestedManyWithoutUserInputSchema).optional(),
  postedJobs: z.lazy(() => JobPostCreateNestedManyWithoutPostedByInputSchema).optional(),
  appliedJobs: z.lazy(() => ApplicantCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAddressInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAddressInput> = z.object({
  id: z.string().cuid().optional(),
  username: z.string(),
  firstName: z.string(),
  secondName: z.string(),
  email: z.string(),
  hashedPassword: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  skills: z.lazy(() => SkillUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  media: z.lazy(() => MediaUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  postedJobs: z.lazy(() => JobPostUncheckedCreateNestedManyWithoutPostedByInputSchema).optional(),
  appliedJobs: z.lazy(() => ApplicantUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAddressInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAddressInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAddressInputSchema),z.lazy(() => UserUncheckedCreateWithoutAddressInputSchema) ]),
}).strict();

export const UserCreateManyAddressInputEnvelopeSchema: z.ZodType<Prisma.UserCreateManyAddressInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserCreateManyAddressInputSchema),z.lazy(() => UserCreateManyAddressInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CityCreateWithoutLocationInputSchema: z.ZodType<Prisma.CityCreateWithoutLocationInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  state: z.string()
}).strict();

export const CityUncheckedCreateWithoutLocationInputSchema: z.ZodType<Prisma.CityUncheckedCreateWithoutLocationInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  state: z.string()
}).strict();

export const CityCreateOrConnectWithoutLocationInputSchema: z.ZodType<Prisma.CityCreateOrConnectWithoutLocationInput> = z.object({
  where: z.lazy(() => CityWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CityCreateWithoutLocationInputSchema),z.lazy(() => CityUncheckedCreateWithoutLocationInputSchema) ]),
}).strict();

export const UserUpsertWithWhereUniqueWithoutAddressInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutAddressInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserUpdateWithoutAddressInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAddressInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAddressInputSchema),z.lazy(() => UserUncheckedCreateWithoutAddressInputSchema) ]),
}).strict();

export const UserUpdateWithWhereUniqueWithoutAddressInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutAddressInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserUpdateWithoutAddressInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAddressInputSchema) ]),
}).strict();

export const UserUpdateManyWithWhereWithoutAddressInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutAddressInput> = z.object({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserUpdateManyMutationInputSchema),z.lazy(() => UserUncheckedUpdateManyWithoutAddressInputSchema) ]),
}).strict();

export const UserScalarWhereInputSchema: z.ZodType<Prisma.UserScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  secondName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hashedPassword: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  locationId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const CityUpsertWithoutLocationInputSchema: z.ZodType<Prisma.CityUpsertWithoutLocationInput> = z.object({
  update: z.union([ z.lazy(() => CityUpdateWithoutLocationInputSchema),z.lazy(() => CityUncheckedUpdateWithoutLocationInputSchema) ]),
  create: z.union([ z.lazy(() => CityCreateWithoutLocationInputSchema),z.lazy(() => CityUncheckedCreateWithoutLocationInputSchema) ]),
  where: z.lazy(() => CityWhereInputSchema).optional()
}).strict();

export const CityUpdateToOneWithWhereWithoutLocationInputSchema: z.ZodType<Prisma.CityUpdateToOneWithWhereWithoutLocationInput> = z.object({
  where: z.lazy(() => CityWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CityUpdateWithoutLocationInputSchema),z.lazy(() => CityUncheckedUpdateWithoutLocationInputSchema) ]),
}).strict();

export const CityUpdateWithoutLocationInputSchema: z.ZodType<Prisma.CityUpdateWithoutLocationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  state: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CityUncheckedUpdateWithoutLocationInputSchema: z.ZodType<Prisma.CityUncheckedUpdateWithoutLocationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  state: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LocationCreateWithoutCityInputSchema: z.ZodType<Prisma.LocationCreateWithoutCityInput> = z.object({
  id: z.string().cuid().optional(),
  address: z.string().optional().nullable(),
  postalCode: z.number().int(),
  User: z.lazy(() => UserCreateNestedManyWithoutAddressInputSchema).optional()
}).strict();

export const LocationUncheckedCreateWithoutCityInputSchema: z.ZodType<Prisma.LocationUncheckedCreateWithoutCityInput> = z.object({
  id: z.string().cuid().optional(),
  address: z.string().optional().nullable(),
  postalCode: z.number().int(),
  User: z.lazy(() => UserUncheckedCreateNestedManyWithoutAddressInputSchema).optional()
}).strict();

export const LocationCreateOrConnectWithoutCityInputSchema: z.ZodType<Prisma.LocationCreateOrConnectWithoutCityInput> = z.object({
  where: z.lazy(() => LocationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LocationCreateWithoutCityInputSchema),z.lazy(() => LocationUncheckedCreateWithoutCityInputSchema) ]),
}).strict();

export const LocationCreateManyCityInputEnvelopeSchema: z.ZodType<Prisma.LocationCreateManyCityInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => LocationCreateManyCityInputSchema),z.lazy(() => LocationCreateManyCityInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const LocationUpsertWithWhereUniqueWithoutCityInputSchema: z.ZodType<Prisma.LocationUpsertWithWhereUniqueWithoutCityInput> = z.object({
  where: z.lazy(() => LocationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LocationUpdateWithoutCityInputSchema),z.lazy(() => LocationUncheckedUpdateWithoutCityInputSchema) ]),
  create: z.union([ z.lazy(() => LocationCreateWithoutCityInputSchema),z.lazy(() => LocationUncheckedCreateWithoutCityInputSchema) ]),
}).strict();

export const LocationUpdateWithWhereUniqueWithoutCityInputSchema: z.ZodType<Prisma.LocationUpdateWithWhereUniqueWithoutCityInput> = z.object({
  where: z.lazy(() => LocationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LocationUpdateWithoutCityInputSchema),z.lazy(() => LocationUncheckedUpdateWithoutCityInputSchema) ]),
}).strict();

export const LocationUpdateManyWithWhereWithoutCityInputSchema: z.ZodType<Prisma.LocationUpdateManyWithWhereWithoutCityInput> = z.object({
  where: z.lazy(() => LocationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LocationUpdateManyMutationInputSchema),z.lazy(() => LocationUncheckedUpdateManyWithoutCityInputSchema) ]),
}).strict();

export const LocationScalarWhereInputSchema: z.ZodType<Prisma.LocationScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LocationScalarWhereInputSchema),z.lazy(() => LocationScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LocationScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LocationScalarWhereInputSchema),z.lazy(() => LocationScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  postalCode: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  cityId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const SkillCreateManyJobPostInputSchema: z.ZodType<Prisma.SkillCreateManyJobPostInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  userId: z.string().optional().nullable()
}).strict();

export const PerkCreateManyJobPostInputSchema: z.ZodType<Prisma.PerkCreateManyJobPostInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string()
}).strict();

export const ApplicantCreateManyJobPostInputSchema: z.ZodType<Prisma.ApplicantCreateManyJobPostInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  coverLetter: z.string(),
  availability: z.string(),
  approvalStatus: z.lazy(() => ApprovalStatusSchema).optional()
}).strict();

export const SkillUpdateWithoutJobPostInputSchema: z.ZodType<Prisma.SkillUpdateWithoutJobPostInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutSkillsNestedInputSchema).optional()
}).strict();

export const SkillUncheckedUpdateWithoutJobPostInputSchema: z.ZodType<Prisma.SkillUncheckedUpdateWithoutJobPostInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SkillUncheckedUpdateManyWithoutJobPostInputSchema: z.ZodType<Prisma.SkillUncheckedUpdateManyWithoutJobPostInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PerkUpdateWithoutJobPostInputSchema: z.ZodType<Prisma.PerkUpdateWithoutJobPostInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PerkUncheckedUpdateWithoutJobPostInputSchema: z.ZodType<Prisma.PerkUncheckedUpdateWithoutJobPostInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PerkUncheckedUpdateManyWithoutJobPostInputSchema: z.ZodType<Prisma.PerkUncheckedUpdateManyWithoutJobPostInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ApplicantUpdateWithoutJobPostInputSchema: z.ZodType<Prisma.ApplicantUpdateWithoutJobPostInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coverLetter: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  availability: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  approvalStatus: z.union([ z.lazy(() => ApprovalStatusSchema),z.lazy(() => EnumApprovalStatusFieldUpdateOperationsInputSchema) ]).optional(),
  resume: z.lazy(() => MediaUpdateOneWithoutApplicantNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAppliedJobsNestedInputSchema).optional()
}).strict();

export const ApplicantUncheckedUpdateWithoutJobPostInputSchema: z.ZodType<Prisma.ApplicantUncheckedUpdateWithoutJobPostInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coverLetter: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  availability: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  approvalStatus: z.union([ z.lazy(() => ApprovalStatusSchema),z.lazy(() => EnumApprovalStatusFieldUpdateOperationsInputSchema) ]).optional(),
  resume: z.lazy(() => MediaUncheckedUpdateOneWithoutApplicantNestedInputSchema).optional()
}).strict();

export const ApplicantUncheckedUpdateManyWithoutJobPostInputSchema: z.ZodType<Prisma.ApplicantUncheckedUpdateManyWithoutJobPostInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coverLetter: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  availability: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  approvalStatus: z.union([ z.lazy(() => ApprovalStatusSchema),z.lazy(() => EnumApprovalStatusFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SkillCreateManyUserInputSchema: z.ZodType<Prisma.SkillCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  jobPostId: z.string().optional().nullable()
}).strict();

export const MediaCreateManyUserInputSchema: z.ZodType<Prisma.MediaCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  mediaType: z.string(),
  url: z.string(),
  mediaName: z.string(),
  applicantId: z.string().optional().nullable()
}).strict();

export const JobPostCreateManyPostedByInputSchema: z.ZodType<Prisma.JobPostCreateManyPostedByInput> = z.object({
  id: z.string().cuid().optional(),
  jobTitle: z.string(),
  jobDescription: z.string(),
  organisationName: z.string(),
  modeOfWork: z.lazy(() => modeSchema).optional().nullable(),
  minExperience: z.coerce.number().optional(),
  maxExperience: z.coerce.number(),
  minSalary: z.coerce.number().optional(),
  maxSalary: z.coerce.number(),
  jobType: z.lazy(() => JobTypeSchema).optional(),
  postedAt: z.coerce.date().optional(),
  whoCanApply: z.lazy(() => ExperienceEnumSchema).optional()
}).strict();

export const ApplicantCreateManyUserInputSchema: z.ZodType<Prisma.ApplicantCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  coverLetter: z.string(),
  availability: z.string(),
  approvalStatus: z.lazy(() => ApprovalStatusSchema).optional(),
  jobId: z.string()
}).strict();

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  expiresAt: z.coerce.date()
}).strict();

export const SkillUpdateWithoutUserInputSchema: z.ZodType<Prisma.SkillUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  JobPost: z.lazy(() => JobPostUpdateOneWithoutSkillsNestedInputSchema).optional()
}).strict();

export const SkillUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SkillUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobPostId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SkillUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SkillUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobPostId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MediaUpdateWithoutUserInputSchema: z.ZodType<Prisma.MediaUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mediaType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mediaName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  applicant: z.lazy(() => ApplicantUpdateOneWithoutResumeNestedInputSchema).optional()
}).strict();

export const MediaUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.MediaUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mediaType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mediaName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  applicantId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MediaUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.MediaUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mediaType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mediaName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  applicantId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const JobPostUpdateWithoutPostedByInputSchema: z.ZodType<Prisma.JobPostUpdateWithoutPostedByInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  organisationName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modeOfWork: z.union([ z.lazy(() => modeSchema),z.lazy(() => NullableEnummodeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minExperience: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  maxExperience: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  minSalary: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  maxSalary: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jobType: z.union([ z.lazy(() => JobTypeSchema),z.lazy(() => EnumJobTypeFieldUpdateOperationsInputSchema) ]).optional(),
  postedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  whoCanApply: z.union([ z.lazy(() => ExperienceEnumSchema),z.lazy(() => EnumExperienceEnumFieldUpdateOperationsInputSchema) ]).optional(),
  skills: z.lazy(() => SkillUpdateManyWithoutJobPostNestedInputSchema).optional(),
  perks: z.lazy(() => PerkUpdateManyWithoutJobPostNestedInputSchema).optional(),
  applicants: z.lazy(() => ApplicantUpdateManyWithoutJobPostNestedInputSchema).optional()
}).strict();

export const JobPostUncheckedUpdateWithoutPostedByInputSchema: z.ZodType<Prisma.JobPostUncheckedUpdateWithoutPostedByInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  organisationName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modeOfWork: z.union([ z.lazy(() => modeSchema),z.lazy(() => NullableEnummodeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minExperience: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  maxExperience: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  minSalary: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  maxSalary: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jobType: z.union([ z.lazy(() => JobTypeSchema),z.lazy(() => EnumJobTypeFieldUpdateOperationsInputSchema) ]).optional(),
  postedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  whoCanApply: z.union([ z.lazy(() => ExperienceEnumSchema),z.lazy(() => EnumExperienceEnumFieldUpdateOperationsInputSchema) ]).optional(),
  skills: z.lazy(() => SkillUncheckedUpdateManyWithoutJobPostNestedInputSchema).optional(),
  perks: z.lazy(() => PerkUncheckedUpdateManyWithoutJobPostNestedInputSchema).optional(),
  applicants: z.lazy(() => ApplicantUncheckedUpdateManyWithoutJobPostNestedInputSchema).optional()
}).strict();

export const JobPostUncheckedUpdateManyWithoutPostedByInputSchema: z.ZodType<Prisma.JobPostUncheckedUpdateManyWithoutPostedByInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobTitle: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  organisationName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modeOfWork: z.union([ z.lazy(() => modeSchema),z.lazy(() => NullableEnummodeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minExperience: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  maxExperience: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  minSalary: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  maxSalary: z.union([ z.coerce.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jobType: z.union([ z.lazy(() => JobTypeSchema),z.lazy(() => EnumJobTypeFieldUpdateOperationsInputSchema) ]).optional(),
  postedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  whoCanApply: z.union([ z.lazy(() => ExperienceEnumSchema),z.lazy(() => EnumExperienceEnumFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ApplicantUpdateWithoutUserInputSchema: z.ZodType<Prisma.ApplicantUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coverLetter: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  availability: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  approvalStatus: z.union([ z.lazy(() => ApprovalStatusSchema),z.lazy(() => EnumApprovalStatusFieldUpdateOperationsInputSchema) ]).optional(),
  resume: z.lazy(() => MediaUpdateOneWithoutApplicantNestedInputSchema).optional(),
  jobPost: z.lazy(() => JobPostUpdateOneRequiredWithoutApplicantsNestedInputSchema).optional()
}).strict();

export const ApplicantUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ApplicantUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coverLetter: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  availability: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  approvalStatus: z.union([ z.lazy(() => ApprovalStatusSchema),z.lazy(() => EnumApprovalStatusFieldUpdateOperationsInputSchema) ]).optional(),
  jobId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  resume: z.lazy(() => MediaUncheckedUpdateOneWithoutApplicantNestedInputSchema).optional()
}).strict();

export const ApplicantUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.ApplicantUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coverLetter: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  availability: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  approvalStatus: z.union([ z.lazy(() => ApprovalStatusSchema),z.lazy(() => EnumApprovalStatusFieldUpdateOperationsInputSchema) ]).optional(),
  jobId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateManyAddressInputSchema: z.ZodType<Prisma.UserCreateManyAddressInput> = z.object({
  id: z.string().cuid().optional(),
  username: z.string(),
  firstName: z.string(),
  secondName: z.string(),
  email: z.string(),
  hashedPassword: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => RoleSchema).optional()
}).strict();

export const UserUpdateWithoutAddressInputSchema: z.ZodType<Prisma.UserUpdateWithoutAddressInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  secondName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  skills: z.lazy(() => SkillUpdateManyWithoutUserNestedInputSchema).optional(),
  media: z.lazy(() => MediaUpdateManyWithoutUserNestedInputSchema).optional(),
  postedJobs: z.lazy(() => JobPostUpdateManyWithoutPostedByNestedInputSchema).optional(),
  appliedJobs: z.lazy(() => ApplicantUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAddressInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAddressInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  secondName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  skills: z.lazy(() => SkillUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  media: z.lazy(() => MediaUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  postedJobs: z.lazy(() => JobPostUncheckedUpdateManyWithoutPostedByNestedInputSchema).optional(),
  appliedJobs: z.lazy(() => ApplicantUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateManyWithoutAddressInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutAddressInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  secondName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LocationCreateManyCityInputSchema: z.ZodType<Prisma.LocationCreateManyCityInput> = z.object({
  id: z.string().cuid().optional(),
  address: z.string().optional().nullable(),
  postalCode: z.number().int()
}).strict();

export const LocationUpdateWithoutCityInputSchema: z.ZodType<Prisma.LocationUpdateWithoutCityInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  postalCode: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUpdateManyWithoutAddressNestedInputSchema).optional()
}).strict();

export const LocationUncheckedUpdateWithoutCityInputSchema: z.ZodType<Prisma.LocationUncheckedUpdateWithoutCityInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  postalCode: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUncheckedUpdateManyWithoutAddressNestedInputSchema).optional()
}).strict();

export const LocationUncheckedUpdateManyWithoutCityInputSchema: z.ZodType<Prisma.LocationUncheckedUpdateManyWithoutCityInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  postalCode: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const JobPostFindFirstArgsSchema: z.ZodType<Prisma.JobPostFindFirstArgs> = z.object({
  select: JobPostSelectSchema.optional(),
  include: JobPostIncludeSchema.optional(),
  where: JobPostWhereInputSchema.optional(),
  orderBy: z.union([ JobPostOrderByWithRelationInputSchema.array(),JobPostOrderByWithRelationInputSchema ]).optional(),
  cursor: JobPostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ JobPostScalarFieldEnumSchema,JobPostScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const JobPostFindFirstOrThrowArgsSchema: z.ZodType<Prisma.JobPostFindFirstOrThrowArgs> = z.object({
  select: JobPostSelectSchema.optional(),
  include: JobPostIncludeSchema.optional(),
  where: JobPostWhereInputSchema.optional(),
  orderBy: z.union([ JobPostOrderByWithRelationInputSchema.array(),JobPostOrderByWithRelationInputSchema ]).optional(),
  cursor: JobPostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ JobPostScalarFieldEnumSchema,JobPostScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const JobPostFindManyArgsSchema: z.ZodType<Prisma.JobPostFindManyArgs> = z.object({
  select: JobPostSelectSchema.optional(),
  include: JobPostIncludeSchema.optional(),
  where: JobPostWhereInputSchema.optional(),
  orderBy: z.union([ JobPostOrderByWithRelationInputSchema.array(),JobPostOrderByWithRelationInputSchema ]).optional(),
  cursor: JobPostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ JobPostScalarFieldEnumSchema,JobPostScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const JobPostAggregateArgsSchema: z.ZodType<Prisma.JobPostAggregateArgs> = z.object({
  where: JobPostWhereInputSchema.optional(),
  orderBy: z.union([ JobPostOrderByWithRelationInputSchema.array(),JobPostOrderByWithRelationInputSchema ]).optional(),
  cursor: JobPostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const JobPostGroupByArgsSchema: z.ZodType<Prisma.JobPostGroupByArgs> = z.object({
  where: JobPostWhereInputSchema.optional(),
  orderBy: z.union([ JobPostOrderByWithAggregationInputSchema.array(),JobPostOrderByWithAggregationInputSchema ]).optional(),
  by: JobPostScalarFieldEnumSchema.array(),
  having: JobPostScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const JobPostFindUniqueArgsSchema: z.ZodType<Prisma.JobPostFindUniqueArgs> = z.object({
  select: JobPostSelectSchema.optional(),
  include: JobPostIncludeSchema.optional(),
  where: JobPostWhereUniqueInputSchema,
}).strict() ;

export const JobPostFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.JobPostFindUniqueOrThrowArgs> = z.object({
  select: JobPostSelectSchema.optional(),
  include: JobPostIncludeSchema.optional(),
  where: JobPostWhereUniqueInputSchema,
}).strict() ;

export const ApplicantFindFirstArgsSchema: z.ZodType<Prisma.ApplicantFindFirstArgs> = z.object({
  select: ApplicantSelectSchema.optional(),
  include: ApplicantIncludeSchema.optional(),
  where: ApplicantWhereInputSchema.optional(),
  orderBy: z.union([ ApplicantOrderByWithRelationInputSchema.array(),ApplicantOrderByWithRelationInputSchema ]).optional(),
  cursor: ApplicantWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ApplicantScalarFieldEnumSchema,ApplicantScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ApplicantFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ApplicantFindFirstOrThrowArgs> = z.object({
  select: ApplicantSelectSchema.optional(),
  include: ApplicantIncludeSchema.optional(),
  where: ApplicantWhereInputSchema.optional(),
  orderBy: z.union([ ApplicantOrderByWithRelationInputSchema.array(),ApplicantOrderByWithRelationInputSchema ]).optional(),
  cursor: ApplicantWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ApplicantScalarFieldEnumSchema,ApplicantScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ApplicantFindManyArgsSchema: z.ZodType<Prisma.ApplicantFindManyArgs> = z.object({
  select: ApplicantSelectSchema.optional(),
  include: ApplicantIncludeSchema.optional(),
  where: ApplicantWhereInputSchema.optional(),
  orderBy: z.union([ ApplicantOrderByWithRelationInputSchema.array(),ApplicantOrderByWithRelationInputSchema ]).optional(),
  cursor: ApplicantWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ApplicantScalarFieldEnumSchema,ApplicantScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ApplicantAggregateArgsSchema: z.ZodType<Prisma.ApplicantAggregateArgs> = z.object({
  where: ApplicantWhereInputSchema.optional(),
  orderBy: z.union([ ApplicantOrderByWithRelationInputSchema.array(),ApplicantOrderByWithRelationInputSchema ]).optional(),
  cursor: ApplicantWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ApplicantGroupByArgsSchema: z.ZodType<Prisma.ApplicantGroupByArgs> = z.object({
  where: ApplicantWhereInputSchema.optional(),
  orderBy: z.union([ ApplicantOrderByWithAggregationInputSchema.array(),ApplicantOrderByWithAggregationInputSchema ]).optional(),
  by: ApplicantScalarFieldEnumSchema.array(),
  having: ApplicantScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ApplicantFindUniqueArgsSchema: z.ZodType<Prisma.ApplicantFindUniqueArgs> = z.object({
  select: ApplicantSelectSchema.optional(),
  include: ApplicantIncludeSchema.optional(),
  where: ApplicantWhereUniqueInputSchema,
}).strict() ;

export const ApplicantFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ApplicantFindUniqueOrThrowArgs> = z.object({
  select: ApplicantSelectSchema.optional(),
  include: ApplicantIncludeSchema.optional(),
  where: ApplicantWhereUniqueInputSchema,
}).strict() ;

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const SkillFindFirstArgsSchema: z.ZodType<Prisma.SkillFindFirstArgs> = z.object({
  select: SkillSelectSchema.optional(),
  include: SkillIncludeSchema.optional(),
  where: SkillWhereInputSchema.optional(),
  orderBy: z.union([ SkillOrderByWithRelationInputSchema.array(),SkillOrderByWithRelationInputSchema ]).optional(),
  cursor: SkillWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SkillScalarFieldEnumSchema,SkillScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SkillFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SkillFindFirstOrThrowArgs> = z.object({
  select: SkillSelectSchema.optional(),
  include: SkillIncludeSchema.optional(),
  where: SkillWhereInputSchema.optional(),
  orderBy: z.union([ SkillOrderByWithRelationInputSchema.array(),SkillOrderByWithRelationInputSchema ]).optional(),
  cursor: SkillWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SkillScalarFieldEnumSchema,SkillScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SkillFindManyArgsSchema: z.ZodType<Prisma.SkillFindManyArgs> = z.object({
  select: SkillSelectSchema.optional(),
  include: SkillIncludeSchema.optional(),
  where: SkillWhereInputSchema.optional(),
  orderBy: z.union([ SkillOrderByWithRelationInputSchema.array(),SkillOrderByWithRelationInputSchema ]).optional(),
  cursor: SkillWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SkillScalarFieldEnumSchema,SkillScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SkillAggregateArgsSchema: z.ZodType<Prisma.SkillAggregateArgs> = z.object({
  where: SkillWhereInputSchema.optional(),
  orderBy: z.union([ SkillOrderByWithRelationInputSchema.array(),SkillOrderByWithRelationInputSchema ]).optional(),
  cursor: SkillWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SkillGroupByArgsSchema: z.ZodType<Prisma.SkillGroupByArgs> = z.object({
  where: SkillWhereInputSchema.optional(),
  orderBy: z.union([ SkillOrderByWithAggregationInputSchema.array(),SkillOrderByWithAggregationInputSchema ]).optional(),
  by: SkillScalarFieldEnumSchema.array(),
  having: SkillScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SkillFindUniqueArgsSchema: z.ZodType<Prisma.SkillFindUniqueArgs> = z.object({
  select: SkillSelectSchema.optional(),
  include: SkillIncludeSchema.optional(),
  where: SkillWhereUniqueInputSchema,
}).strict() ;

export const SkillFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SkillFindUniqueOrThrowArgs> = z.object({
  select: SkillSelectSchema.optional(),
  include: SkillIncludeSchema.optional(),
  where: SkillWhereUniqueInputSchema,
}).strict() ;

export const PerkFindFirstArgsSchema: z.ZodType<Prisma.PerkFindFirstArgs> = z.object({
  select: PerkSelectSchema.optional(),
  include: PerkIncludeSchema.optional(),
  where: PerkWhereInputSchema.optional(),
  orderBy: z.union([ PerkOrderByWithRelationInputSchema.array(),PerkOrderByWithRelationInputSchema ]).optional(),
  cursor: PerkWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PerkScalarFieldEnumSchema,PerkScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PerkFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PerkFindFirstOrThrowArgs> = z.object({
  select: PerkSelectSchema.optional(),
  include: PerkIncludeSchema.optional(),
  where: PerkWhereInputSchema.optional(),
  orderBy: z.union([ PerkOrderByWithRelationInputSchema.array(),PerkOrderByWithRelationInputSchema ]).optional(),
  cursor: PerkWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PerkScalarFieldEnumSchema,PerkScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PerkFindManyArgsSchema: z.ZodType<Prisma.PerkFindManyArgs> = z.object({
  select: PerkSelectSchema.optional(),
  include: PerkIncludeSchema.optional(),
  where: PerkWhereInputSchema.optional(),
  orderBy: z.union([ PerkOrderByWithRelationInputSchema.array(),PerkOrderByWithRelationInputSchema ]).optional(),
  cursor: PerkWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PerkScalarFieldEnumSchema,PerkScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PerkAggregateArgsSchema: z.ZodType<Prisma.PerkAggregateArgs> = z.object({
  where: PerkWhereInputSchema.optional(),
  orderBy: z.union([ PerkOrderByWithRelationInputSchema.array(),PerkOrderByWithRelationInputSchema ]).optional(),
  cursor: PerkWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PerkGroupByArgsSchema: z.ZodType<Prisma.PerkGroupByArgs> = z.object({
  where: PerkWhereInputSchema.optional(),
  orderBy: z.union([ PerkOrderByWithAggregationInputSchema.array(),PerkOrderByWithAggregationInputSchema ]).optional(),
  by: PerkScalarFieldEnumSchema.array(),
  having: PerkScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PerkFindUniqueArgsSchema: z.ZodType<Prisma.PerkFindUniqueArgs> = z.object({
  select: PerkSelectSchema.optional(),
  include: PerkIncludeSchema.optional(),
  where: PerkWhereUniqueInputSchema,
}).strict() ;

export const PerkFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PerkFindUniqueOrThrowArgs> = z.object({
  select: PerkSelectSchema.optional(),
  include: PerkIncludeSchema.optional(),
  where: PerkWhereUniqueInputSchema,
}).strict() ;

export const MediaFindFirstArgsSchema: z.ZodType<Prisma.MediaFindFirstArgs> = z.object({
  select: MediaSelectSchema.optional(),
  include: MediaIncludeSchema.optional(),
  where: MediaWhereInputSchema.optional(),
  orderBy: z.union([ MediaOrderByWithRelationInputSchema.array(),MediaOrderByWithRelationInputSchema ]).optional(),
  cursor: MediaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MediaScalarFieldEnumSchema,MediaScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MediaFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MediaFindFirstOrThrowArgs> = z.object({
  select: MediaSelectSchema.optional(),
  include: MediaIncludeSchema.optional(),
  where: MediaWhereInputSchema.optional(),
  orderBy: z.union([ MediaOrderByWithRelationInputSchema.array(),MediaOrderByWithRelationInputSchema ]).optional(),
  cursor: MediaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MediaScalarFieldEnumSchema,MediaScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MediaFindManyArgsSchema: z.ZodType<Prisma.MediaFindManyArgs> = z.object({
  select: MediaSelectSchema.optional(),
  include: MediaIncludeSchema.optional(),
  where: MediaWhereInputSchema.optional(),
  orderBy: z.union([ MediaOrderByWithRelationInputSchema.array(),MediaOrderByWithRelationInputSchema ]).optional(),
  cursor: MediaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MediaScalarFieldEnumSchema,MediaScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MediaAggregateArgsSchema: z.ZodType<Prisma.MediaAggregateArgs> = z.object({
  where: MediaWhereInputSchema.optional(),
  orderBy: z.union([ MediaOrderByWithRelationInputSchema.array(),MediaOrderByWithRelationInputSchema ]).optional(),
  cursor: MediaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MediaGroupByArgsSchema: z.ZodType<Prisma.MediaGroupByArgs> = z.object({
  where: MediaWhereInputSchema.optional(),
  orderBy: z.union([ MediaOrderByWithAggregationInputSchema.array(),MediaOrderByWithAggregationInputSchema ]).optional(),
  by: MediaScalarFieldEnumSchema.array(),
  having: MediaScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MediaFindUniqueArgsSchema: z.ZodType<Prisma.MediaFindUniqueArgs> = z.object({
  select: MediaSelectSchema.optional(),
  include: MediaIncludeSchema.optional(),
  where: MediaWhereUniqueInputSchema,
}).strict() ;

export const MediaFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MediaFindUniqueOrThrowArgs> = z.object({
  select: MediaSelectSchema.optional(),
  include: MediaIncludeSchema.optional(),
  where: MediaWhereUniqueInputSchema,
}).strict() ;

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(),SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const LocationFindFirstArgsSchema: z.ZodType<Prisma.LocationFindFirstArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([ LocationOrderByWithRelationInputSchema.array(),LocationOrderByWithRelationInputSchema ]).optional(),
  cursor: LocationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LocationScalarFieldEnumSchema,LocationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LocationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LocationFindFirstOrThrowArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([ LocationOrderByWithRelationInputSchema.array(),LocationOrderByWithRelationInputSchema ]).optional(),
  cursor: LocationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LocationScalarFieldEnumSchema,LocationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LocationFindManyArgsSchema: z.ZodType<Prisma.LocationFindManyArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([ LocationOrderByWithRelationInputSchema.array(),LocationOrderByWithRelationInputSchema ]).optional(),
  cursor: LocationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LocationScalarFieldEnumSchema,LocationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LocationAggregateArgsSchema: z.ZodType<Prisma.LocationAggregateArgs> = z.object({
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([ LocationOrderByWithRelationInputSchema.array(),LocationOrderByWithRelationInputSchema ]).optional(),
  cursor: LocationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LocationGroupByArgsSchema: z.ZodType<Prisma.LocationGroupByArgs> = z.object({
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([ LocationOrderByWithAggregationInputSchema.array(),LocationOrderByWithAggregationInputSchema ]).optional(),
  by: LocationScalarFieldEnumSchema.array(),
  having: LocationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LocationFindUniqueArgsSchema: z.ZodType<Prisma.LocationFindUniqueArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereUniqueInputSchema,
}).strict() ;

export const LocationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LocationFindUniqueOrThrowArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereUniqueInputSchema,
}).strict() ;

export const CityFindFirstArgsSchema: z.ZodType<Prisma.CityFindFirstArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  where: CityWhereInputSchema.optional(),
  orderBy: z.union([ CityOrderByWithRelationInputSchema.array(),CityOrderByWithRelationInputSchema ]).optional(),
  cursor: CityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CityScalarFieldEnumSchema,CityScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CityFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CityFindFirstOrThrowArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  where: CityWhereInputSchema.optional(),
  orderBy: z.union([ CityOrderByWithRelationInputSchema.array(),CityOrderByWithRelationInputSchema ]).optional(),
  cursor: CityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CityScalarFieldEnumSchema,CityScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CityFindManyArgsSchema: z.ZodType<Prisma.CityFindManyArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  where: CityWhereInputSchema.optional(),
  orderBy: z.union([ CityOrderByWithRelationInputSchema.array(),CityOrderByWithRelationInputSchema ]).optional(),
  cursor: CityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CityScalarFieldEnumSchema,CityScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CityAggregateArgsSchema: z.ZodType<Prisma.CityAggregateArgs> = z.object({
  where: CityWhereInputSchema.optional(),
  orderBy: z.union([ CityOrderByWithRelationInputSchema.array(),CityOrderByWithRelationInputSchema ]).optional(),
  cursor: CityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CityGroupByArgsSchema: z.ZodType<Prisma.CityGroupByArgs> = z.object({
  where: CityWhereInputSchema.optional(),
  orderBy: z.union([ CityOrderByWithAggregationInputSchema.array(),CityOrderByWithAggregationInputSchema ]).optional(),
  by: CityScalarFieldEnumSchema.array(),
  having: CityScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CityFindUniqueArgsSchema: z.ZodType<Prisma.CityFindUniqueArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  where: CityWhereUniqueInputSchema,
}).strict() ;

export const CityFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CityFindUniqueOrThrowArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  where: CityWhereUniqueInputSchema,
}).strict() ;

export const JobProfileFindFirstArgsSchema: z.ZodType<Prisma.JobProfileFindFirstArgs> = z.object({
  select: JobProfileSelectSchema.optional(),
  where: JobProfileWhereInputSchema.optional(),
  orderBy: z.union([ JobProfileOrderByWithRelationInputSchema.array(),JobProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: JobProfileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ JobProfileScalarFieldEnumSchema,JobProfileScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const JobProfileFindFirstOrThrowArgsSchema: z.ZodType<Prisma.JobProfileFindFirstOrThrowArgs> = z.object({
  select: JobProfileSelectSchema.optional(),
  where: JobProfileWhereInputSchema.optional(),
  orderBy: z.union([ JobProfileOrderByWithRelationInputSchema.array(),JobProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: JobProfileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ JobProfileScalarFieldEnumSchema,JobProfileScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const JobProfileFindManyArgsSchema: z.ZodType<Prisma.JobProfileFindManyArgs> = z.object({
  select: JobProfileSelectSchema.optional(),
  where: JobProfileWhereInputSchema.optional(),
  orderBy: z.union([ JobProfileOrderByWithRelationInputSchema.array(),JobProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: JobProfileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ JobProfileScalarFieldEnumSchema,JobProfileScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const JobProfileAggregateArgsSchema: z.ZodType<Prisma.JobProfileAggregateArgs> = z.object({
  where: JobProfileWhereInputSchema.optional(),
  orderBy: z.union([ JobProfileOrderByWithRelationInputSchema.array(),JobProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: JobProfileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const JobProfileGroupByArgsSchema: z.ZodType<Prisma.JobProfileGroupByArgs> = z.object({
  where: JobProfileWhereInputSchema.optional(),
  orderBy: z.union([ JobProfileOrderByWithAggregationInputSchema.array(),JobProfileOrderByWithAggregationInputSchema ]).optional(),
  by: JobProfileScalarFieldEnumSchema.array(),
  having: JobProfileScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const JobProfileFindUniqueArgsSchema: z.ZodType<Prisma.JobProfileFindUniqueArgs> = z.object({
  select: JobProfileSelectSchema.optional(),
  where: JobProfileWhereUniqueInputSchema,
}).strict() ;

export const JobProfileFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.JobProfileFindUniqueOrThrowArgs> = z.object({
  select: JobProfileSelectSchema.optional(),
  where: JobProfileWhereUniqueInputSchema,
}).strict() ;

export const JobPostCreateArgsSchema: z.ZodType<Prisma.JobPostCreateArgs> = z.object({
  select: JobPostSelectSchema.optional(),
  include: JobPostIncludeSchema.optional(),
  data: z.union([ JobPostCreateInputSchema,JobPostUncheckedCreateInputSchema ]),
}).strict() ;

export const JobPostUpsertArgsSchema: z.ZodType<Prisma.JobPostUpsertArgs> = z.object({
  select: JobPostSelectSchema.optional(),
  include: JobPostIncludeSchema.optional(),
  where: JobPostWhereUniqueInputSchema,
  create: z.union([ JobPostCreateInputSchema,JobPostUncheckedCreateInputSchema ]),
  update: z.union([ JobPostUpdateInputSchema,JobPostUncheckedUpdateInputSchema ]),
}).strict() ;

export const JobPostCreateManyArgsSchema: z.ZodType<Prisma.JobPostCreateManyArgs> = z.object({
  data: z.union([ JobPostCreateManyInputSchema,JobPostCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const JobPostCreateManyAndReturnArgsSchema: z.ZodType<Prisma.JobPostCreateManyAndReturnArgs> = z.object({
  data: z.union([ JobPostCreateManyInputSchema,JobPostCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const JobPostDeleteArgsSchema: z.ZodType<Prisma.JobPostDeleteArgs> = z.object({
  select: JobPostSelectSchema.optional(),
  include: JobPostIncludeSchema.optional(),
  where: JobPostWhereUniqueInputSchema,
}).strict() ;

export const JobPostUpdateArgsSchema: z.ZodType<Prisma.JobPostUpdateArgs> = z.object({
  select: JobPostSelectSchema.optional(),
  include: JobPostIncludeSchema.optional(),
  data: z.union([ JobPostUpdateInputSchema,JobPostUncheckedUpdateInputSchema ]),
  where: JobPostWhereUniqueInputSchema,
}).strict() ;

export const JobPostUpdateManyArgsSchema: z.ZodType<Prisma.JobPostUpdateManyArgs> = z.object({
  data: z.union([ JobPostUpdateManyMutationInputSchema,JobPostUncheckedUpdateManyInputSchema ]),
  where: JobPostWhereInputSchema.optional(),
}).strict() ;

export const JobPostDeleteManyArgsSchema: z.ZodType<Prisma.JobPostDeleteManyArgs> = z.object({
  where: JobPostWhereInputSchema.optional(),
}).strict() ;

export const ApplicantCreateArgsSchema: z.ZodType<Prisma.ApplicantCreateArgs> = z.object({
  select: ApplicantSelectSchema.optional(),
  include: ApplicantIncludeSchema.optional(),
  data: z.union([ ApplicantCreateInputSchema,ApplicantUncheckedCreateInputSchema ]),
}).strict() ;

export const ApplicantUpsertArgsSchema: z.ZodType<Prisma.ApplicantUpsertArgs> = z.object({
  select: ApplicantSelectSchema.optional(),
  include: ApplicantIncludeSchema.optional(),
  where: ApplicantWhereUniqueInputSchema,
  create: z.union([ ApplicantCreateInputSchema,ApplicantUncheckedCreateInputSchema ]),
  update: z.union([ ApplicantUpdateInputSchema,ApplicantUncheckedUpdateInputSchema ]),
}).strict() ;

export const ApplicantCreateManyArgsSchema: z.ZodType<Prisma.ApplicantCreateManyArgs> = z.object({
  data: z.union([ ApplicantCreateManyInputSchema,ApplicantCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ApplicantCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ApplicantCreateManyAndReturnArgs> = z.object({
  data: z.union([ ApplicantCreateManyInputSchema,ApplicantCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ApplicantDeleteArgsSchema: z.ZodType<Prisma.ApplicantDeleteArgs> = z.object({
  select: ApplicantSelectSchema.optional(),
  include: ApplicantIncludeSchema.optional(),
  where: ApplicantWhereUniqueInputSchema,
}).strict() ;

export const ApplicantUpdateArgsSchema: z.ZodType<Prisma.ApplicantUpdateArgs> = z.object({
  select: ApplicantSelectSchema.optional(),
  include: ApplicantIncludeSchema.optional(),
  data: z.union([ ApplicantUpdateInputSchema,ApplicantUncheckedUpdateInputSchema ]),
  where: ApplicantWhereUniqueInputSchema,
}).strict() ;

export const ApplicantUpdateManyArgsSchema: z.ZodType<Prisma.ApplicantUpdateManyArgs> = z.object({
  data: z.union([ ApplicantUpdateManyMutationInputSchema,ApplicantUncheckedUpdateManyInputSchema ]),
  where: ApplicantWhereInputSchema.optional(),
}).strict() ;

export const ApplicantDeleteManyArgsSchema: z.ZodType<Prisma.ApplicantDeleteManyArgs> = z.object({
  where: ApplicantWhereInputSchema.optional(),
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const SkillCreateArgsSchema: z.ZodType<Prisma.SkillCreateArgs> = z.object({
  select: SkillSelectSchema.optional(),
  include: SkillIncludeSchema.optional(),
  data: z.union([ SkillCreateInputSchema,SkillUncheckedCreateInputSchema ]),
}).strict() ;

export const SkillUpsertArgsSchema: z.ZodType<Prisma.SkillUpsertArgs> = z.object({
  select: SkillSelectSchema.optional(),
  include: SkillIncludeSchema.optional(),
  where: SkillWhereUniqueInputSchema,
  create: z.union([ SkillCreateInputSchema,SkillUncheckedCreateInputSchema ]),
  update: z.union([ SkillUpdateInputSchema,SkillUncheckedUpdateInputSchema ]),
}).strict() ;

export const SkillCreateManyArgsSchema: z.ZodType<Prisma.SkillCreateManyArgs> = z.object({
  data: z.union([ SkillCreateManyInputSchema,SkillCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SkillCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SkillCreateManyAndReturnArgs> = z.object({
  data: z.union([ SkillCreateManyInputSchema,SkillCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SkillDeleteArgsSchema: z.ZodType<Prisma.SkillDeleteArgs> = z.object({
  select: SkillSelectSchema.optional(),
  include: SkillIncludeSchema.optional(),
  where: SkillWhereUniqueInputSchema,
}).strict() ;

export const SkillUpdateArgsSchema: z.ZodType<Prisma.SkillUpdateArgs> = z.object({
  select: SkillSelectSchema.optional(),
  include: SkillIncludeSchema.optional(),
  data: z.union([ SkillUpdateInputSchema,SkillUncheckedUpdateInputSchema ]),
  where: SkillWhereUniqueInputSchema,
}).strict() ;

export const SkillUpdateManyArgsSchema: z.ZodType<Prisma.SkillUpdateManyArgs> = z.object({
  data: z.union([ SkillUpdateManyMutationInputSchema,SkillUncheckedUpdateManyInputSchema ]),
  where: SkillWhereInputSchema.optional(),
}).strict() ;

export const SkillDeleteManyArgsSchema: z.ZodType<Prisma.SkillDeleteManyArgs> = z.object({
  where: SkillWhereInputSchema.optional(),
}).strict() ;

export const PerkCreateArgsSchema: z.ZodType<Prisma.PerkCreateArgs> = z.object({
  select: PerkSelectSchema.optional(),
  include: PerkIncludeSchema.optional(),
  data: z.union([ PerkCreateInputSchema,PerkUncheckedCreateInputSchema ]),
}).strict() ;

export const PerkUpsertArgsSchema: z.ZodType<Prisma.PerkUpsertArgs> = z.object({
  select: PerkSelectSchema.optional(),
  include: PerkIncludeSchema.optional(),
  where: PerkWhereUniqueInputSchema,
  create: z.union([ PerkCreateInputSchema,PerkUncheckedCreateInputSchema ]),
  update: z.union([ PerkUpdateInputSchema,PerkUncheckedUpdateInputSchema ]),
}).strict() ;

export const PerkCreateManyArgsSchema: z.ZodType<Prisma.PerkCreateManyArgs> = z.object({
  data: z.union([ PerkCreateManyInputSchema,PerkCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PerkCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PerkCreateManyAndReturnArgs> = z.object({
  data: z.union([ PerkCreateManyInputSchema,PerkCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PerkDeleteArgsSchema: z.ZodType<Prisma.PerkDeleteArgs> = z.object({
  select: PerkSelectSchema.optional(),
  include: PerkIncludeSchema.optional(),
  where: PerkWhereUniqueInputSchema,
}).strict() ;

export const PerkUpdateArgsSchema: z.ZodType<Prisma.PerkUpdateArgs> = z.object({
  select: PerkSelectSchema.optional(),
  include: PerkIncludeSchema.optional(),
  data: z.union([ PerkUpdateInputSchema,PerkUncheckedUpdateInputSchema ]),
  where: PerkWhereUniqueInputSchema,
}).strict() ;

export const PerkUpdateManyArgsSchema: z.ZodType<Prisma.PerkUpdateManyArgs> = z.object({
  data: z.union([ PerkUpdateManyMutationInputSchema,PerkUncheckedUpdateManyInputSchema ]),
  where: PerkWhereInputSchema.optional(),
}).strict() ;

export const PerkDeleteManyArgsSchema: z.ZodType<Prisma.PerkDeleteManyArgs> = z.object({
  where: PerkWhereInputSchema.optional(),
}).strict() ;

export const MediaCreateArgsSchema: z.ZodType<Prisma.MediaCreateArgs> = z.object({
  select: MediaSelectSchema.optional(),
  include: MediaIncludeSchema.optional(),
  data: z.union([ MediaCreateInputSchema,MediaUncheckedCreateInputSchema ]),
}).strict() ;

export const MediaUpsertArgsSchema: z.ZodType<Prisma.MediaUpsertArgs> = z.object({
  select: MediaSelectSchema.optional(),
  include: MediaIncludeSchema.optional(),
  where: MediaWhereUniqueInputSchema,
  create: z.union([ MediaCreateInputSchema,MediaUncheckedCreateInputSchema ]),
  update: z.union([ MediaUpdateInputSchema,MediaUncheckedUpdateInputSchema ]),
}).strict() ;

export const MediaCreateManyArgsSchema: z.ZodType<Prisma.MediaCreateManyArgs> = z.object({
  data: z.union([ MediaCreateManyInputSchema,MediaCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const MediaCreateManyAndReturnArgsSchema: z.ZodType<Prisma.MediaCreateManyAndReturnArgs> = z.object({
  data: z.union([ MediaCreateManyInputSchema,MediaCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const MediaDeleteArgsSchema: z.ZodType<Prisma.MediaDeleteArgs> = z.object({
  select: MediaSelectSchema.optional(),
  include: MediaIncludeSchema.optional(),
  where: MediaWhereUniqueInputSchema,
}).strict() ;

export const MediaUpdateArgsSchema: z.ZodType<Prisma.MediaUpdateArgs> = z.object({
  select: MediaSelectSchema.optional(),
  include: MediaIncludeSchema.optional(),
  data: z.union([ MediaUpdateInputSchema,MediaUncheckedUpdateInputSchema ]),
  where: MediaWhereUniqueInputSchema,
}).strict() ;

export const MediaUpdateManyArgsSchema: z.ZodType<Prisma.MediaUpdateManyArgs> = z.object({
  data: z.union([ MediaUpdateManyMutationInputSchema,MediaUncheckedUpdateManyInputSchema ]),
  where: MediaWhereInputSchema.optional(),
}).strict() ;

export const MediaDeleteManyArgsSchema: z.ZodType<Prisma.MediaDeleteManyArgs> = z.object({
  where: MediaWhereInputSchema.optional(),
}).strict() ;

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
}).strict() ;

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
}).strict() ;

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SessionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SessionCreateManyAndReturnArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
}).strict() ;

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
}).strict() ;

export const LocationCreateArgsSchema: z.ZodType<Prisma.LocationCreateArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  data: z.union([ LocationCreateInputSchema,LocationUncheckedCreateInputSchema ]),
}).strict() ;

export const LocationUpsertArgsSchema: z.ZodType<Prisma.LocationUpsertArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereUniqueInputSchema,
  create: z.union([ LocationCreateInputSchema,LocationUncheckedCreateInputSchema ]),
  update: z.union([ LocationUpdateInputSchema,LocationUncheckedUpdateInputSchema ]),
}).strict() ;

export const LocationCreateManyArgsSchema: z.ZodType<Prisma.LocationCreateManyArgs> = z.object({
  data: z.union([ LocationCreateManyInputSchema,LocationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const LocationCreateManyAndReturnArgsSchema: z.ZodType<Prisma.LocationCreateManyAndReturnArgs> = z.object({
  data: z.union([ LocationCreateManyInputSchema,LocationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const LocationDeleteArgsSchema: z.ZodType<Prisma.LocationDeleteArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereUniqueInputSchema,
}).strict() ;

export const LocationUpdateArgsSchema: z.ZodType<Prisma.LocationUpdateArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  data: z.union([ LocationUpdateInputSchema,LocationUncheckedUpdateInputSchema ]),
  where: LocationWhereUniqueInputSchema,
}).strict() ;

export const LocationUpdateManyArgsSchema: z.ZodType<Prisma.LocationUpdateManyArgs> = z.object({
  data: z.union([ LocationUpdateManyMutationInputSchema,LocationUncheckedUpdateManyInputSchema ]),
  where: LocationWhereInputSchema.optional(),
}).strict() ;

export const LocationDeleteManyArgsSchema: z.ZodType<Prisma.LocationDeleteManyArgs> = z.object({
  where: LocationWhereInputSchema.optional(),
}).strict() ;

export const CityCreateArgsSchema: z.ZodType<Prisma.CityCreateArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  data: z.union([ CityCreateInputSchema,CityUncheckedCreateInputSchema ]),
}).strict() ;

export const CityUpsertArgsSchema: z.ZodType<Prisma.CityUpsertArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  where: CityWhereUniqueInputSchema,
  create: z.union([ CityCreateInputSchema,CityUncheckedCreateInputSchema ]),
  update: z.union([ CityUpdateInputSchema,CityUncheckedUpdateInputSchema ]),
}).strict() ;

export const CityCreateManyArgsSchema: z.ZodType<Prisma.CityCreateManyArgs> = z.object({
  data: z.union([ CityCreateManyInputSchema,CityCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CityCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CityCreateManyAndReturnArgs> = z.object({
  data: z.union([ CityCreateManyInputSchema,CityCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CityDeleteArgsSchema: z.ZodType<Prisma.CityDeleteArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  where: CityWhereUniqueInputSchema,
}).strict() ;

export const CityUpdateArgsSchema: z.ZodType<Prisma.CityUpdateArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  data: z.union([ CityUpdateInputSchema,CityUncheckedUpdateInputSchema ]),
  where: CityWhereUniqueInputSchema,
}).strict() ;

export const CityUpdateManyArgsSchema: z.ZodType<Prisma.CityUpdateManyArgs> = z.object({
  data: z.union([ CityUpdateManyMutationInputSchema,CityUncheckedUpdateManyInputSchema ]),
  where: CityWhereInputSchema.optional(),
}).strict() ;

export const CityDeleteManyArgsSchema: z.ZodType<Prisma.CityDeleteManyArgs> = z.object({
  where: CityWhereInputSchema.optional(),
}).strict() ;

export const JobProfileCreateArgsSchema: z.ZodType<Prisma.JobProfileCreateArgs> = z.object({
  select: JobProfileSelectSchema.optional(),
  data: z.union([ JobProfileCreateInputSchema,JobProfileUncheckedCreateInputSchema ]),
}).strict() ;

export const JobProfileUpsertArgsSchema: z.ZodType<Prisma.JobProfileUpsertArgs> = z.object({
  select: JobProfileSelectSchema.optional(),
  where: JobProfileWhereUniqueInputSchema,
  create: z.union([ JobProfileCreateInputSchema,JobProfileUncheckedCreateInputSchema ]),
  update: z.union([ JobProfileUpdateInputSchema,JobProfileUncheckedUpdateInputSchema ]),
}).strict() ;

export const JobProfileCreateManyArgsSchema: z.ZodType<Prisma.JobProfileCreateManyArgs> = z.object({
  data: z.union([ JobProfileCreateManyInputSchema,JobProfileCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const JobProfileCreateManyAndReturnArgsSchema: z.ZodType<Prisma.JobProfileCreateManyAndReturnArgs> = z.object({
  data: z.union([ JobProfileCreateManyInputSchema,JobProfileCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const JobProfileDeleteArgsSchema: z.ZodType<Prisma.JobProfileDeleteArgs> = z.object({
  select: JobProfileSelectSchema.optional(),
  where: JobProfileWhereUniqueInputSchema,
}).strict() ;

export const JobProfileUpdateArgsSchema: z.ZodType<Prisma.JobProfileUpdateArgs> = z.object({
  select: JobProfileSelectSchema.optional(),
  data: z.union([ JobProfileUpdateInputSchema,JobProfileUncheckedUpdateInputSchema ]),
  where: JobProfileWhereUniqueInputSchema,
}).strict() ;

export const JobProfileUpdateManyArgsSchema: z.ZodType<Prisma.JobProfileUpdateManyArgs> = z.object({
  data: z.union([ JobProfileUpdateManyMutationInputSchema,JobProfileUncheckedUpdateManyInputSchema ]),
  where: JobProfileWhereInputSchema.optional(),
}).strict() ;

export const JobProfileDeleteManyArgsSchema: z.ZodType<Prisma.JobProfileDeleteManyArgs> = z.object({
  where: JobProfileWhereInputSchema.optional(),
}).strict() ;