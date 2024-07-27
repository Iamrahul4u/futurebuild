import React from "react";
// eslint-disable-next-line camelcase
import { Metadata } from "next";
import DashboardNav from "@/components/shared/DashboardNav";

export const metadata: Metadata = {
  title: "Create New Job",
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
        <main className="w-[70%] flex-1 self-end overflow-y-scroll p-4 sm:p-6">
          {children}
        </main>
      </div>
    </section>
  );
}
