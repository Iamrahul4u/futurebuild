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
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

const DashboardNav = () => {
  const pathname = usePathname();
  const userId = useGetUser();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const previousPathnameRef = React.useRef(pathname);
  React.useEffect(() => {
    if (previousPathnameRef.current !== pathname) {
      setIsMenuOpen(false); // Close the sheet on navigation
      previousPathnameRef.current = pathname;
    }
  }, [pathname]);
  return (
    <>
      <aside className="fixed left-0 hidden h-full w-[20%] flex-col border-l border-r border-black bg-background sm:w-64 md:flex">
        <ul className="flex flex-1 flex-col gap-4 px-4 py-6 sm:px-6">
          {DashboardNavLinks.map((item) => {
            const isActive = pathname.includes(`/dashboard${item.route}`);
            return (
              <Link
                key={item.route}
                href={`/dashboard${item.route}/${userId}`}
                className="w-full text-base font-medium"
                prefetch={true}
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
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetTrigger asChild className="block md:hidden">
          <Button variant="ghost" className="sm:hidden">
            <MenuIcon size={24} className="text-black dark:text-white" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-10">
          <div className="sr-only">Dashboard Navigation Menu</div>
          <ul className="flex flex-col gap-4">
            {DashboardNavLinks.map((item) => {
              const isActive = pathname.includes(`/dashboard${item.route}`);
              return (
                <Link
                  key={item.route}
                  href={`/dashboard${item.route}/${userId}`}
                  className="w-full text-base font-medium"
                  prefetch={true}
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
        </SheetContent>
      </Sheet>
    </>
  );
};

export default DashboardNav;
