import "../globals.css";
// eslint-disable-next-line camelcase
import { NavBar } from "../../components/shared/Navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex border-slate-600  border-2 relative w-full h-full min-h-[97vh] rounded-md flex-col  bg-white dark:bg-black">
      <NavBar />

      {children}
    </main>
  );
}
