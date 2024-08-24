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
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "javascript", label: "JavaScript" },
];

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
