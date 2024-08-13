"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

export const ShowConnection = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [online, setOnline] = useState(true);
  const checkOnlineStatus = async () => {
    try {
      const response = await fetch(
        "https://old-hat-fef4.iamrahulgupta4u.workers.dev/",
        {
          method: "GET",
          cache: "no-store",
        },
      );

      setOnline(response.ok);
    } catch (error) {
      setOnline(false);
    }
  };
  useEffect(() => {
    checkOnlineStatus();
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    const interval = setInterval(checkOnlineStatus, 5000);
    return () => {
      clearInterval(interval);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  return (
    !online && (
      <div className="absolute z-[9999999] flex min-h-screen w-full items-center justify-center bg-[rgba(0,0,0,0.5)]">
        <div className="rounded-lg bg-background p-8 shadow-lg">
          <div className="flex flex-col items-center gap-4">
            <WifiOffIcon className="h-12 w-12 text-primary" />
            <h1 className="text-3xl font-bold dark:text-white">
              Oops, you're offline!
            </h1>
            <p className="text-muted-foreground">
              It looks like you're not connected to the internet. Please check
              your connection and try again.
            </p>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="mt-4 flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <RefreshCwIcon className="h-4 w-4" />
              Retry
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

function RefreshCwIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  );
}

function WifiOffIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20h.01" />
      <path d="M8.5 16.429a5 5 0 0 1 7 0" />
      <path d="M5 12.859a10 10 0 0 1 5.17-2.69" />
      <path d="M19 12.859a10 10 0 0 0-2.007-1.523" />
      <path d="M2 8.82a15 15 0 0 1 4.177-2.643" />
      <path d="M22 8.82a15 15 0 0 0-11.288-3.764" />
      <path d="m2 2 20 20" />
    </svg>
  );
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
