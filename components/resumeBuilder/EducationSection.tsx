"use client";
import {
  ResumeBuilderInputFieldsClassname,
  ResumeProfileSectionDummyData,
} from "@/_constants/constants";
import { Trash2Icon } from "lucide-react";
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
    degree: formData.education?.[formData.education?.length - 1]?.degree ?? "",
    institution:
      formData.education?.[formData.education?.length - 1]?.institution ?? "",
    location:
      formData.education?.[formData.education?.length - 1]?.location ?? "",
    year: formData.education?.[formData.education?.length - 1]?.year ?? "",
    cgpa: formData.education?.[formData.education?.length - 1]?.cgpa ?? "",
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
      <div className="flex items-center justify-between">
        <h2>Education</h2>
        {formData.education.length >= 1 && (
          <span className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Delete Last Education</span>
            <Trash2Icon
              color="red"
              height={20}
              width={20}
              className="h-5 w-5 cursor-pointer duration-300 hover:scale-110 hover:rounded-full hover:text-red-500 hover:transition-transform"
              onClick={() => {
                handleFormDataChange(
                  "education",
                  formData.education.slice(0, -1),
                );
              }}
            />
          </span>
        )}
      </div>
      <div className="mb-4">
        <label className="mb-2 block text-sm font-bold">Degree:</label>
        <input
          type="text"
          name="degree"
          placeholder="Bachelor's in Computer Science"
          value={education.degree}
          onChange={handleEducationChange}
          className={ResumeBuilderInputFieldsClassname}
          required
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
          required
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
          required
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
          required
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
          required
        />
      </div>
      <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
        Add Education
      </button>
      <p className="text-sm text-gray-500">
        Note: Click Add to show the Changes. You can add multiple education
        entries by clicking the button.
      </p>
    </form>
  );
}
