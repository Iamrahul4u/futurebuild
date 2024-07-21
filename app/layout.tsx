import { ThemeProvider } from "./ThemeProvider";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ShowConnection } from "@/components/shared/CheckConnection";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en" className={inter.className} suppressHydrationWarning>
        <body suppressHydrationWarning={true}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ShowConnection />
            {children}
            <Toaster richColors />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
