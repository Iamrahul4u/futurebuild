import Image from "next/image";
import { ResumeAIBuildAnimatedBeam } from "./ResumeAIBuildAnimatedBeam";
import { Button } from "../ui/button";
import Link from "next/link";
import ElegantButton from "./ELegantButton";
export default function ResumeBuilderSection() {
  return (
    <div className="container mt-16 flex h-full w-full flex-col items-center justify-center gap-4">
      <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2">
        <div className="col-span-1 mt-10 flex flex-col items-center justify-center">
          <p className="text-2xl font-medium leading-6 tracking-wide text-primary/70">
            User sends Short introduction to AI
          </p>
          <ResumeAIBuildAnimatedBeam />
          <p className="text-2xl font-medium leading-6 tracking-wide text-primary/70">
            AI sends back Detailed data
          </p>
        </div>
        <div className="col-span-1">
          <h2 className="font-mono mt-2 text-balance text-4xl font-bold tracking-tight sm:text-7xl">
            Resume Builder
          </h2>
          <p className="text-2xl font-medium leading-6 tracking-wide text-primary/70">
            Resume Builder is a tool that helps you build your resume. It uses
            AI to help you build your resume in a few clicks. Select from a
            variety of templates and customize your resume to your liking.
          </p>
          <ElegantButton text="Build Resume" link="/resume/template" />
        </div>
      </div>
    </div>
  );
}
