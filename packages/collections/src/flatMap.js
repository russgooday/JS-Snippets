import { isTypeOf } from './types.js';

/** @module collections */
/**
 * flatMap - A function that applies a given mapping function to each element of a collection,
 * then flattens the result into a new array. Unlike the native `Array.prototype.flatMap` method,
 * this function works with arrays, maps, and sets.
 * @function
 * @template Val, Key, MappedValue
 * @param { (value: Val, key: Key) => MappedValue } mappingFn A function to be applied to each element.
 * @param { Array<Val> | Map<Key, Val> | Set<Val> } collection The collection with entries to iterate over.
 * @returns { Array<MappedValue> } A flattened array of mapped results.
 * @example
 * const swap = (val, key) => [val, key];
 * const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
 * flatMap(swap, map); // returns [1, 'a', 2, 'b', 3, 'c']
 */
function flatMap (mappingFn, collection) {
    if (!isTypeOf(mappingFn, 'function')) {
        throw new TypeError(`${typeof(collection)} is not a Function`);
    }

    if (!isTypeOf(collection.entries, 'function')) {
        throw new TypeError(`${typeof(collection)} is not an Array, Map, or Set`);
    }

    let flattend = [];

    for (const [key, value] of collection.entries()) {
        flattend = flattend.concat(mappingFn(value, key));
    }
    return flattend;
};

/**
 * flatMapObj - A function that applies a given mapping function to each element of an object,
 * then flattens the result into a new array.
 * @function
 * @template MappedValue
 * @param { (value: any, key: string|number) => MappedValue } mappingFn A function to be applied to each element.
 * @param { object } obj The object to iterate over.
 * @returns { Array<MappedValue> } A flattened array of mapped results.
 * @example
 * const swap = (val, key) => [val, key];
 * const obj = { a: 1, b: 2, c: 3 };
 * flatMap(swap, obj); // returns [1, 'a', 2, 'b', 3, 'c']
 */
function flatMapObj (mappingFn, obj) {
    if (!isTypeOf(mappingFn, 'function')) {
        throw new TypeError(`${typeof(obj)} is not a Function`);
    }

    if (!isTypeOf(obj, 'object')) {
        throw new TypeError(`${typeof(obj)} is not an Object`);
    }

    let flattend = [];

    for (const [key, value] of Object.entries(obj)) {
        flattend = flattend.concat(mappingFn(value, key));
    }
    return flattend;
};

export { flatMap, flatMapObj };
