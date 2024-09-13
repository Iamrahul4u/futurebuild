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
    label: "Roadmaps",
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
export const questionsData = {
  twoSum: {
    id: "twoSum",
    title: "Two Sum",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.`,
    example: `Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].`,
    constraints: [
      "2 ≤ nums.length ≤ 10^4",
      "-10^9 ≤ nums[i] ≤ 10^9",
      "Only one valid answer exists.",
    ],
    difficulty: "Easy",
    tags: ["Array", "Hash Table"],
    templateCode: {
      python: `def two_sum(nums, target):\n    # Write your code here\n    pass`,
      java: `public int[] twoSum(int[] nums, int target) {\n    // Write your code here\n    return new int[] {}; \n}`,
      cpp: `vector<int> twoSum(vector<int>& nums, int target) {\n    // Write your code here\n    return {}; \n}`,
      javascript: `function twoSum(nums, target) {\n    // Write your code here\n}`,
    },
    testCases: [
      { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { input: [[-1, -2, -3, -4, -5], -8], expected: [2, 4] },
      { input: [[0, 4, 3, 0], 0], expected: [0, 3] },
      { input: [[3, 3], 6], expected: [0, 1] },
      {
        input: [[1000000000, 2000000000, 3000000000], 3000000000],
        expected: [0, 1],
      },
    ],
    results: `testCases.map(testCase => {\n  let result = twoSum(...testCase.input);\n  return {\n    input: testCase.input,\n    expected: testCase.expected,\n    output: result,\n    passed: JSON.stringify(result) === JSON.stringify(testCase.expected),\n  };\n});`,
  },
  reverseString: {
    id: "reverseString",
    title: "Reverse String",
    description: `Write a function that reverses a string. The input string is given as an array of characters s.`,
    example: `Input: s = ["h","e","l","l","o"]\nOutput: ["o","l","l","e","h"]`,
    constraints: ["1 ≤ s.length ≤ 10^5"],
    difficulty: "Medium",
    tags: ["String", "Array"],
    templateCode: {
      python: `def reverse_string(s):\n    # Write your code here\n    pass`,
      java: `public void reverseString(char[] s) {\n    // Write your code here\n}`,
      cpp: `void reverseString(vector<char>& s) {\n    // Write your code here\n}`,
      javascript: `function reverseString(s) {\n    // Write your code here\n}`,
    },
    testCases: [
      {
        input: [["h", "e", "l", "l", "o"]],
        expected: ["o", "l", "l", "e", "h"],
      },
      {
        input: [["H", "a", "n", "n", "a", "h"]],
        expected: ["h", "a", "n", "n", "a", "H"],
      },
    ],
    results: `testCases.map(testCase => {\n  let result = reverseString(testCase.input[0]);\n  return {\n    input: testCase.input,\n    expected: testCase.expected,\n    output: result,\n    passed: JSON.stringify(result) === JSON.stringify(testCase.expected),\n  };\n});`,
  },
  fizzBuzz: {
    id: "fizzBuzz",
    title: "Fizz Buzz",
    description: `Given an integer n, return a string array answer (1-indexed) where:\n- answer[i] == "FizzBuzz" if i is divisible by 3 and 5.\n- answer[i] == "Fizz" if i is divisible by 3.\n- answer[i] == "Buzz" if i is divisible by 5.\n- answer[i] == i (as a string) if none of the above conditions are true.`,
    example: `Input: n = 15\nOutput: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]`,
    constraints: ["1 ≤ n ≤ 10^4"],
    difficulty: "Easy",
    tags: ["String", "Array"],
    templateCode: {
      python: `def fizz_buzz(n):\n    # Write your code here\n    pass`,
      java: `public List<String> fizzBuzz(int n) {\n    // Write your code here\n    return new ArrayList<>();\n}`,
      cpp: `vector<string> fizzBuzz(int n) {\n    // Write your code here\n    return {}; \n}`,
      javascript: `function fizzBuzz(n) {\n    // Write your code here\n}`,
    },
    testCases: [
      {
        input: [15],
        expected: [
          "1",
          "2",
          "Fizz",
          "4",
          "Buzz",
          "Fizz",
          "7",
          "8",
          "Fizz",
          "Buzz",
          "11",
          "Fizz",
          "13",
          "14",
          "FizzBuzz",
        ],
      },
    ],
    results: `testCases.map(testCase => {\n  let result = fizzBuzz(...testCase.input);\n  return {\n    input: testCase.input,\n    expected: testCase.expected,\n    output: result,\n    passed: JSON.stringify(result) === JSON.stringify(testCase.expected),\n  };\n});`,
  },
  palindromeNumber: {
    id: "palindromeNumber",
    title: "Palindrome Number",
    description: `Given an integer x, return true if x is a palindrome, and false otherwise.`,
    example: `Input: x = 121\nOutput: true\nExplanation: 121 reads as 121 from left to right and from right to left.`,
    constraints: ["-2^31 ≤ x ≤ 2^31 - 1"],
    difficulty: "Easy",
    tags: ["Math", "String"],
    templateCode: {
      python: `def is_palindrome(x):\n    # Write your code here\n    pass`,
      java: `public boolean isPalindrome(int x) {\n    // Write your code here\n    return false;\n}`,
      cpp: `bool isPalindrome(int x) {\n    // Write your code here\n    return false;\n}`,
      javascript: `function isPalindrome(x) {\n    // Write your code here\n}`,
    },
    testCases: [
      { input: [121], expected: true },
      { input: [-121], expected: false },
    ],
    results: `testCases.map(testCase => {\n  let result = isPalindrome(...testCase.input);\n  return {\n    input: testCase.input,\n    expected: testCase.expected,\n    output: result,\n    passed: result === testCase.expected,\n  };\n});`,
  },
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
