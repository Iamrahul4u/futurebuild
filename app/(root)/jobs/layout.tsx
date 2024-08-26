import React from "react";
// eslint-disable-next-line camelcase
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Jobs",
};
export default function JobLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative flex h-full w-full gap-10 overflow-hidden">
      {children}
    </section>
  );
}
