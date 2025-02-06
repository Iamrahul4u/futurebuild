import dynamic from "next/dynamic";

const HeroSection = dynamic(() => import("@/components/homepage/HeroSection"));
const FeaturesSection = dynamic(
  () => import("@/components/homepage/FeaturesSection"),
);
const ResumeBuilderSection = dynamic(
  () => import("@/components/homepage/ResumeBuilderSection"),
);
const ChatSection = dynamic(() => import("@/components/homepage/ChatSection"));
const LeetCodeSection = dynamic(
  () => import("@/components/homepage/LeetcodeSection"),
);
const Footer = dynamic(() => import("@/components/homepage/Footer"));
const RoadmapSection = dynamic(
  () => import("@/components/homepage/RoadmapSection"),
);

export default function Page() {
  return (
    <div className="flex max-h-[90dvh] flex-col overflow-hidden overflow-y-scroll bg-background dark:bg-black">
      <main className="flex flex-col gap-10">
        <HeroSection />
        <FeaturesSection />
        <ResumeBuilderSection />
        <ChatSection />
        <LeetCodeSection />
        <RoadmapSection />
        <Footer />
      </main>
    </div>
  );
}
