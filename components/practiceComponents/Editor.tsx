"use client";
import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import Editor from "@monaco-editor/react";
import { CardHeader } from "../ui/card";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { CheckIcon, PlayIcon, XIcon } from "lucide-react";
import {
  languageFileNames,
  Languages,
  questionsData,
  TemplateCode,
} from "@/_constants/constants";
import sendCode from "@/app/actions/piston.action";
import {
  results,
  testCases,
} from "@/app/(root)/practice/question/[questionId]/demodata";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import TestCases from "./TestCases";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

export default function EditorComponent({
  question,
}: {
  question: (typeof questionsData)[keyof typeof questionsData];
}) {
  const { width, height } = useWindowSize();
  const [language, setLanguage] = useState(Languages[0].value);
  const [code, setCode] = useState(
    question.templateCode[language as keyof typeof question.templateCode],
  );
  const ref = useRef<any>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState("");
  const [error, setError] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  function handleTabChange(value: string) {
    if (value !== language) {
      setLanguage(value);
      setCode(
        question.templateCode[value as keyof typeof question.templateCode],
      );
    }
  }
  function handleMount(editor: any, monaco: any) {
    ref.current = editor;
    if (ref.current) {
      ref.current.focus();
    }
  }
  async function handleRun() {
    setIsRunning(true);
    const combinedCodeTemplate = `
   const testCases = ${JSON.stringify(question.testCases)};
   ${code}  \n
   const startTime = Date.now();\n
   const results = ${question.results}\n 
   const endTime = Date.now();
   const totalTime=endTime-startTime;
   console.log(results); 
   `;
    const data = await sendCode(
      combinedCodeTemplate,
      language,
      Languages.find((l) => l.value === language)?.version ?? "3.10.0",
      languageFileNames[language as keyof typeof languageFileNames],
    );
    if (data.run.stderr) {
      setError(true);
      setOutput(data.run.stderr);
    } else {
      setError(false);

      try {
        let outputString = data.run.output;

        outputString = outputString
          .replace(/^\s+|\s+$/g, "")
          .replace(/\\n/g, "")
          .replace(/\\t/g, "")
          .replace(/\\"/g, '"')
          .replace(/'/g, '"')
          .replace(/(\w+):/g, '"$1":');

        const parsedOutput = JSON.parse(outputString);
        const results = parsedOutput.map((result: any) => {
          if (result.passed === false) {
            setError(true);
            setOutput(
              `Input: ${result.input}, Expected: ${result.expected}, Output: ${result.output}`,
            );
            return;
          }
        });
        if (!error) {
          setOutput(results.length + " test cases passed.");
          setShowConfetti(true);
          setError(false);
        }
      } catch (error) {
        console.error("Parsing error:", error);
        setError(true);
      }
    }
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
    setIsRunning(false);
  }
  return (
    <ResizablePanelGroup direction="vertical">
      {showConfetti && <Confetti width={width} gravity={0.2} height={height} />}
      <ResizablePanel defaultSize={60}>
        <CardHeader className="p-2">
          <div className="flex items-center justify-between">
            <Tabs
              value={language}
              onValueChange={handleTabChange}
              className="w-[400px]"
            >
              <TabsList>
                {Languages.map((language) => (
                  <TabsTrigger value={language.value} key={language.value}>
                    {language.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <Button onClick={handleRun} disabled={isRunning}>
              <PlayIcon className="mr-2 h-4 w-4" />
              {isRunning ? "Running..." : "Run"}
            </Button>
          </div>
        </CardHeader>
        <Editor
          height="50vh"
          defaultLanguage={language}
          value={code}
          theme="vs-dark"
          onMount={handleMount}
          onChange={(value) => {
            setCode(value ?? "");
          }}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={30} minSize={20}>
        <div className="h-full overflow-y-scroll">
          <TestCases testcases={question.testCases} />
          {error && output && (
            <div className="flex flex-col gap-2 bg-red-500 p-4 text-white">
              <div className="flex items-center justify-between">
                <p>Error</p>
                <XIcon className="h-4 w-4" />
              </div>
              <p>{output}</p>
            </div>
          )}
          {!error && output && (
            <div className="flex flex-col gap-2 bg-green-500 p-4 text-white">
              <div className="flex items-center justify-between">
                <p>Output</p>
                <CheckIcon className="h-4 w-4" />
              </div>
              <p className="whitespace-pre-wrap">{output}</p>
            </div>
          )}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
