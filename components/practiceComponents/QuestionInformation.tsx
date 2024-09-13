import React from "react";
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { Card } from "@radix-ui/themes";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { questionsData } from "@/_constants/constants";

const QuestionInformation = ({
  question,
}: {
  question: (typeof questionsData)[keyof typeof questionsData];
}) => {
  return (
    <div className="w-full">
      <ScrollArea className="h-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{question.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Problem Description</h3>
                <p className="text-muted-foreground">{question.description}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Example 1:</h3>
                <pre className="rounded-md bg-muted p-2">
                  <code className="overflow-x-scroll whitespace-pre-wrap text-wrap">
                    {question.example}
                  </code>
                </pre>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Constraints:</h3>
                <ul className="list-inside list-disc text-muted-foreground">
                  {question.constraints.map((constraint, index) => (
                    <li key={index}>{constraint}</li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </ScrollArea>
    </div>
  );
};

export default QuestionInformation;
