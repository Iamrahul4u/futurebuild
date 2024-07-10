import React from "react";
// eslint-disable-next-line camelcase
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FutureBuild",
};
export default function JobLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="h-full overflow-hidden flex w-full  gap-10 relative">
      {children}
    </section>
  );
}
