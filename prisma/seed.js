const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function main() {
  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.user.createMany({ data: userData });
      console.log("Users inserted.");

      await prisma.jobPost.createMany({ data: jobPosts });
      console.log("Job posts inserted.");

      await prisma.applicant.createMany({ data: applicantSeedData });
      console.log("Applicants inserted.");

      await prisma.media.createMany({ data: mediaData });
      console.log("Media inserted.");
    });
  } catch (e) {
    console.error("Error during seeding:", e);
  }
}

const ApprovalStatus = {
  Pending: "Pending",
  Rejected: "Rejected",
  Accepted: "Accepted",
};
const applicantSeedData = [
  {
    id: "clz0pdks60002d1k1kzjjtx6r",
    userId: "clz0p97qu0001g9p55w4v4c3a",
    coverLetter: "Hire me !!!!",
    availability: "Immediate", // or use "" for empty string
    jobId: "clz0pbvpo0001d1k1jh3fs8q9",
    approvalStatus: ApprovalStatus.Pending,
  },
  {
    id: "clz0pg5340005g9p59miwp5nv",
    userId: "clz0p97qu0001g9p55w4v4c3a",
    coverLetter: "Default cover letter",
    availability: "Immediate",
    jobId: "clz0p7pb90000d1k1txxnz6ei",
    approvalStatus: ApprovalStatus.Rejected,
  },
  {
    id: "clz4b5t3600012lzhv7ephsji",
    userId: "clz0p06ut0000g9p5tv5ofdl6",
    coverLetter:
      "Applying for ~jobname~\nCover Letter\nWhy should you be hired for this role?Applying for ~jobname~\nCover Letter\nWhy should you be hired for this role?",
    availability: "Yes",
    jobId: "clz3z34w10001ny5fbrk8to4c",
    approvalStatus: ApprovalStatus.Pending,
  },
  {
    id: "clz4bbo9u00052lzhb3nll09j",
    userId: "clz0p97qu0001g9p55w4v4c3a",
    coverLetter:
      "Applying for ~jobname~\nCover Letter\nWhy should you be hired for this role?Applying for ~jobname~\nCover Letter\nWhy should you be hired for this role?Applying for ~jobname~\nCover Letter\nWhy should you be hired for this role?",
    availability: "Yes",
    jobId: "clz3z34w10001ny5fbrk8to4c",
    approvalStatus: ApprovalStatus.Pending,
  },
  {
    id: "clz4cfjgd00017w7a5bl2fijw",
    userId: "clz0p06ut0000g9p5tv5ofdl6",
    coverLetter:
      "Applying for ~jobname~\nCover Letter\nWhy should you be hired for this role?Applying for ~jobname~\nCover Letter\nWhy should you be hired for this role?",
    availability: "Yes",
    jobId: "clz0pbvpo0001d1k1jh3fs8q9",
    approvalStatus: ApprovalStatus.Accepted,
  },
];

