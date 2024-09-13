"use client";

import { HoverEffect } from "@/components/ui/card-hover-effect";

export default function ClientCards({ roadmaps }: { roadmaps: any }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <HoverEffect items={roadmaps} />
    </div>
  );
}
