export const twoSumTestCases = `[
  { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
  { input: [[-1, -2, -3, -4, -5], -8], expected: [2, 4] },
  { input: [[0, 4, 3, 0], 0], expected: [0, 3] },
  { input: [[3, 3], 6], expected: [0, 1] },
  { input: [[1000000000, 2000000000, 3000000000], 3000000000], expected: [0, 1] }
]`;
export const twoSumResults = `testCases.map(testCase => {
    let result = twoSum(...testCase.input); 
    return {
      input: testCase.input,
      expected: testCase.expected,
      output: result,
      passed: JSON.stringify(result) === JSON.stringify(testCase.expected),
    };
  })`;
export const twoSumTemplateCode = {
  python: `
def two_sum(nums, target):
    # Write your code here
    pass

# Example usage:
# print(two_sum([2, 7, 11, 15], 9))
  `,
  java: `
public class Solution {
    public static int[] twoSum(int[] nums, int target) {
        // Write your code here
    }

    public static void main(String[] args) {
        // Example usage:
        // int[] result = twoSum(new int[]{2, 7, 11, 15}, 9);
    }
}
  `,
  cpp: `
#include <iostream>
#include <vector>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    // Write your code here
}

int main() {
    // Example usage:
    // vector<int> nums = {2, 7, 11, 15};
    // int target = 9;
    // vector<int> result = twoSum(nums, target);
    return 0;
}
  `,
  javascript: `
function twoSum(nums, target) {
  // Write your code here
}

// Example usage:
const result = twoSum([2, 7, 11, 15], 9);
  `,
};
