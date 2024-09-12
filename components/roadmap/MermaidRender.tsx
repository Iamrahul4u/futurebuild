"use client";
import React, { useEffect, useState } from "react";
import mermaid from "mermaid";
import { Line } from "recharts";
import StateButton from "../shared/StateButton";
import { updateRoadmap } from "@/app/actions/roadmaps.action";
import { generateRoadmaps } from "@/app/actions/openAi.action";
import { toast } from "sonner";
import { set } from "date-fns";
import { useRouter } from "next/navigation";

const MermaidComponent = ({
  chart,
  prompt,
  id,
}: {
  chart: string;
  prompt: string;
  id: string;
}) => {
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(false);
  const router = useRouter();
  useEffect(() => {
    mermaid.parseError = function (err, hash) {
      setError(true);
      return;
    };
    mermaid.initialize({
      startOnLoad: true,
      htmlLabels: true,
      wrap: true,
      securityLevel: "loose",
      layout: "td",
      flowchart: {
        defaultRenderer: "dagre-wrapper",
        useMaxWidth: true,
        arrowMarkerAbsolute: true,
        curve: "cardinal",
        htmlLabels: true,
      },

      themeVariables: {
        primaryColor: "#00d0ff",
        primaryBorderColor: "#00d0ff",
        lineColor: "#c8793c",
        actorBkg: "#00d0ff",
        actorLineColor: "#00d0ff",
        signalColor: "#00d0ff",
        fontSize: "28px",
        noteBorderColor: "#c8793c",
      },
      arrowMarkerAbsolute: true,
    });
    mermaid.run({ querySelector: ".mermaid" });

    mermaid.contentLoaded();
  }, [mermaid]);
  async function handleRegenerateRoadmap() {
    setPending(true);
    const newRoadmap = await generateRoadmaps({ prompt, error: true });
    if (!newRoadmap) {
      return;
    }
    const parsedResponse = JSON.parse(newRoadmap).mermaidSyntax;
    const response = await updateRoadmap({
      roadmap: parsedResponse,
      roadmapId: id,
    });
    if ("error" in response) {
      toast.error(response.error);
      return;
    }
    toast.success("Roadmap Generated Successfully. Refreshing the Page");
    setPending(false);
    window.location.reload();
  }
  return (
    <div className="mermaid-container flex h-full w-full flex-col items-center justify-center overflow-auto">
      <h1 className="my-4 text-5xl font-bold capitalize text-black dark:text-white">
        {prompt} Roadmap
      </h1>
      <div
        className="mermaid h-full w-full overflow-auto"
        style={{
          transformOrigin: "top left",
          height: "100%",
        }}
      >
        {!error && chart}
      </div>
      {error && (
        <div className="flex min-h-screen flex-col items-center justify-center text-gray-800 dark:text-white">
          <h1 className="mb-4 text-xl">
            Error occurred while generating RoadMap
          </h1>
          <StateButton
            content="Try Again"
            processingWord="Retrying..."
            pending={pending}
            onClick={handleRegenerateRoadmap}
          />
        </div>
      )}
    </div>
  );
};

export default MermaidComponent;
