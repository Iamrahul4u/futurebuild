"use client";
import {
  ResumeBuilderInputFieldsClassname,
  ResumeProfileSectionDummyData,
} from "@/_constants/constants";
import { useState } from "react";

interface experience {
  company: string;
  jobTitle: string;
  startDate: string;
  location: string;
  endDate: string;
  description: string;
}

export default function ExperienceSection({
  formData,
  handleFormDataChange,
}: {
  formData: typeof ResumeProfileSectionDummyData;
  handleFormDataChange: (
    key: keyof typeof ResumeProfileSectionDummyData,
    value: any,
  ) => void;
}) {
  const [experience, setExperience] = useState<experience>({
    company: "",
    jobTitle: "",
    startDate: "",
    location: "",
    endDate: "",
    description: "",
  });
  const handleExperienceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setExperience((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddExperience = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.experience.length === 1) {
    }
    handleFormDataChange("experience", [...formData.experience, experience]);
    setExperience({
      company: "",
      jobTitle: "",
      startDate: "",
      location: "",
      endDate: "",
      description: "",
    });
  };
  return (
    <form className="flex flex-col gap-2" onSubmit={handleAddExperience}>
      <h2>Experience</h2>
      <div className="mb-4">
        <label className="mb-2 block text-sm font-bold">Company Name:</label>
        <input
          type="text"
          name="company"
          required
          placeholder="Google"
          value={experience.company}
          onChange={handleExperienceChange}
          className={ResumeBuilderInputFieldsClassname}
        />
      </div>
      <div className="mb-4">
        <label className="mb-2 block text-sm font-bold">Job Title:</label>
        <input
          type="text"
          name="jobTitle"
          required
          placeholder="Full Stack Developer"
          value={experience.jobTitle}
          onChange={handleExperienceChange}
          className={ResumeBuilderInputFieldsClassname}
        />
      </div>
      <div className="flex justify-between gap-4">
        <div className="mb-4 w-full">
          <label className="mb-2 block text-sm font-bold">Start Date:</label>
          <input
            type="text"
            name="startDate"
            placeholder="2021"
            required
            value={experience.startDate}
            onChange={handleExperienceChange}
            className={ResumeBuilderInputFieldsClassname}
          />
        </div>
        <div className="mb-4 w-full">
          <label className="mb-2 block text-sm font-bold">End Date:</label>
          <input
            type="text"
            name="endDate"
            placeholder="2022"
            required
            value={experience.endDate}
            onChange={handleExperienceChange}
            className={ResumeBuilderInputFieldsClassname}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-bold">Location:</label>
        <input
          type="text"
          name="location"
          placeholder="New York, NY"
          required
          value={experience.location}
          onChange={handleExperienceChange}
          className={ResumeBuilderInputFieldsClassname}
        />
      </div>
      <div className="mb-2">
        <label className="mb-2 block text-sm font-bold">Description:</label>
        <textarea
          name="description"
          placeholder="Developed and maintained web applications using Python, JavaScript, and various frameworks."
          required
          value={experience.description}
          onChange={handleExperienceChange}
          className={ResumeBuilderInputFieldsClassname}
        />
      </div>
      <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
        Add Experience
      </button>
      <p className="text-sm text-gray-500">
        Note: Click Add to show the Changes. You can add multiple experiences by
        clicking the button.
      </p>
    </form>
  );
}
