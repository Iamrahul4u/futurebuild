import { getUser } from "@/app/[...authenticate]/lucia";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import prisma from "@/prisma";
import { redirect } from "next/navigation";
import ClientCards from "./clientCards";

export default async function page() {
  const user = await getUser();
  if (user === null || "error" in user) {
    return redirect("/authenticate/signin");
  }

  const roadmaps = await prisma.roadMap.findMany({
    where: {
      userId: user.id,
    },
    orderBy: { createdAt: "desc" },

    select: { title: true, id: true },
  });
  const roadmapsWithlinks = roadmaps.map((roadmap) => {
    return { title: roadmap.title, link: `/roadmap/${roadmap.id}` };
  });
  return (
    <div className="flex flex-1 flex-col overflow-y-scroll bg-gradient-to-br from-blue-50 to-indigo-100 transition-colors duration-300 dark:from-gray-900 dark:to-gray-800">
      <header className="flex items-center justify-center bg-inherit pt-10 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          <span className="text-white dark:text-black">✨</span>
          <span className="font-bold text-primary underline">
            My Generated Roadmaps
          </span>
        </h1>
      </header>
      <ClientCards roadmaps={roadmapsWithlinks} />
    </div>
  );
}
