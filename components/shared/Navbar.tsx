"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "../../_constants/constants";

import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { signout } from "@/app/actions/auth.action";
import { ModeToggle } from "./ThemeModeToggle";
export function NavBar() {
  const pathname = usePathname();
  return (
    <nav
      role="navigation"
      aria-label="navigation-menu"
      about="Navigation Menu"
      className="w-full hidden md:visible h-32  rounded-t-sm md:flex items-center justify-between px-6 drop-shadow-xl  border-b dark:border-gray-600  border-black  py-2"
    >
      <Link href={"/"}>
        <Label className="text-2xl italic cursor-pointer text-gray-800 font-bold border-2 border-black hover:bg-black  duration-300 transition-colors hover:text-orange-400 hover:border-orange-500 px-2 py-1 bg-orange-400 font-mono ">
          FutureBuild
        </Label>
      </Link>

      <ul
        className="flex gap-4 items-center
      "
      >
        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route && pathname.includes(item.route);
          return (
            <li
              key={item.route}
              className={` hover:bg-black rounded-xl px-3 py-2 hover:text-white dark:text-white  text-black dark:hover:text-black dark:hover:bg-white hover:duration-300 transition-colors ease-in-out  ${
                isActive
                  ? " text-white bg-black dark:!text-black dark:bg-white rounded-xl "
                  : ""
              }`}
            >
              <Link href={item.route} className="text-xl font-semibold ">
                {item.label}
              </Link>
            </li>
          );
        })}
        <li className="flex flex-1 gap-2" key={1}>
          <Button onClick={() => signout()}>Logout</Button>
        </li>
        <li className="flex flex-1 gap-2" key={2}>
          <ModeToggle />
        </li>
      </ul>
    </nav>
  );
}
