import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Build Your Future With FUTUREBUILD",
    short_name: "FUTUREBUILD",
    description:
      "Discover your dream job, sharpen your skills, and build a standout resume with our comprehensive platform,Get personalized Roadmaps powered by our✨AI Assistant.",
    start_url: "https://futurebuildv1.vercel.app",
  };
}
