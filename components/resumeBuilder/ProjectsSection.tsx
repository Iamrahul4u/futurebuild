"use client";
import {
  ResumeBuilderInputFieldsClassname,
  ResumeProfileSectionDummyData,
} from "@/_constants/constants";
import { useState } from "react";

interface Project {
  name: string;
  description: string;
  role: string;
  year: string;
}

export default function ProjectsSection({
  formData,
  handleFormDataChange,
}: {
  formData: typeof ResumeProfileSectionDummyData;
  handleFormDataChange: (
    key: keyof typeof ResumeProfileSectionDummyData,
    value: any,
  ) => void;
}) {
  const [project, setProject] = useState<Project>({
    name: "",
    description: "",
    role: "",
    year: "",
  });

  const handleProjectChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      project.name.trim() &&
      project.description.trim() &&
      project.role.trim() &&
      project.year.trim()
    ) {
      handleFormDataChange("projects", [...formData.projects, project]);
      setProject({ name: "", description: "", role: "", year: "" });
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleAddProject}>
      <h2>Projects</h2>
      <div className="mb-4">
        <label className="mb-2 block text-sm font-bold">Project Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Chatbot Development"
          value={project.name}
          onChange={handleProjectChange}
          className={ResumeBuilderInputFieldsClassname}
          required
        />
      </div>
      <div className="mb-4">
        <label className="mb-2 block text-sm font-bold">
          Project Description:
        </label>
        <textarea
          name="description"
          placeholder="Developed an AI-based chatbot..."
          value={project.description}
          onChange={handleProjectChange}
          className={ResumeBuilderInputFieldsClassname}
          required
        />
      </div>
      <div className="mb-4">
        <label className="mb-2 block text-sm font-bold">Role:</label>
        <input
          type="text"
          name="role"
          placeholder="Lead Developer"
          value={project.role}
          onChange={handleProjectChange}
          className={ResumeBuilderInputFieldsClassname}
          required
        />
      </div>
      <div className="mb-4">
        <label className="mb-2 block text-sm font-bold">Year:</label>
        <input
          type="text"
          name="year"
          placeholder="2021"
          value={project.year}
          onChange={handleProjectChange}
          className={ResumeBuilderInputFieldsClassname}
          required
        />
      </div>
      <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
        Add Project
      </button>
      {formData.projects.length > 0 && (
        <div className="mt-4">
          <h3 className="mb-2 text-sm font-bold">Added Projects:</h3>
          <ul className="list-inside list-disc">
            {formData.projects.map((proj, index) => (
              <li key={index} className="text-sm text-gray-700">
                {proj.name} - {proj.role} ({proj.year})<p>{proj.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}
