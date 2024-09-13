import React from "react";
import QuestionInformation from "@/components/practiceComponents/QuestionInformation";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import EditorComponent from "@/components/practiceComponents/Editor";
import { questionsData } from "@/_constants/constants";

export default function LeetCodeQuestionView({
  params,
}: {
  params: { questionId: string };
}) {
  // @ts-ignore
  const question = questionsData[params.questionId];
  return (
    <ResizablePanelGroup direction="horizontal" className="w-full">
      <ResizablePanel defaultSize={50}>
        <QuestionInformation question={question} />
      </ResizablePanel>
      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={50}>
        <EditorComponent question={question} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
