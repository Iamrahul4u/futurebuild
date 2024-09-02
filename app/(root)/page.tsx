import Link from "next/link";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/homepage/HeroSection";
import FeaturesSection from "@/components/homepage/FeaturesSection";
import ResumeBuilderSection from "@/components/homepage/ResumeBuilderSection";
import ChatSection from "@/components/homepage/ChatSection";
import LeetCodeSection from "@/components/homepage/LeetcodeSection";
import Footer from "@/components/homepage/Footer";
export default function Page() {
  return (
    <div className="flex max-h-[90dvh] flex-col overflow-hidden overflow-y-scroll bg-background dark:bg-black">
      <main className="flex flex-col gap-10">
        <HeroSection />
        <FeaturesSection />
        <ResumeBuilderSection />
        <ChatSection />
        <LeetCodeSection />
        <Footer />
      </main>
    </div>
  );
}
