import "../globals.css";
// eslint-disable-next-line camelcase
import { NavBar } from "../../components/shared/Navbar";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: {
    default: "Build your future with FUTUREBUILD",
    template: "%s | FUTUREBUILD",
  },
  description:
    "Discover your dream job, sharpen your skills, and build a standout resume with our comprehensive platform,Get personalized Roadmaps powered by our✨AI Assistant.",
  metadataBase: new URL("https://futurebuildv1.vercel.app"),
};
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative flex h-full min-h-[97vh] w-full flex-col rounded-md border-2 border-slate-600 bg-white dark:bg-black">
      <NavBar />
      {children}
    </main>
  );
}
