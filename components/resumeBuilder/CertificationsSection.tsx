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
    if (
      certification.name.trim() &&
      certification.issuer.trim() &&
      certification.year.trim()
    ) {
      handleFormDataChange("certifications", [
        ...formData.certifications,
        certification,
      ]);
      setCertification({ name: "", issuer: "", year: "" });
    }
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
          required
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
          required
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
          required
        />
      </div>
      <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
        Add Certification
      </button>
      {formData.certifications.length > 0 && (
        <div className="mt-4">
          <h3 className="mb-2 text-sm font-bold">Added Certifications:</h3>
          <ul className="list-inside list-disc">
            {formData.certifications.map((cert, index) => (
              <li key={index} className="text-sm text-gray-700">
                {cert.name} - {cert.issuer} ({cert.year})
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}
