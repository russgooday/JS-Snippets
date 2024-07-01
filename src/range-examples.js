import Range from './range.js';

// Examples

// Example 1: Creating a Range with a Single Argument
const range1 = new Range(10);
console.log('(10)', ...range1);
// Output: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9

// Example 2: Creating a Range with Two Arguments
const range2 = new Range(5, 15);
console.log('(5, 15)', ...range2);
// Output: 5, 6, 7, 8, 9, 10, 11, 12, 13, 14

// Example 3: Creating a Range with Three Arguments
const range3 = new Range(10, 20, 2);
console.log('(10, 20, 2)', ...range3);
// Output: 10, 12, 14, 16, 18

// Example 4: Using Negative Step
const range4 = new Range(20, 10, -2);
console.log('(10, 20, -2)', ...range4);
// Output: 20, 18, 16, 14, 12

// Example 5: Accessing a Specific Index
const range5 = new Range(0, 10); // 0,1,2,3,4,5,6,7,8,9

console.log('(0, 10)[3]', range5.index(3)); // Output: 3
console.log('(0, 10)[-1]', range5.index(-1)); // Output: 9

// Example 6: Slicing a Range
const range6 = new Range(0, 20, 2);
const slicedRange = range6.slice(2, 5);

console.log('(0, 20, 2)[2:5]', ...slicedRange)
// Output: 4, 6, 8

// Example 7: Reverse with Slice
const range7 = new Range(0, 10, 2); // 0,2,4,6,8
const reversedRange = range7.slice(__,__,-1);

console.log('(0, 10, 2)[::-1]', ...reversedRange);
// Output: 8 6 4 2 0

// Example 8: Error Handling
try {
  const invalidRange = new Range();
} catch (error) {
  console.log(error.message); // Output: Range expected at least 1 argument, got 0
}

try {
  const invalidStepRange = new Range(0, 10, 0);
} catch (error) {
  console.log(error.message); // Output: step must not be zero
}

try {
  const rangeWithInvalidIndex = new Range(0, 5);
  console.log(rangeWithInvalidIndex.index(10));
} catch (error) {
  console.log(error.message); // Output: index 10 out of range
}