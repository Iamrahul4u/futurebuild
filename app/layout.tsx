import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { NextRequest, NextResponse } from "next/server";
import { ThemeProvider } from "./ThemeProvider";
export const metadata: Metadata = {
  title: "FutureBuild",
};
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={cn(
          "bg-background font-sans antialiased  bg-orange-400 max-w-full  relative max-h-screen overflow-x-hidden p-2",
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
