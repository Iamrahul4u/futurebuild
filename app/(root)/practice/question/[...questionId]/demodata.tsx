export const testCases = ` [
  { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
  { input: [[-1, -2, -3, -4, -5], -8], expected: [2, 4] },
  { input: [[0, 4, 3, 0], 0], expected: [0, 3] },
  { input: [[3, 3], 6], expected: [0, 1] },
  {
    input: [[1000000000, 2000000000, 3000000000], 3000000000],
    expected: [0, 1],
  },
]`;

export const results = ` testCases.map(testCase => {
    let result = twoSum(...testCase.input); 
    return {
      input: testCase.input,
      expected: testCase.expected,
      output: result,
      passed: JSON.stringify(result) === JSON.stringify(testCase.expected),
    };
  });

`;
