"use client";
import {
  ResumeBuilderInputFieldsClassname,
  ResumeProfileSectionDummyData,
} from "@/_constants/constants";
import { useState } from "react";

export default function SkillsSection({
  formData,
  handleFormDataChange,
}: {
  formData: typeof ResumeProfileSectionDummyData;
  handleFormDataChange: (
    key: keyof typeof ResumeProfileSectionDummyData,
    value: any,
  ) => void;
}) {
  const [skill, setSkill] = useState<string>("");

  const handleAddSkill = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (skill.trim()) {
      handleFormDataChange("skills", [...formData.skills, skill.trim()]);
      setSkill("");
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleAddSkill}>
      <h2>Skills</h2>
      <div className="mb-4">
        <label className="mb-2 block text-sm font-bold">Skill:</label>
        <input
          type="text"
          name="skill"
          placeholder="React"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          className={ResumeBuilderInputFieldsClassname}
          required
        />
      </div>
      <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
        Add Skill
      </button>
      {formData.skills.length > 0 && (
        <div className="mt-4">
          <h3 className="mb-2 text-sm font-bold">Added Skills:</h3>
          <ul className="list-inside list-disc">
            {formData.skills.map((skill, index) => (
              <li key={index} className="text-sm text-gray-700">
                {skill}
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}
