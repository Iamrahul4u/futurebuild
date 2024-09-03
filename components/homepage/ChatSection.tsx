import Image from "next/image";
import { ResumeAIBuildAnimatedBeam } from "./ResumeAIBuildAnimatedBeam";
import { Button } from "../ui/button";
import Link from "next/link";
import ElegantButton from "./ELegantButton";
import { ChatBeam } from "./ChatBeam";
import WordRotate from "@/components/magicui/word-rotate";

export default function ChatSection() {
  return (
    <div className="container relative mt-16 flex h-full w-full flex-col items-center justify-center gap-4">
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
      <div className="absolute bottom-16 left-0 right-20 mx-auto flex w-full max-w-[1000px] flex-row justify-between">
        <p className="ml-4 text-2xl font-bold">Job Provider</p>
        <p className="text-2xl font-bold">User</p>
      </div>
      <div className="absolute bottom-20 left-0 right-0 mx-auto w-full max-w-[1000px]">
        <ChatBeam />
      </div>
      <div className="flex items-center gap-4">
        <WordRotate
          className="mt-1 text-4xl font-bold text-black dark:text-white"
          words={["Fast", "Direct"]}
        />
        <h2 className="text-4xl font-bold text-black dark:text-white">
          Communication
        </h2>
      </div>
    </div>
  );
}
