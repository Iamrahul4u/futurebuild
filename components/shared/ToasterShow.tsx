"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const ToasterShow = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [countdown, setCountDown] = useState(10);
  useEffect(() => {
    router.prefetch(pathname);
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
  }, [router]);

  return (
    <div className="fixed inset-0 z-[999] flex items-center fade-in-5 animate-in justify-center w-screen h-screen  bg-gray-600/50">
      <div className="mx-auto max-w-md text-center animate-out fade-out-5">
        <TriangleAlertIcon className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Rate Limit Reached
        </h1>
        <p className="mt-4 text-muted-foreground text-white ">
          You've reached the maximum number of requests allowed for this period.
          Please try again later.
        </p>
        <div className="mt-6">
          <Link
            href="#"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            prefetch={false}
          >
            Retrying in {countdown}
          </Link>
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
