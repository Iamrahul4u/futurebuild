"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "../../_constants/constants";

import { Label } from "../ui/label";
import { ModeToggle } from "./ThemeModeToggle";
import { DashboardDropdownMenu } from "./DashboardDropdown";
import { clientCheckUser } from "@/app/actions/auth.action";
export function NavBar() {
  const pathname = usePathname();

  return (
    <nav
      role="navigation"
      aria-label="navigation-menu"
      about="Navigation Menu"
      className="hidden h-16 w-full items-center justify-between rounded-t-sm border-b border-black px-6 py-2 drop-shadow-xl dark:border-gray-600 md:visible md:flex"
    >
      <Link href={"/"}>
        <Label className="font-mono cursor-pointer border-2 border-black bg-orange-400 px-2 py-1 text-2xl font-bold italic text-gray-800 transition-colors duration-300 hover:border-orange-500 hover:bg-black hover:text-orange-400">
          FutureBuild
        </Label>
      </Link>

      <ul className="flex items-center gap-2">
        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route && pathname.includes(item.route);
          return (
            <li
              key={item.route}
              className={`rounded-xl px-3 py-2 text-black transition-colors ease-in-out hover:bg-black hover:text-white hover:duration-300 dark:text-white dark:hover:bg-white dark:hover:text-black ${
                isActive
                  ? "rounded-xl bg-black text-white dark:bg-white dark:!text-black"
                  : ""
              }`}
            >
              <Link
                href={item.route}
                className="text-base font-medium"
                target={item.target ?? "_self"}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
        <li className="flex flex-1 gap-2" key={1}>
          <DashboardDropdownMenu />
        </li>
        <li className="flex flex-1 gap-2" key={2}>
          <ModeToggle />
        </li>
      </ul>
    </nav>
  );
}
