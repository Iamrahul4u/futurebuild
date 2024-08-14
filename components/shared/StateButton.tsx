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
}
const StateButton: React.FC<buttonProps> = ({
  content,
  variant,
  processingWord,
  pending,
  className,
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
    >
      {pending ? processingWord : content}
    </Button>
  );
};

export default StateButton;
