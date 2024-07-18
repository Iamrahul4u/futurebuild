import React from "react";
import "../globals.css";
// eslint-disable-next-line camelcase
import { Metadata } from "next";
import { NavBar } from "../../components/shared/Navbar";
import { ThemeProvider } from "../ThemeProvider";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex border-slate-600  border-2 relative w-full h-full min-h-[97vh] rounded-md flex-col  bg-white dark:bg-black">
      <NavBar />
      {children}
    </main>
  );
}
