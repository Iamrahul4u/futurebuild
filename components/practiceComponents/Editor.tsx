"use client";
import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import Editor from "@monaco-editor/react";
import { CardHeader } from "../ui/card";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { PlayIcon } from "lucide-react";
import {
  languageFileNames,
  Languages,
  TemplateCode,
} from "@/_constants/constants";
import sendCode from "@/app/actions/piston.action";
import {
  results,
  testCases,
} from "@/app/(root)/practice/question/[...questionId]/demodata";

export default function EditorComponent() {
  const [language, setLanguage] = useState(Languages[0].value);
  const [code, setCode] = useState(
    TemplateCode[language as keyof typeof TemplateCode],
  );
  const ref = useRef<any>(null);
  const [isRunning, setIsRunning] = useState(false);
  function handleTabChange(value: string) {
    if (value !== language) {
      setLanguage(value);
      setCode(TemplateCode[value as keyof typeof TemplateCode]);
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
   const testCases = ${testCases} \n
   ${code}  \n
   const startTime = Date.now();\n
   const results = ${results}\n 
   const endTime = Date.now();
   const totalTime=endTime-startTime;
   console.log("Total Execution Time:", totalTime, "ms");
   console.log(results)`;

    console.log(combinedCodeTemplate);
    const data = await sendCode(
      combinedCodeTemplate,
      language,
      Languages.find((l) => l.value === language)?.version ?? "3.10.0",
      languageFileNames[language as keyof typeof languageFileNames],
    );
    setIsRunning(false);
  }
  return (
    <>
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
          <Button onClick={handleRun}>
            <PlayIcon className="mr-2 h-4 w-4" />
            {isRunning ? "Running..." : "Run"}
          </Button>
        </div>
      </CardHeader>
      <Editor
        height="60vh"
        defaultLanguage={language}
        value={code}
        theme="vs-dark"
        onMount={handleMount}
        onChange={(value) => {
          setCode(value ?? "");
        }}
      />
    </>
  );
}
