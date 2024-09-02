"use client";
import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
interface buttonProps {
  pending?: boolean;
  processingWord?: string;
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "ghost"
    | "link"
    | null
    | undefined;
  content: string;
  className?: string;
  onClick?: () => void;
}
const StateButton: React.FC<buttonProps> = ({
  content,
  variant,
  processingWord,
  pending,
  className,
  onClick,
}) => {
  return (
    <Button
      type="submit"
      disabled={pending}
      variant={variant ?? "default"}
      className={cn(
        className,
        `${pending ? "!disabled:text-gray-400 cursor-not-allowed !bg-gray-600" : ""}`,
      )}
      onClick={onClick}
    >
      {pending ? (
        <span className="flex items-center gap-2">
          <svg
            className="h-5 w-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
          {processingWord}
        </span>
      ) : (
        content
      )}
    </Button>
  );
};

export default StateButton;
