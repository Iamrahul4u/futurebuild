"use client";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import Editor from "@monaco-editor/react";
import { CardHeader } from "../ui/card";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { PlayIcon } from "lucide-react";
import { Languages, TemplateCode } from "@/_constants/constants";

export default function EditorComponent() {
  const [language, setLanguage] = useState(Languages[0].value);
  const [code, setCode] = useState(
    TemplateCode[language as keyof typeof TemplateCode],
  );
  function handleTabChange(value: string) {
    if (value !== language) {
      setLanguage(value);
      setCode(TemplateCode[value as keyof typeof TemplateCode]);
    }
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
          <Button>
            <PlayIcon
              className="mr-2 h-4 w-4"
              onClick={() => {
                console.log(code);
              }}
            />{" "}
            Run
          </Button>
        </div>
      </CardHeader>
      <Editor
        height="60vh"
        defaultLanguage={language}
        value={code}
        theme="vs-dark"
        onChange={(value) => {
          setCode(value ?? "");
        }}
      />
    </>
  );
}
