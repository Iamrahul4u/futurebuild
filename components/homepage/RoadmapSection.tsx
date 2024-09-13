import Image from "next/image";
import ElegantButton from "./ELegantButton";

export default function RoadmapSection() {
  return (
    <div className="container mt-10 flex h-full w-full flex-col items-center justify-center gap-4">
      <h2 className="font-mono mt-2 text-balance text-4xl font-bold tracking-tight sm:text-7xl">
        AI Roadmap Builder
      </h2>
      <p className="text-2xl font-medium leading-6 tracking-wide text-primary/70">
        Create your personalized AI roadmap and follow a curated path to
        success.
      </p>
      <div className="relative flex h-full flex-col items-center justify-between gap-4 sm:justify-center md:flex-row">
        <Image
          src="/homepage/roadmaps.webp"
          alt="LeetCode"
          width={800}
          height={800}
          className="duration-300 slide-in-from-bottom-4"
        />
      </div>
      <div className="flex items-center justify-center">
        <ElegantButton text="Generate Roadmap" link="/roadmap" />
      </div>
    </div>
  );
}
