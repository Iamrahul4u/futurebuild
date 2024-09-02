import Image from "next/image";
import { ResumeAIBuildAnimatedBeam } from "./ResumeAIBuildAnimatedBeam";
import { Button } from "../ui/button";
import Link from "next/link";
import ElegantButton from "./ELegantButton";
export default function ChatSection() {
  return (
    <div className="container mt-16 flex h-full w-full flex-col items-center justify-center gap-4">
      <h2 className="font-mono mt-2 text-balance text-4xl font-bold tracking-tight sm:text-center sm:text-7xl">
        Real Time Chat
      </h2>
      <p className="max-w-3xl text-center text-2xl font-medium leading-6 tracking-wide text-primary/70">
        Real Time Chat is a tool that helps you chat with job seekers and job
        providers in real time.Only Job Providers can Start chat with job
        seekers.
      </p>
      <Image
        src="/homepage/chatting.svg"
        alt="Chat"
        quality={100}
        width={800}
        height={800}
        className="bg-transparent md:-mt-20"
      />
    </div>
  );
}
