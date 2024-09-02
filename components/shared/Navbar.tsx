"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { sidebarLinks } from "../../_constants/constants";

import { Label } from "../ui/label";
import { ModeToggle } from "./ThemeModeToggle";
import { DashboardDropdownMenu } from "./DashboardDropdown";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"; // Import ShadCN Sheet components
import { clientCheckUser } from "@/app/actions/auth.action";
import { Menu } from "lucide-react"; // Assuming you're using lucide-react for icons

export function NavBar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const previousPathnameRef = React.useRef(pathname);

  React.useEffect(() => {
    if (previousPathnameRef.current !== pathname) {
      setIsMenuOpen(false);
      previousPathnameRef.current = pathname;
    }
  }, [pathname]);
  return (
    <nav
      role="navigation"
      aria-label="navigation-menu"
      about="Navigation Menu"
      className="h-16 w-full items-center justify-between rounded-t-sm border-b border-black px-6 py-2 drop-shadow-xl dark:border-gray-600 md:visible md:flex"
    >
      <div className="flex w-full items-center justify-between md:w-auto">
        <Link href={"/"}>
          <Label className="font-mono cursor-pointer border-2 border-black bg-orange-400 px-2 py-1 text-2xl font-bold italic text-gray-800 transition-colors duration-300 hover:border-orange-500 hover:bg-black hover:text-orange-400">
            FutureBuild
          </Label>
        </Link>
        <div className="flex items-center gap-2 md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <button className="md:hidden">
                <Menu size={24} className="text-black dark:text-white" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="p-10">
              <ul className="flex flex-col gap-4">
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
                        prefetch={true}
                        target={item.target ?? "_self"}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </SheetContent>
          </Sheet>
          <ul className="flex items-center gap-2">
            <li className="flex gap-2" key={1}>
              <DashboardDropdownMenu />
            </li>
            <li className="flex flex-1 gap-2" key={2}>
              <ModeToggle />
            </li>
          </ul>
        </div>
      </div>

      <ul className="hidden items-center gap-2 md:flex">
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
                prefetch={true}
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
