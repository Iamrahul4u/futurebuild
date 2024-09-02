import Link from "next/link";
import { Button } from "../ui/button";
import JobCardHome from "./JobCardHome";
import ElegantButton from "./ELegantButton";
import Image from "next/image";

export default function LeetCodeSection() {
  return (
    <div className="container mt-10 flex h-full w-full flex-col items-center justify-center gap-4">
      <h2 className="font-mono mt-2 text-balance text-4xl font-bold tracking-tight sm:text-7xl">
        LeetCode Problems
      </h2>
      <p className="text-2xl font-medium leading-6 tracking-wide text-primary/70">
        Solve LeetCode Problems.Grow your coding skills.Ace your next interview.
      </p>
      <div className="flex h-full flex-col items-center justify-between gap-4 sm:justify-center md:flex-row">
        <Image
          src="/homepage/leetcode.webp"
          alt="LeetCode"
          width={800}
          height={800}
          className="duration-300 slide-in-from-bottom-4"
        />
      </div>
      <div className="flex items-center justify-center">
        <ElegantButton text="Solve Problems" link="/practice" />
      </div>
    </div>
  );
}
