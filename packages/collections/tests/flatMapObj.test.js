// Description: Tests for flatMap function.
import { expect, describe, test } from 'vitest';
import { flatMapObj } from '../src/flatMap.js';

describe(
    'Tests for flatMapObj function',
    () => {
        test(
            'if type of collection is not an Object throws an error',
            () => {
                expect(() => flatMapObj(() => {}, 1)).toThrowError('number is not an Object');
            }
        );

        test(
            'if type of mapping function is not a function throws an error',
            () => {
                expect(() => flatMapObj([], [])).toThrowError('object is not a Function');
            }
        );

        test(
            'if supplied an empty Object returns an empty array',
            () => {
                const fn = (x) => [x];
                expect(flatMapObj(fn, {})).toEqual([]);
            }
        );

        test(
            'if supplied a collection with one element returns the expected result of the mapping function',
            () => {
                const fn = (value, key) => [key, value];
                expect(flatMapObj(fn, {a: 1})).toEqual(['a', 1]);
            }
        );

        test(
            'if supplied an object with multiple elements returns the expected result of the mapping function',
            () => {
                const swap = (value, key) => [[value, key]];
                const obj = {a: 1, b: 2, c: 3};

                expect(flatMapObj(swap, obj)).toEqual([[1, 'a'], [2, 'b'], [3, 'c']]);
            }
        );
        test(
            'flattens the result of the mapping function',
            () => {
                const double = (_, key) => [key, key];
                const obj = {a: 1, b: 2, c: 3};

                expect(flatMapObj(double, obj)).toEqual(['a', 'a', 'b', 'b', 'c', 'c']);
            }
        );
    }
);
