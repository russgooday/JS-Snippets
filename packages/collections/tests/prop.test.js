// Description: Tests for prop function.
import { expect, describe, test } from 'vitest';
import { prop } from '../src/prop.js';

describe(
    'Tests for prop function',
    () => {
        test(
            'if no key arguments are supplied throws an error',
            () => {
                expect(() => prop()).toThrowError(
                    'Expected at least one argument'
                );
            }
        );

        test(
            'if an empty object or array is supplied to the returned function, it returns undefined',
            () => {
                expect(prop('x')([])).toBeUndefined();
                expect(prop('x', 'y')([])).toEqual([undefined, undefined]);
                expect(prop('x')({})).toBeUndefined();
            }
        );

        test(
            'if a single key is supplied, the value of that key is returned',
            () => {
                const obj = { a: 1, b: 2, c: 3 };
                const arr = [1, 2, 3];
                const paramsExpected = [
                    ['a', obj, 1],
                    ['b', obj, 2],
                    ['c', obj, 3],
                    [0, arr, 1],
                    [1, arr, 2],
                    [2, arr, 3]
                ];

                for (const [key, obj, expected] of paramsExpected) {
                    expect(prop(key)(obj)).toBe(expected);
                }
            }
        );

        test(
            'if multiple keys are supplied, an array of values is returned',
            () => {
                const obj = { a: 1, b: 2, c: 3 };
                const arr = [1, 2, 3];
                const paramsExpected = [
                    [['a', 'b'], obj, [1, 2]],
                    [['b', 'c'], obj, [2, 3]],
                    [['a', 'b', 'c'], obj, [1, 2, 3]],
                    [[0, 1], arr, [1, 2]],
                    [[1, 2], arr, [2, 3]],
                    [[0, 1, 2], arr, [1, 2, 3]]
                ];

                for (const [keys, obj, expected] of paramsExpected) {
                    expect(prop(...keys)(obj)).toEqual(expected);
                }
            }
        );
    }
);