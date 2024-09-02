import React from "react";
// eslint-disable-next-line camelcase
import { Metadata } from "next";
// import DashboardNav from "@/components/shared/DashboardNav";
import dynamic from "next/dynamic";
const DashboardNav = dynamic(() => import("@/components/shared/DashboardNav"));
export const metadata: Metadata = {
  title: "Dashboard",
};
export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative flex h-full w-full gap-10 overflow-hidden bg-background">
      <div className="flex flex-1 flex-col">
        <DashboardNav />
        <main className="flex-1 self-end overflow-y-scroll p-4 sm:w-[90%] sm:p-6 md:w-[80%]">
          {children}
        </main>
      </div>
    </section>
  );
}
