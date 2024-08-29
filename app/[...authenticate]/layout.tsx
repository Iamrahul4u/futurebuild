import { NavBar } from "@/components/shared/Navbar";

export const metadata = {
  title: "Futurebuild",
  description: "For Students by Students",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex h-full min-h-[97vh] w-full flex-col rounded-md border-2 border-slate-600 bg-white dark:bg-black">
      <NavBar />
      {children}
    </main>
  );
}
