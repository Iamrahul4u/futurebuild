import { ThemeProvider } from "./ThemeProvider";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ShowConnection } from "@/components/shared/CheckConnection";
import { ConvexClientProvider } from "@/components/convex/ConvexClientProvider";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
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
    <>
      <html lang="en" className={inter.className} suppressHydrationWarning>
        <body suppressHydrationWarning={true} className="bg-black">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ShowConnection />
            <ConvexClientProvider>
              {children}
              <Toaster richColors />
            </ConvexClientProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
