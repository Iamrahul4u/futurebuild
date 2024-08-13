"use client";
import React from "react";
import { Boxes } from "../ui/background-boxes";
import { cn } from "@/lib/utils";

export function BackgroundBoxes({
  heading,
  content,
}: {
  heading: string;
  content: string;
}) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-white dark:bg-slate-900">
      <div className="pointer-events-none absolute inset-0 z-20 h-full w-full [mask-image:radial-gradient(transparent,white)] dark:bg-slate-900" />

      <Boxes />
      <h1
        className={cn(
          "relative z-20 text-xl text-black dark:text-white md:text-9xl",
        )}
      >
        {heading}
      </h1>
      <p className="relative z-20 mt-2 text-center text-2xl text-black dark:text-neutral-300">
        {content}
      </p>
    </div>
  );
}
