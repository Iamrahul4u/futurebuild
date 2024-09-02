"use client";
import { ResumeProfileSectionDummyData } from "@/_constants/constants";
import React from "react";
export default function ProfileSection({
  formData,
  handleFormDataChange,
}: {
  formData: typeof ResumeProfileSectionDummyData;
  handleFormDataChange: (
    key: keyof typeof ResumeProfileSectionDummyData,
    value: any,
  ) => void;
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2>Profile Section</h2>
      <div className="mb-4">
        <label className="mb-2 block text-sm font-bold">Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Rahul Gupta"
          value={formData.name}
          onChange={(e) => handleFormDataChange("name", e.target.value)}
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label className="mb-2 block text-sm font-bold">Quick Summary 1:</label>
        <input
          type="text"
          name="quickSummary1"
          placeholder="President and CEO: Manufacturing Start-Ups and Turnarounds"
          value={formData.quickSummary1}
          onChange={(e) =>
            handleFormDataChange("quickSummary1", e.target.value)
          }
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label className="mb-2 block text-sm font-bold">Quick Summary 2:</label>
        <input
          type="text"
          name="quickSummary2"
          placeholder="Strategic Planning, Financial Management, and Operational Excellence"
          value={formData.quickSummary2}
          onChange={(e) =>
            handleFormDataChange("quickSummary2", e.target.value)
          }
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label className="mb-2 block text-sm font-bold">Address:</label>
        <input
          type="text"
          name="address"
          placeholder="1234 Main St, Anytown, USA"
          value={formData.address}
          onChange={(e) => handleFormDataChange("address", e.target.value)}
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label className="mb-2 block text-sm font-bold">Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          placeholder="1234567890"
          value={formData.phoneNumber}
          onChange={(e) => handleFormDataChange("phoneNumber", e.target.value)}
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label className="mb-2 block text-sm font-bold">Email:</label>
        <input
          type="text"
          name="email"
          placeholder="iamrahulgupta4u@gmail.com"
          value={formData.email}
          onChange={(e) => handleFormDataChange("email", e.target.value)}
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label className="mb-2 block text-sm font-bold">LinkedIn:</label>
        <input
          type="text"
          name="linkedIn"
          placeholder="https://www.linkedin.com/in/rahul-gupta"
          value={formData.linkedIn}
          onChange={(e) => handleFormDataChange("linkedIn", e.target.value)}
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
        />
      </div>
    </section>
  );
}
