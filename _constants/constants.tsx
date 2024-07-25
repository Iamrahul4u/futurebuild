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
];
export const DashboardNav: SidebarLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/user",
    label: "Home",
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
