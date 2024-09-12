"use server";
import {
  CoverLetterSchema,
  ResumeProfileSectionSchema,
  RoadMapSchema,
} from "@/types/zodValidations";
import { OpenAI } from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { getUserCredits, reduceUserAIpoints } from "./user.action";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateResume(resume: string) {
  const getCredits = await reduceUserAIpoints();
  if (getCredits.error) {
    return { error: getCredits.error };
  }
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini-2024-07-18",
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
  const getCredits = await reduceUserAIpoints();
  if (getCredits.error) {
    return { error: getCredits.error };
  }
  const content = { jobDescription: coverLetter, userInfo: userInfo };
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini-2024-07-18",

    messages: [
      {
        role: "system",
        content:
          "You are an expert at generating Cover Letter Data Based on Job's Description and User's short information paragraph  about themselves.In 200 Words",
      },
      { role: "user", content: JSON.stringify(content) },
    ],
    response_format: zodResponseFormat(CoverLetterSchema, "Cover_Letter"),
  });
  return response.choices[0].message.content;
}

export async function generateRoadmaps({
  prompt,
  error = false,
}: {
  prompt: string;
  error?: boolean;
}) {
  if (!error) {
    const getCredits = await reduceUserAIpoints();
    if (getCredits.error) {
      return { error: getCredits.error };
    }
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini-2024-07-18",
    messages: [
      {
        role: "system",
        content: `You are a Professional Mermaid diagram generator. When given a user prompt, generate a valid Mermaid diagram for a roadmap flowchart  that follows these strict guidelines:
1. **Main Title**: Include a main title node at the top of the diagram.
2. **Subtopics**: Each main topic should be connected horizontally to its subtopics. Ensure the flow is from top to bottom.
Align the topics in order and sequentially from top to bottom to main tha flow and understandability.
Make Large Diagrams easily take full height and width of the screen.
3. **Optional Subtopics**: Use dashed arrows \(\`-.->\`\) to represent optional subtopics. Clearly label optional subtopics  without parentheses or special characters.
5. **No Special Characters**: Avoid using special characters like \`\[\]\`, \`\(\)\`, or \`\<\>\` within labels. Use plain text only.
7. **Validation**: Ensure that labels and structure adhere to Mermaid syntax to prevent errors.
`,
      },
      { role: "user", content: prompt },
    ],
    response_format: zodResponseFormat(RoadMapSchema, "Roadmap"),
  });

  return response.choices[0].message.content;
}
