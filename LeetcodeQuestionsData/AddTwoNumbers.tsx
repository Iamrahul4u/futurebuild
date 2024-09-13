export const addTwoNumbersTestCases = `[
  { input: [[2, 4, 3], [5, 6, 4]], expected: [7, 0, 8] },
  { input: [[0], [0]], expected: [0] },
  { input: [[9, 9, 9, 9, 9, 9, 9], [9, 9, 9, 9]], expected: [8, 9, 9, 9, 0, 0, 0, 1] },
  { input: [[1], [9, 9]], expected: [0, 0, 1] }
]`;
export const addTwoNumbersResults = `testCases.map(testCase => {
    let result = addTwoNumbers(...testCase.input); 
    return {
      input: testCase.input,
      expected: testCase.expected,
      output: result,
      passed: JSON.stringify(result) === JSON.stringify(testCase.expected),
    };
  })`;
export const addTwoNumbersTemplateCode = {
  python: `
def add_two_numbers(l1, l2):
    # Write your code here
    pass

# Example usage:
# print(add_two_numbers([2, 4, 3], [5, 6, 4]))
  `,
  java: `
public class Solution {
    public static ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        // Write your code here
    }

    public static void main(String[] args) {
        // Example usage:
        // ListNode result = addTwoNumbers(new ListNode(2, 4, 3), new ListNode(5, 6, 4));
    }
}
  `,
  cpp: `
#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(NULL) {}
};

ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
    // Write your code here
}

int main() {
    // Example usage:
    // ListNode* l1 = new ListNode(2);
    // ListNode* l2 = new ListNode(5);
    // ListNode* result = addTwoNumbers(l1, l2);
    return 0;
}
  `,
  javascript: `
function addTwoNumbers(l1, l2) {
  // Write your code here
}

// Example usage:
const result = addTwoNumbers([2, 4, 3], [5, 6, 4]);
  `,
};
