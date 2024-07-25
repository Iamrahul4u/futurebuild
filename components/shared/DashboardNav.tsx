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

const DashboardNav = () => {
  return (
    <aside className="fixed left-0 z-[9999] flex h-full w-[20%] flex-col border-l border-r border-black bg-background sm:w-64">
      <nav className="flex flex-1 flex-col gap-4 px-4 py-6 sm:px-6">
        <Link
          href="#"
          className="flex items-center gap-4 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <HomeIcon className="h-5 w-5" />
          <span className="text-sm font-medium sm:block">Home</span>
        </Link>
      </nav>
    </aside>
  );
};

export default DashboardNav;
