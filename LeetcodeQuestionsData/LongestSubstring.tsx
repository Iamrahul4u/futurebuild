export const longestSubstringTestCases = `[
  { input: ["abcabcbb"], expected: 3 },
  { input: ["bbbbb"], expected: 1 },
  { input: ["pwwkew"], expected: 3 },
  { input: [""], expected: 0 }
]`;
export const longestSubstringResults = `testCases.map(testCase => {
    let result = lengthOfLongestSubstring(testCase.input[0]); 
    return {
      input: testCase.input,
      expected: testCase.expected,
      output: result,
      passed: result === testCase.expected,
    };
  })`;
export const longestSubstringTemplateCode = {
  python: `
def length_of_longest_substring(s):
    # Write your code here
    pass

# Example usage:
# print(length_of_longest_substring("abcabcbb"))
  `,
  java: `
public class Solution {
    public static int lengthOfLongestSubstring(String s) {
        // Write your code here
    }

    public static void main(String[] args) {
        // Example usage:
        // int result = lengthOfLongestSubstring("abcabcbb");
    }
}
  `,
  cpp: `
#include <iostream>
#include <unordered_map>
using namespace std;

int lengthOfLongestSubstring(string s) {
    // Write your code here
}

int main() {
    // Example usage:
    // int result = lengthOfLongestSubstring("abcabcbb");
    return 0;
}
  `,
  javascript: `
function lengthOfLongestSubstring(s) {
  // Write your code here
}

// Example usage:
const result = lengthOfLongestSubstring("abcabcbb");
  `,
};
