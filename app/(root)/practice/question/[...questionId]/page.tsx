import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlayIcon, CheckIcon, XIcon } from "lucide-react";
import QuestionInformation from "@/components/practiceComponents/QuestionInformation";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import EditorComponent from "@/components/practiceComponents/Editor";
import { Languages } from "@/_constants/constants";
import TestCases from "@/components/practiceComponents/TestCases";

export default function LeetCodeQuestionView() {
  return (
    <ResizablePanelGroup direction="horizontal" className="w-full">
      <ResizablePanel defaultSize={50}>
        <QuestionInformation />
      </ResizablePanel>
      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={60}>
            <EditorComponent />
          </ResizablePanel>
          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={40}>
            <TestCases />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
