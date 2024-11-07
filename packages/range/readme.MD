# Range

A Javascript implementation of Python's range function as an ESM import.

### Installation

**Console:**

```bash
npm install @russgooday/range
```

#### ESM Importing
```javascript
import { Range } from '@russgooday/range';
```

### Usage

Range is a class that can be used to generate a range of numbers returning an iterable instance. It can be used in the following ways:

#### Examples

**Creating a Range with a Single Argument**
```javascript
const range = new Range(10);
console.log(...range);
// Output: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
```

**Creating a Range with Two Arguments**
```javascript
const range = new Range(5, 15);
console.log(...range);
// Output: 5, 6, 7, 8, 9, 10, 11, 12, 13, 14
```

**Creating a Range with Three Arguments**
```javascript
const range = new Range(10, 20, 2);
console.log(...range);
// Output: 10, 12, 14, 16, 18
```

**Using Negative Step**
```javascript
const range = new Range(20, 10, -2);
console.log(...range);
// Output: 20, 18, 16, 14, 12
```

**Accessing a Specific Index**
```javascript
const range = new Range(0, 10); // 0,1,2,3,4,5,6,7,8,9

console.log(range.index(3)); // Output: 3
console.log(range.index(-1)); // Output: 9
```

**Slicing a Range (Returns a new Range)**
```javascript
const range = new Range(0, 20, 2); // 0,2,4,6,8,10,12,14,16,18
const slicedRange = range.slice(2, 5);
console.log(slicedRange);
// Range { start: 4, stop: 10, step: 2 }
console.log('(0, 20, 2)[2:5]', ...slicedRange);
// Output: 4, 6, 8
```

**Reverse with Slice (nulls used for placeholders)**
```javascript
const range = new Range(0, 10, 2); // 0,2,4,6,8
const reversedRange = range.slice(null,null,-1); // equivalent to range[::-1]
console.log(...reversedRange);
// Output: 8 6 4 2 0
```

**Error Handling**
```javascript
try {
    // invalidRange - No arguments provided
    new Range();
} catch (error) {
    console.log(error.message); // Output: Range expected at least 1 argument, got 0
}

try {
    // invalidStepRange - Step value is zero
    new Range(0, 10, 0);
} catch (error) {
    console.log(error.message); // Output: step must not be zero
}

try {
    const rangeWithInvalidIndex = new Range(0, 5);
    console.log(rangeWithInvalidIndex.index(10));
} catch (error) {
    console.log(error.message); // Output: index 10 out of range
}
```

### Running the tests

**Console:**

Needs to have vite and vitest installed
```bash
npm install vite
npm install -D vitest
```

Run the following command to run the tests:
```bash
npm run test
```