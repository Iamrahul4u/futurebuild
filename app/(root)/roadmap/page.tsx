import { getUser } from "@/app/[...authenticate]/lucia";
import CreditsButton from "@/components/resumeBuilder/CreditsButton";
import GenerateRoadmap from "@/components/roadmap/GenerateRoadmap";
import prisma from "@/prisma";

// Simulated AI function to generate roadmap titles

// Demo roadmap titles

export default async function Page() {
  const roadmaps = await prisma.roadMap.findMany({
    take: 12,
    orderBy: { createdAt: "desc" },

    select: { title: true, id: true },
  });
  const user = await getUser();

  const roadMapsWithlinks = roadmaps.map((roadmap) => {
    return { title: roadmap.title, link: `/roadmap/${roadmap.id}` };
  });
  return (
    <div className="flex flex-1 flex-col overflow-y-scroll bg-gradient-to-br from-blue-50 to-indigo-100 transition-colors duration-300 dark:from-gray-900 dark:to-gray-800">
      <header className="relative flex items-center justify-center bg-inherit pt-10 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          <span className="text-white dark:text-black">✨</span>
          <span className="font-bold text-primary underline">
            AI Roadmap Generator
          </span>
        </h1>
        <span className="absolute right-0 pb-4">
          {user && "id" in user && <CreditsButton userId={user.id} />}
        </span>
      </header>

      <GenerateRoadmap roadmaps={roadMapsWithlinks} />
    </div>
  );
}
