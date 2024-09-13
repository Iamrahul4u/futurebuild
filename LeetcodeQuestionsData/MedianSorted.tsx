export const medianOfTwoSortedArraysTestCases = `[
  { input: [[1, 3], [2]], expected: 2.0 },
  { input: [[1, 2], [3, 4]], expected: 2.5 },
  { input: [[0, 0], [0, 0]], expected: 0.0 },
  { input: [[1], [2, 3]], expected: 2.0 }
]`;
export const medianOfTwoSortedArraysResults = `testCases.map(testCase => {
    let result = findMedianSortedArrays(...testCase.input); 
    return {
      input: testCase.input,
      expected: testCase.expected,
      output: result,
      passed: result === testCase.expected,
    };
  })`;
export const medianOfTwoSortedArraysTemplateCode = {
  python: `
def find_median_sorted_arrays(nums1, nums2):
    # Write your code here
    pass

# Example usage:
# print(find_median_sorted_arrays([1, 3], [2]))
  `,
  java: `
public class Solution {
    public static double findMedianSortedArrays(int[] nums1, int[] nums2) {
        // Write your code here
    }

    public static void main(String[] args) {
        // Example usage:
        // double result = findMedianSortedArrays(new int[]{1, 3}, new int[]{2});
    }
}
  `,
  cpp: `
#include <iostream>
#include <vector>
using namespace std;

double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
    // Write your code here
}

int main() {
    // Example usage:
    // vector<int> nums1 = {1, 3};
    // vector<int> nums2 = {2};
    // double result = findMedianSortedArrays(nums1, nums2);
    return 0;
}
  `,
  javascript: `
function findMedianSortedArrays(nums1, nums2) {
  // Write your code here
}

// Example usage:
const result = findMedianSortedArrays([1, 3], [2]);
  `,
};
