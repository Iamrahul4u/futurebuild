"use client";
import React from "react";
import { Button } from "../ui/button";
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
      className={className ?? ""}
    >
      {pending ? processingWord : content}
    </Button>
  );
};

export default StateButton;
