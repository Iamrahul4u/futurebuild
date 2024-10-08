"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

const ToasterShow = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [countdown, setCountDown] = useState(10);
  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown((prev) => {
        if (prev === 1) {
          router.push(pathname);
          return 10;
        }
        return prev - 1; // Decrease countdown
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [router, pathname]);

  return (
    <div className="fixed inset-0 z-[999] flex h-screen w-screen items-center justify-center bg-gray-600/50 animate-in fade-in-5">
      <div className="mx-auto max-w-md text-center animate-out fade-out-5">
        <TriangleAlertIcon className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Rate Limit Reached
        </h1>
        <p className="mt-4 text-muted-foreground text-white">
          You've reached the maximum number of requests allowed for this period.
          Please try again later.
        </p>
        <div className="mt-6">
          <Button variant="outline">
            {pathname === "/rate-limit" ? (
              <Link href="/">Go Back</Link>
            ) : (
              "Retrying in " + countdown
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

function TriangleAlertIcon(props: any) {
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
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

export default ToasterShow;
