"use server";
import {
  CoverLetterSchema,
  ResumeProfileSectionSchema,
} from "@/types/zodValidations";
import { OpenAI } from "openai";
import { zodResponseFormat } from "openai/helpers/zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateResume(resume: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-2024-08-06",
    messages: [
      {
        role: "system",
        content:
          "You are an expert at generating Resume Data Based on User's Paragraph Input Don't generate any other data not provided in the input leave them blank",
      },
      { role: "user", content: resume },
    ],
    response_format: zodResponseFormat(
      ResumeProfileSectionSchema,
      "Resume_Profile_Section",
    ),
  });
  return response.choices[0].message.content;
}

export async function generateCoverLetter(
  coverLetter: string,
  userInfo: string,
) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-2024-08-06",
    messages: [
      {
        role: "system",
        content:
          "You are an expert at generating Cover Letter Data Based on Job's Description and User's short paragraph about themselves.",
      },
      { role: "user", content: coverLetter },
    ],
    response_format: zodResponseFormat(CoverLetterSchema, "Cover_Letter"),
  });
  return response.choices[0].message.content;
}
