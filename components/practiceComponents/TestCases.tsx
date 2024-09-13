import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { CheckIcon, XIcon } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { questionsData } from "@/_constants/constants";

const TestCases = ({
  testcases,
}: {
  testcases: (typeof questionsData)[keyof typeof questionsData]["testCases"];
}) => {
  return (
    <ScrollArea className="h-fit w-full">
      <CardHeader>
        <CardTitle>Test Cases</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="case1">
          <TabsList>
            {testcases.map((testcase: any, index: any) => (
              <TabsTrigger value={index} key={index}>
                Case {index + 1}
              </TabsTrigger>
            ))}
          </TabsList>
          {testcases.map((testcase: any, index: any) => (
            <TabsContent value={index || 0} key={index || 0} defaultValue={0}>
              <div className="space-y-2">
                <div>
                  <span className="font-semibold">Input:</span> {testcase.input}
                </div>
                <div>
                  <span className="font-semibold">Expected Output:</span>{" "}
                  {testcase.expected}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </ScrollArea>
  );
};

export default TestCases;
