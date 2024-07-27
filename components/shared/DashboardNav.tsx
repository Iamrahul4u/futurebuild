"use client";
import {
  CalendarIcon,
  HomeIcon,
  LayoutGridIcon,
  MenuIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { DashboardNavLinks } from "@/_constants/constants";
import { usePathname } from "next/navigation";
import useGetUser from "@/hooks/useGetUser";

const DashboardNav = () => {
  const pathname = usePathname();
  const userId = useGetUser();
  return (
    <aside className="fixed left-0 z-[9999] flex h-full w-[20%] flex-col border-l border-r border-black bg-background sm:w-64">
      <ul className="flex flex-1 flex-col gap-4 px-4 py-6 sm:px-6">
        {DashboardNavLinks.map((item) => {
          const isActive = pathname.includes(`/dashboard${item.route}`);
          return (
            <Link
              key={item.route}
              href={`/dashboard${item.route}/${userId}`}
              className="w-full text-base font-medium"
            >
              <li
                className={`rounded-xl px-3 py-2 text-black transition-colors ease-in-out hover:bg-black hover:text-white hover:duration-300 dark:text-white dark:hover:bg-white dark:hover:text-black ${
                  isActive
                    ? "rounded-xl bg-black text-white dark:bg-white dark:!text-black"
                    : ""
                }`}
              >
                {item.label}
              </li>
            </Link>
          );
        })}
      </ul>
    </aside>
  );
};

export default DashboardNav;
