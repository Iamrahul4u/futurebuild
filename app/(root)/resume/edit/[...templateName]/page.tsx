"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false },
);
import {
  ResumeProfileSectionDummyData,
  ResumeProfileSectionEmptyData,
} from "@/_constants/constants";
import NavigationButton from "@/components/resumeBuilder/NavigationButton";
import {
  templateConfigurations,
  Templates,
} from "@/_constants/TemplateConfigurations";
import { DownloadIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { AiModal } from "@/components/resumeBuilder/AiModal";

type FormData = typeof ResumeProfileSectionDummyData;
export default function Page() {
  const pathname = usePathname();
  const templateName = pathname.split("/").pop();
  const [template, setTemplate] = useState(
    templateName as keyof typeof Templates,
  );
  const [formData, setFormData] = useState<FormData>(
    ResumeProfileSectionEmptyData,
  );
  const [debouncedFormData, setDebouncedFormData] = useState<FormData>(
    ResumeProfileSectionDummyData,
  );
  const [step, setStep] = useState(1);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleFormDataChange = (key: keyof FormData, value: string) => {
    const newFormData = {
      ...formData,
      [key]: value,
    };
    setFormData(newFormData);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setDebouncedFormData({
        ...debouncedFormData,
        [key]: value,
      });
    }, 500);
  };

  const Template = useMemo(() => Templates[template].component, [template]);
  const steps = useMemo(
    () =>
      templateConfigurations[template as keyof typeof templateConfigurations],
    [template],
  );

  return (
    <section className="flex w-full overflow-hidden">
      <div className="w-1/2 overflow-hidden overflow-y-scroll p-4">
        {step === steps.length && (
          <div className="mb-4 flex h-8 items-center justify-center gap-2 rounded-sm bg-gradient-to-tr from-blue-500 to-blue-300">
            <p className="mb-0">Hurray Resume is Completed. Click on </p>
            <DownloadIcon height={20} width={20} className="" />
            <p className="mb-0">to Download the pdf.</p>
          </div>
        )}
        <div className="flex h-10 items-center justify-between">
          <h1 className="text-2xl font-bold">Step {step}</h1>
          <div className="flex items-center gap-2">
            <AiModal
              setFormData={setFormData}
              setDebouncedFormData={setDebouncedFormData}
            />
            <NavigationButton
              setStep={setStep}
              step={step}
              totalSteps={steps.length}
            />
          </div>
        </div>
        {steps.map(
          ({ step: s, component: Component, key }) =>
            s === step && (
              <Component
                key={key}
                formData={formData}
                handleFormDataChange={handleFormDataChange}
              />
            ),
        )}
      </div>

      <div className="h-[90vh] w-1/2 overflow-hidden p-4">
        <h2>Resume Preview</h2>
        <PDFViewer width="100%" height="100%" key={step}>
          <Template formData={debouncedFormData} />
        </PDFViewer>
      </div>
    </section>
  );
}
