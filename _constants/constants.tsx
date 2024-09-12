import { z } from "zod";

export const themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
];
interface SidebarLink {
  imgURL: string;
  route: string;
  label: string;
  target?: string;
}
export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/icons/users.svg",
    route: "/jobs",
    label: "Jobs",
  },
  {
    imgURL: "/assets/icons/users.svg",
    route: "/roadmap",
    label: "RoadMaps",
  },
  {
    imgURL: "/assets/icons/users.svg",
    route: "/practice",
    label: "Practice",
  },
  {
    imgURL: "/assets/icons/users.svg",
    route: "https://futurbuildoverflow.vercel.app/",
    target: "_blank",
    label: "Ask Question",
  },
];
export const MAX_RESUME_SIZE = 5 * 1024 * 1024;
export const MAX_PROFILE_IMG_SIZE = 1 * 500 * 1024;
export const ACCEPTED_FILE_TYPES = [
  "application/pdf", // PDF files
  "application/msword", // DOC files
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX files
];
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
];

export const DashboardNavLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/user",
    label: "Home",
  },
  {
    imgURL: "/assets/icons/users.svg",
    route: "/edit",
    label: "Edit Profile",
  },
  {
    imgURL: "/assets/icons/users.svg",
    route: "/settings",
    label: "Settings",
  },
];

export const loadingStatesRoadmap = [
  {
    text: "Got The Topic",
  },
  {
    text: "Requesting the AI",
  },
  {
    text: "Generating...",
  },

  {
    text: "Roadmap Generated 🎉",
  },
];
export const BADGE_CRITERIA = {
  QUESTION_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  QUESTION_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  TOTAL_VIEWS: {
    BRONZE: 1000,
    SILVER: 10000,
    GOLD: 100000,
  },
};

export const Languages = [
  { value: "python", label: "Python", version: "3.10.0" },
  { value: "java", label: "Java", version: "15.0.2" },
  { value: "cpp", label: "C++", version: "10.2.0" },
  { value: "javascript", label: "JavaScript", version: "1.32.3" },
];
export const languageFileNames = {
  python: "main.py",
  java: "Solution.java",
  cpp: "main.cpp",
  javascript: "main.js",
};
export const TemplateCode = {
  python: `
class Solution:
    def your_function_name(self, params):
        # Write your code here
        pass

# Example usage:
# solution = Solution()
# print(solution.your_function_name(params))

  `,
  java: `
public class Solution {
    public returnType yourFunctionName(parameters) {
        // Write your code here
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        // Example usage:
        // System.out.println(solution.yourFunctionName(params));
    }
}

  `,
  cpp: `
#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    returnType yourFunctionName(parameters) {
        // Write your code here
    }
};

int main() {
    Solution solution;
    // Example usage:
    // cout << solution.yourFunctionName(params) << endl;
    return 0;
}

  `,
  javascript: `
class Solution {
  yourFunctionName(params) {
    // Write your code here
  }
}

// Example usage:
const solution = new Solution();
// console.log(solution.yourFunctionName(params));

  `,
};

export const ResumeProfileSectionDummyData = {
  name: "Rahul Gupta",
  quickSummary1: "President and CEO: Manufacturing Start-Ups and Turnarounds",
  quickSummary2:
    "P&L up to $150M | Global Teams of 400+ | 300% Revenue Growth in 4 Years",
  address: "1234 Main St, Anytown, USA",
  phoneNumber: "(555) 555-1234",
  email: "rahul@example.com",
  linkedIn: "linkedin.com/in/iamrahul4u/",
  education: [
    {
      degree: "Bachelor's in Computer Science",
      institution: "ABC University",
      location: "New York, NY",
      year: "2015-2019",
      cgpa: "8.5",
    },
  ],
  experience: [
    {
      company: "ABC Company",
      jobTitle: "Full Stack Developer",
      startDate: "2019",
      location: "New York, NY",
      endDate: "2021",
      description:
        "Developed and maintained web applications using Python, JavaScript, and various frameworks.",
    },
  ],
  skills: ["Python", "JavaScript", "React", "Node.js", "SQL"],
  certifications: [
    {
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      year: "2020",
    },
  ],
  languages: ["English", "Hindi", "Spanish"],
  hobbies: "Reading, Traveling, Photography",
  projects: [
    {
      name: "Chatbot Development",
      description:
        "Built a chatbot for a startup using Python and various frameworks.",
      role: "Full Stack Developer",
      year: "2020",
    },
    {
      name: "E-commerce Website",
      description:
        "Developed a responsive e-commerce website using React and Node.js.",
      role: "Full Stack Developer",
      year: "2020",
    },
  ],
  awards: [],

  references: "",
  summary:
    "A highly motivated and detail-oriented software developer with a passion for creating innovative solutions. Proficient in Python, JavaScript, and various web technologies. Strong problem-solving skills and a quick learner.",
  interests: "Machine Learning, Blockchain, Cybersecurity",
  careerObjective:
    "Seeking a position in a dynamic company that values innovation and continuous learning, where I can contribute my skills and grow with the organization.",
};

// Empty Data for Resume Profile Section
export const ResumeProfileSectionEmptyData = {
  name: "",
  quickSummary1: "",
  quickSummary2: "",
  address: "",
  phoneNumber: "",
  email: "",
  linkedIn: "",
  education: [],
  experience: [],
  skills: [],
  certifications: [],
  languages: [],
  hobbies: "",
  projects: [],
  awards: [],
  references: "",
  summary: "",
  interests: "",
  careerObjective: "",
};

export const ResumeBuilderInputFieldsClassname =
  "focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none";
