// Description: Tests for flatMap function.
import { expect, describe, test } from 'vitest';
import { flatMap } from '../src/flatMap.js';

describe(
    'Tests for flatMap function',
    () => {
        test(
            'if type of collection is not an Array, Map or Set throws an error',
            () => {
                expect(() => flatMap(() => {}, 1)).toThrowError(
                    'number is not an Array, Map, or Set'
                );
            }
        );

        test(
            'if type of mapping function is not a function throws an error',
            () => {
                expect(() => flatMap([], [])).toThrowError('object is not a Function');
            }
        );

        test(
            'if supplied an empty collection returns an empty array',
            () => {
                const fn = (x) => [x];
                const collections = [[], new Map(), new Set()];

                for (const collection of collections) {
                    expect(flatMap(fn, collection)).toEqual([]);
                }
            }
        );

        test(
            'if supplied a collection with one element returns the expected result of the mapping function',
            () => {
                const fn = (x) => [x];
                const collections = [[1], new Map([[0, 1]]), new Set([1])];

                for (const collection of collections) {
                    expect(flatMap(fn, collection)).toEqual([1]);
                }
            }
        );

        test(
            'if supplied a collection with multiple elements returns the expected result of the mapping function',
            () => {
                const swap = (value, key) => [[value, key]];
                const collections = [
                    [[1, 2, 3], [[1, 0], [2, 1], [3, 2]]],
                    [new Map([[0, 1], [1, 2], [2, 3]]), [[1, 0], [2, 1], [3, 2]]],
                    [new Set([1, 2, 3]), [[1, 1], [2, 2], [3, 3]]]
                ];

                for (const [collection, expected] of collections) {
                    expect(flatMap(swap, collection)).toEqual(expected);
                }
            }
        );

        test(
            'flattens the result of the mapping function',
            () => {
                const double = (x) => [x, x];
                const collections = [[1, 2, 3], new Map([[0, 1], [1, 2], [2, 3]]), new Set([1, 2, 3])];

                for (const collection of collections) {
                    expect(flatMap(double, collection)).toEqual([1, 1, 2, 2, 3, 3]);
                }
            }
        );
    }
);