const mode = {
  Remote: "Remote",
  Hybrid: "Hybrid",
};
const JobType = {
  Full_Time: "Full_Time",
  Part_Time: "Part_Time",
  InternShip: "InternShip",
  Project_Work: "Project_Work",
  Volunteering: "Volunteering",
};
const Experienceconst = {
  Anyone: "Anyone",
  Fresher: "Fresher",
  Intermediate: "Intermediate",
  Experienced: "Experienced",
};
const jobPosts = [
  {
    id: "clz0p7pb90000d1k1txxnz6ei",
    jobTitle: "ORGANIZATION",
    jobDescription:
      "Prisma Migrate in non-interactive environments Prisma ORM detects when you run CLI commands in non-interactive environments, such as Docker, from Node scripts or in bash shells. When this happens a warning displays, indicating that the environment is non-interactive and the migrate dev command is not supported. To ensure the Docker environment picks up the command, run the image in interactive mode so that it reacts to the migrate dev command.",
    organisationName: "modeSchema",
    modeOfWork: mode.Hybrid,
    minExperience: 1,
    maxExperience: 5,
    minSalary: 1234,
    maxSalary: 21233,
    jobType: JobType.Full_Time,
    postedAt: new Date("2024-07-23 09:54:30.123"),
    userId: "clz0p06ut0000g9p5tv5ofdl6",
    whoCanApply: Experienceconst.Fresher,
  },
  {
    id: "clz0pbvpo0001d1k1jh3fs8q9",
    jobTitle: "Software Engineer",
    jobDescription:
      "Here are the outputs for each language or tool showing the current date and time in DateTime format. Since the exact output will vary based on the current time when the code is executed, I'll use an example timestamp. 1. JavaScript javascript Copy code const currentDateTime = new Date(); console.log(currentDateTime.toISOString()); // Example output: 2024-07-23T15:24:30.123Z 2. Python python Copy code from datetime import datetime current_date_time = datetime.now() print(current_date_time)  # Example output: 2024-07-23 15:24:30.123456 3. TypeScript typescript Copy code const currentDateTime: Date = new Date(); console.log(currentDateTime.toISOString()); // Example output: 2024-07-23T15:24:30.123Z 4. Java java Copy code import java.time.LocalDateTime; import java.time.format.DateTimeFormatter; public class Main { public static void main(String[] args) { LocalDateTime currentDateTime = LocalDateTime.now(); DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME; System.out.println(currentDateTime.format(formatter)); // Example output: 2024-07-23T15:24:30 } } 5. C# csharp Copy code using System; class Program { static void Main() { DateTime currentDateTime = DateTime.Now; Console.WriteLine(currentDateTime.ToStrin",
    organisationName: "Facebook",
    modeOfWork: mode.Remote,
    minExperience: 2,
    maxExperience: 7,
    minSalary: 1200,
    maxSalary: 23233,
    jobType: JobType.Full_Time,
    postedAt: new Date("2024-07-23 09:54:30.123"),
    userId: "clz0p06ut0000g9p5tv5ofdl6",
    whoCanApply: Experienceconst.Anyone,
  },
  {
    id: "clz3z34w10001ny5fbrk8to4c",
    jobTitle: "Web Developer",
    jobDescription:
      "How to omit multiple fields Omitting multiple fields works the same as selecting multiple fields: add multiple key-value pairs to the omit option. Using the same schema as before, you could omit password and email with the following: const prisma = new PrismaClient() // password and email are excluded const user = await prisma.user.findUnique({ omit: { email: true, password: true, }, where: { id: 1, }, }) Multiple fields can be omitted locally and globally. How to select a previously omitted field If you omit a field globally, you can 'override' by either selecting the field specifically or by setting omit to false in a query.",
    organisationName: "Myntra",
    modeOfWork: mode.Remote,
    minExperience: 0,
    maxExperience: 1,
    minSalary: 0,
    maxSalary: 1,
    jobType: JobType.InternShip,
    postedAt: new Date("2024-07-27 10:10:54.817"),
    userId: "clz0p06ut0000g9p5tv5ofdl6",
    whoCanApply: Experienceconst.Anyone,
  },
];

const mediaData = [
  {
    id: "clz4b5tpo00032lzh8z0941ab",
    mediaType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    url: "https://drive.google.com/file/d/1OiSO5dWko_NcHJkiw0ZalYQA3gASqzPX/view",
    userId: "clz0p06ut0000g9p5tv5ofdl6",
    mediaName: "Resume",
    applicantId: "clz4b5t3600012lzhv7ephsji",
  },
  {
    id: "clz4bbpfs00072lzhx1acleje",
    mediaType: "application/pdf",
    url: "https://drive.google.com/file/d/1OiSO5dWko_NcHJkiw0ZalYQA3gASqzPX/view",
    userId: "clz0p97qu0001g9p55w4v4c3a",
    mediaName: "Resume",
    applicantId: "clz4bbo9u00052lzhb3nll09j",
  },
  {
    id: "clz4cflcq00037w7aa9nbbfm5",
    mediaType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    url: "https://drive.google.com/file/d/1OiSO5dWko_NcHJkiw0ZalYQA3gASqzPX/view",
    userId: "clz0p06ut0000g9p5tv5ofdl6",
    mediaName: "Resume",
    applicantId: "clz4cfjgd00017w7a5bl2fijw",
  },
];
const ROLE = {
  USER: "USER",
  ADMIN: "ADMIN",
  ORGANIZATION: "ORGANIZATION",
};
const userData = [
  {
    id: "clz0p06ut0000g9p5tv5ofdl6",
    username: "admin123",
    firstName: "Rahul",
    secondName: "Gupta",
    email: "admin@gmail.com",
    createdAt: new Date("2024-07-25T03:07:07.062Z"),
    updatedAt: new Date("2024-07-27T09:42:59.297Z"),
    role: ROLE.ADMIN,
    locationId: null, // Assuming locationId is optional
    hashedPassword:
      "$argon2id$v=19$m=19456,t=2,p=1$bnm0WyEoyItE/CurHSdlqw$mDyLwgqGDA0ZOtTQiNT2XzbZ/+Kz12zpBwfF+j7q5PI",
  },
  {
    id: "clz0p97qu0001g9p55w4v4c3a",
    username: "user123",
    firstName: "rahul",
    secondName: "gupta",
    email: "user@gmail.com",
    createdAt: new Date("2024-07-25T03:14:08.119Z"),
    updatedAt: new Date("2024-07-25T03:14:08.119Z"),
    role: ROLE.USER,
    locationId: null, // Assuming locationId is optional
    hashedPassword:
      "$argon2id$v=19$m=19456,t=2,p=1$1e1mus5xy6oGpCFLz6stAw$xUxRT8PzPh4RN+2LpkQQYkoT7+npsrhwUp21Fab4UYE",
  },
];
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
