import React from "react";

export default function NavigationButton({
  step,
  setStep,
  totalSteps,
  user,
}: {
  step: number;
  setStep: (step: number) => void;
  totalSteps: number;
  user: string | null;
}) {
  return (
    <div className="flex gap-2">
      <button
        disabled={step <= 1 || !user}
        onClick={() => setStep(step - 1)}
        className={`${step <= 1 || !user ? "cursor-not-allowed rounded-md bg-gray-400 px-4 py-1.5 text-black" : "rounded-md bg-gray-100 px-4 py-2 text-black"}`}
      >
        Previous
      </button>

      <button
        onClick={() => setStep(step + 1)}
        disabled={step >= totalSteps || !user}
        className={`${step >= totalSteps || !user ? "cursor-not-allowed rounded-md bg-gray-400 px-4 py-2 text-black" : "rounded-md bg-gray-100 px-4 py-2 text-black"}`}
      >
        Next
      </button>
    </div>
  );
}
