"use client";
import {
  ResumeBuilderInputFieldsClassname,
  ResumeProfileSectionDummyData,
} from "@/_constants/constants";
import { useState } from "react";

interface Education {
  degree: string;
  institution: string;
  location: string;
  year: string;
  cgpa: string;
}

export default function EducationSection({
  formData,
  handleFormDataChange,
}: {
  formData: typeof ResumeProfileSectionDummyData;
  handleFormDataChange: (
    key: keyof typeof ResumeProfileSectionDummyData,
    value: any,
  ) => void;
}) {
  const [education, setEducation] = useState<Education>({
    degree: "",
    institution: "",
    location: "",
    year: "",
    cgpa: "",
  });

  const handleEducationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setEducation((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEducation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleFormDataChange("education", [...formData.education, education]);
    setEducation({
      degree: "",
      institution: "",
      location: "",
      year: "",
      cgpa: "",
    });
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleAddEducation}>
      <h2>Education</h2>
      <div className="mb-4">
        <label className="mb-2 block text-sm font-bold">Degree:</label>
        <input
          type="text"
          name="degree"
          placeholder="Bachelor's in Computer Science"
          value={education.degree}
          onChange={handleEducationChange}
          className={ResumeBuilderInputFieldsClassname}
        />
      </div>
      <div className="mb-4">
        <label className="mb-2 block text-sm font-bold">Institution:</label>
        <input
          type="text"
          name="institution"
          placeholder="ABC University"
          value={education.institution}
          onChange={handleEducationChange}
          className={ResumeBuilderInputFieldsClassname}
        />
      </div>
      <div className="mb-4">
        <label className="mb-2 block text-sm font-bold">Location:</label>
        <input
          type="text"
          name="location"
          placeholder="New York, NY"
          value={education.location}
          onChange={handleEducationChange}
          className={ResumeBuilderInputFieldsClassname}
        />
      </div>
      <div className="mb-4">
        <label className="mb-2 block text-sm font-bold">Year:</label>
        <input
          type="text"
          name="year"
          placeholder="2015-2019"
          value={education.year}
          onChange={handleEducationChange}
          className={ResumeBuilderInputFieldsClassname}
        />
      </div>
      <div className="mb-4">
        <label className="mb-2 block text-sm font-bold">CGPA:</label>
        <input
          type="text"
          name="cgpa"
          placeholder="8.5"
          value={education.cgpa}
          onChange={handleEducationChange}
          className={ResumeBuilderInputFieldsClassname}
        />
      </div>
      <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
        Add Education
      </button>
    </form>
  );
}
