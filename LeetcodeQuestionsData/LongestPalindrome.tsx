export const longestPalindromicSubstringTestCases = `[
  { input: ["babad"], expected: "bab" },
  { input: ["cbbd"], expected: "bb" },
  { input: ["a"], expected: "a" },
  { input: ["ac"], expected: "a" }
]`;
export const longestPalindromicSubstringResults = `testCases.map(testCase => {
    let result = longestPalindrome(testCase.input[0]); 
    return {
      input: testCase.input,
      expected: testCase.expected,
      output: result,
      passed: result === testCase.expected,
    };
  })`;
export const longestPalindromicSubstringTemplateCode = {
  python: `
def longest_palindrome(s):
    # Write your code here
    pass

# Example usage:
# print(longest_palindrome("babad"))
  `,
  java: `
public class Solution {
    public static String longestPalindrome(String s) {
        // Write your code here
    }

    public static void main(String[] args) {
        // Example usage:
        // String result = longestPalindrome("babad");
    }
}
  `,
  cpp: `
#include <iostream>
#include <string>
using namespace std;

string longestPalindrome(string s) {
    // Write your code here
}

int main() {
    // Example usage:
    // string result = longestPalindrome("babad");
    return 0;
}
  `,
  javascript: `
function longestPalindrome(s) {
  // Write your code here
}

// Example usage:
const result = longestPalindrome("babad");
  `,
};
