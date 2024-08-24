import React from "react";
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { Card } from "@radix-ui/themes";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

const QuestionInformation = () => {
  return (
    <div className="w-full">
      <ScrollArea className="h-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">1. Two Sum</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Problem Description</h3>
                <p className="text-muted-foreground">
                  Given an array of integers nums and an integer target, return
                  indices of the two numbers such that they add up to target.
                  You may assume that each input would have exactly one
                  solution, and you may not use the same element twice. You can
                  return the answer in any order.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Example 1:</h3>
                <pre className="rounded-md bg-muted p-2">
                  <code className="overflow-x-scroll whitespace-pre-wrap text-wrap">
                    Input: nums = [2,7,11,15], target = 9{"\n"}
                    Output: [0,1]{"\n"}
                    Explanation: Because nums[0] + nums[1] == 9, we return [0,
                    1].
                  </code>
                </pre>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Constraints:</h3>
                <ul className="list-inside list-disc text-muted-foreground">
                  <li>2 ≤ nums.length ≤ 10^4</li>
                  <li>-10^9 ≤ nums[i] ≤ 10^9</li>
                  <li>-10^9 ≤ target ≤ 10^9</li>
                  <li>Only one valid answer exists.</li>
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
