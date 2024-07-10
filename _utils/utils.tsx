import { faker } from "@faker-js/faker";

export const generateFakeData = () => {
  const fakeJobs = [];
  for (let i = 0; i < 10; i++) {
    fakeJobs.push({
      id: faker.number.int(),
      jobTitle: faker.person.jobTitle(),
      jobDescription: faker.lorem.paragraph(),
      organisationName: faker.company.name(),
      modeOfWork: faker.helpers.arrayElement([
        "Work_From_Home",
        "Work_From_Office",
      ]),
      minExperience: faker.number.int({ min: 0, max: 5 }),
      maxExperience: faker.number.int({ min: 6, max: 15 }),
      minSalary: faker.number.int({ min: 30000, max: 50000 }),
      maxSalary: faker.number.int({ min: 50001, max: 200000 }),
      skills: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
      perks: [faker.lorem.sentence(), faker.lorem.sentence()],
      jobType: faker.helpers.arrayElement([
        "Full-time",
        "Part-time",
        "Contract",
      ]),
      postedAt: faker.date.recent(),
      whoCanApply: faker.lorem.sentence(),
      userId: faker.number.int(),
    });
  }
  return fakeJobs;
};
