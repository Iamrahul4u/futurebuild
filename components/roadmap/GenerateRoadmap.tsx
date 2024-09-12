"use client";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2, Send } from "lucide-react";
import { HoverEffect } from "../ui/card-hover-effect";
import { generateRoadmaps } from "@/app/actions/openAi.action";
import { setRoadmap } from "@/app/actions/roadmaps.action";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";
import { MultiStepLoader } from "../ui/multi-step-loader";
import { loadingStatesRoadmap } from "@/_constants/constants";

const demoRoadmapTitles = [
  { title: "Learn React", link: "/roadmap/learn-react" },
  { title: "Master TypeScript", link: "/roadmap/master-typescript" },
  { title: "Explore AI", link: "/roadmap/explore-ai" },
  { title: "Build a Startup", link: "/roadmap/build-a-startup" },
  { title: "Learn Cloud Computing", link: "/roadmap/learn-cloud-computing" },
  {
    title: "Become a Data Scientist",
    link: "/roadmap/become-a-data-scientist",
  },
  { title: "Dive into Blockchain", link: "/roadmap/dive-into-blockchain" },
  { title: "Master UI/UX Design", link: "/roadmap/master-ui-ux-design" },
  { title: "Learn DevOps", link: "/roadmap/learn-devops" },
  {
    title: "Explore Quantum Computing",
    link: "/roadmap/explore-quantum-computing",
  },
  { title: "Master Data Structures", link: "/roadmap/master-data-structures" },
  { title: "Learn Game Development", link: "/roadmap/learn-game-development" },
];

interface RoadMaps {
  title: string;
  link: string;
}
export default function GenerateRoadmap({
  roadmaps,
}: {
  roadmaps: RoadMaps[];
}) {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [recentRoadmaps, setRecentRoadmaps] = useState<
    (typeof demoRoadmapTitles)[]
  >([]);
  const router = useRouter();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (prompt.length === 0) {
      return;
    }
    setIsGenerating(true);
    const response = await generateRoadmaps({ prompt });
    if (!response) {
      toast.error("Something went wrong");
      setIsGenerating(false);

      return;
    }
    if (typeof response === "object" && "error" in response) {
      toast.error(response?.error);
      setIsGenerating(false);

      return;
    }
    if (typeof response === "string") {
      const parsedResponse = JSON.parse(response).mermaidSyntax;
      const roadmap = await setRoadmap({
        roadmap: parsedResponse,
        title: prompt,
      });
      if ("id" in roadmap) {
        return router.push(`/roadmap/${roadmap.id}`);
      }
    } else {
      setIsGenerating(false);

      toast.error("Error generating roadmap");
    }
    setIsGenerating(false);
  }
  return (
    <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <MultiStepLoader
        loadingStates={loadingStatesRoadmap}
        loading={isGenerating}
        duration={2000}
      />

      <form
        onSubmit={handleSubmit}
        className="flex gap-4 rounded-lg bg-white p-4 shadow-md dark:bg-gray-700"
      >
        <Input
          type="text"
          placeholder="Enter a topic for your roadmap..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-grow text-lg dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
        />
        <Button
          type="submit"
          disabled={isGenerating}
          className="bg-blue-600 px-6 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          {isGenerating ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Send className="mr-2 h-5 w-5" />
          )}
          Generate
        </Button>
      </form>
      <h2 className="-mb-6 mt-8 text-center font-bold text-black dark:text-white">
        Recent Roadmaps
      </h2>
      <div className="mx-auto max-w-7xl">
        <HoverEffect items={roadmaps} />
      </div>
    </main>
  );
}
