const { Range } = require('../src/range.js')

describe(
  'Tests for Range class',
  () => {
    test(
      'new Range returns an iterable object',
      () => {
        const result = []
        for (const value of new Range(5)) {
          result.push(value)
        }
        expect(result).toEqual([0,1,2,3,4])
      }
    )

    test(
      'with single argument returns a range from zero up to that number',
      () => {
        expect([...new Range(5)]).toEqual([0,1,2,3,4])
      }
    )

    test(
      'with two arguments returns a range from the first number up to the second number',
      () => {
        expect([...new Range(5, 10)]).toEqual([5,6,7,8,9])
      }
    )

    test(
      'with three arguments returns a range from the first number up to the second number with the specified step',
      () => {
        expect([...new Range(5, 15, 3)]).toEqual([5,8,11,14])
      }
    )

    test(
      'with a negative step returns a range from the first number down to the second number',
      () => {
        expect([...new Range(10, 5, -2)]).toEqual([10,8,6])
      }
    )

    test(
      'the returned range object can iterated over multiple times',
      () => {
        const range = new Range(5, 10)
        expect([...range]).toEqual([5,6,7,8,9])
        expect([...range]).toEqual([5,6,7,8,9])
      }
    )

    test(
      'index method returns the value at the specified index',
      () => {
        const range = new Range(0, 10)
        expect(range.index(3)).toBe(3)
        expect(range.index(-1)).toBe(9)
      }
    )
  }
)

describe(
  'Tests for Range class slicing',
  () => {
    test(
      'slice method returns a new Range object with the specified start and stop values and a default step of 1',
      () => {
        const range = new Range(0, 20, 2)
        const slicedRange = range.slice(2, 5)
        expect([...slicedRange]).toEqual([4,6,8])
      }
    )

    test(
      'with a null placeholder for start, the slice method returns a range from the beginning of the original range',
      () => {
        const range01 = new Range(0,10,1)
        const range02 = new Range(10,0,-1)

        const slicedRange01 = range01.slice(null, 5)
        const slicedRange02 = range02.slice(null, 5)

        expect([...slicedRange01]).toEqual([0,1,2,3,4])
        expect([...slicedRange02]).toEqual([10,9,8,7,6])
      }
    )

    test(
      'with a null placeholder for stop, the slice method returns a range up to the end of the original range',
      () => {
        const range01 = new Range(0,10,1)
        const range02 = new Range(10,0,-1)

        const slicedRange01 = range01.slice(5, null)
        const slicedRange02 = range02.slice(5, null)

        expect([...slicedRange01]).toEqual([5,6,7,8,9])
        expect([...slicedRange02]).toEqual([5,4,3,2,1])
      }
    )

    test('with null placeholders for start and stop, and a negative step, the slice method returns a range in reverse order', () => {
      const range = new Range(0, 10, 2)
      const reversedRange = range.slice(null, null, -1)
      expect([...reversedRange]).toEqual([8,6,4,2,0])
    })
  }
)

describe(
  'Tests for Range class error handling',
  () => {
    test(
      'throws an error if no arguments are provided',
      () => {
        expect(() => new Range()).toThrow(RangeError('Range expected at least 1 argument, got 0'))
      }
    )

    test(
      'throws an error if any of the arguments are not integers',
      () => {
        expect(() => new Range(5.5)).toThrow(TypeError('range indices must all be integers'))
      }
    )

    test(
      'throws an error if the step value is zero',
      () => {
        expect(() => new Range(0, 10, 0)).toThrow(RangeError('step must not be zero'))
      }
    )

    test(
      'throws an error if the index is out of range',
      () => {
        const range = new Range(0, 5)
        expect(() => range.index(10)).toThrow(RangeError('index 10 out of range'))
        expect(() => range.index(-6)).toThrow(RangeError('index -6 out of range'))
      }
    )
  }
)