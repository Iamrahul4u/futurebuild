import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { CheckIcon, XIcon } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

const TestCases = () => {
  return (
    <ScrollArea className="h-full w-full">
      <CardHeader>
        <CardTitle>Test Cases</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="case1">
          <TabsList>
            <TabsTrigger value="case1">Case 1</TabsTrigger>
            <TabsTrigger value="case2">Case 2</TabsTrigger>
            <TabsTrigger value="case3">Case 3</TabsTrigger>
          </TabsList>
          <TabsContent value="case1">
            <div className="space-y-2">
              <div>
                <span className="font-semibold">Input:</span> nums =
                [2,7,11,15], target = 9
              </div>
              <div>
                <span className="font-semibold">Expected Output:</span> [0,1]
              </div>
              <div className="flex items-center">
                <span className="mr-2 font-semibold">Status:</span>
                <CheckIcon className="h-5 w-5 text-green-500" />
                <span className="ml-1 text-green-500">Passed</span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="case2">
            <div className="space-y-2">
              <div>
                <span className="font-semibold">Input:</span> nums = [3,2,4],
                target = 6
              </div>
              <div>
                <span className="font-semibold">Expected Output:</span> [1,2]
              </div>
              <div className="flex items-center">
                <span className="mr-2 font-semibold">Status:</span>
                <XIcon className="h-5 w-5 text-red-500" />
                <span className="ml-1 text-red-500">Failed</span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="case3">
            <div className="space-y-2">
              <div>
                <span className="font-semibold">Input:</span> nums = [3,3],
                target = 6
              </div>
              <div>
                <span className="font-semibold">Expected Output:</span> [0,1]
              </div>
              <div className="flex items-center">
                <span className="mr-2 font-semibold">Status:</span>
                <CheckIcon className="h-5 w-5 text-green-500" />
                <span className="ml-1 text-green-500">Passed</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <Card>
        <CardHeader>
          <CardTitle>Output</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="rounded-md bg-muted p-4">
            <code>
              Runtime: 58 ms{"\n"}
              Memory Usage: 15.2 MB
            </code>
          </pre>
        </CardContent>
      </Card>
    </ScrollArea>
  );
};

export default TestCases;
