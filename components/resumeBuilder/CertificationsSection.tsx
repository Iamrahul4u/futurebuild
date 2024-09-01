"use client";
import {
  ResumeBuilderInputFieldsClassname,
  ResumeProfileSectionDummyData,
} from "@/_constants/constants";
import { useState } from "react";

interface Certification {
  name: string;
  issuer: string;
  year: string;
}

export default function CertificationsSection({
  formData,
  handleFormDataChange,
}: {
  formData: typeof ResumeProfileSectionDummyData;
  handleFormDataChange: (
    key: keyof typeof ResumeProfileSectionDummyData,
    value: any,
  ) => void;
}) {
  const [certification, setCertification] = useState<Certification>({
    name: "",
    issuer: "",
    year: "",
  });

  const handleCertificationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setCertification((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCertification = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleFormDataChange("certifications", [
      ...formData.certifications,
      certification,
    ]);
    setCertification({ name: "", issuer: "", year: "" });
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleAddCertification}>
      <h2>Certifications</h2>
      <div className="mb-4">
        <label className="mb-2 block text-sm font-bold">Name:</label>
        <input
          type="text"
          name="name"
          placeholder="AWS Certified Developer"
          value={certification.name}
          onChange={handleCertificationChange}
          className={ResumeBuilderInputFieldsClassname}
        />
      </div>
      <div className="mb-4">
        <label className="mb-2 block text-sm font-bold">Issuer:</label>
        <input
          type="text"
          name="issuer"
          placeholder="Amazon Web Services"
          value={certification.issuer}
          onChange={handleCertificationChange}
          className={ResumeBuilderInputFieldsClassname}
        />
      </div>
      <div className="mb-4">
        <label className="mb-2 block text-sm font-bold">Year:</label>
        <input
          type="text"
          name="year"
          placeholder="2020"
          value={certification.year}
          onChange={handleCertificationChange}
          className={ResumeBuilderInputFieldsClassname}
        />
      </div>
      <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
        Add Certification
      </button>
    </form>
  );
}
