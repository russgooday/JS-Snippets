/** @module collections */

/**
 * flatMapArray - A function that applies a given mapping function to each element of an array,
 * then flattens the result into a new array.
 * @template T, MappedT
 * @param {Array} arr The array to map over.
 * @param { (item: T, i: number) => MappedT } mappingFn A function to be applied to each element.
 * @returns {MappedT[]} A flattened array of mapped results.
 * @example
 * const swap = ([key, val]) => [val, key];
 * flatMapArray(swap, [['a', 1], ['b', 2], ['c', 3]]); // returns [1, 'a', 2, 'b', 3, 'c']
 */
function flatMapArray(arr, mappingFn) {
    const length = arr.length;
    const flattened = [];
    let i = 0;

    while (i < length) {
        const value = mappingFn(arr[i], i++);

        if (typeof value[Symbol.iterator] === 'function') {
            flattened.push(...value);
            continue;
        }

        flattened.push(value);
    }
    return flattened;
}

/**
 * flatMap - A function that applies a given mapping function to each element of a collection,
 * then flattens the result into a new array.
 * @function
 * @external Iterable https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
 * @template T, MappedT
 * @param { Iterable } collection The iterable collection to map over.
 * @param { (item: T, i: number) => MappedT } mappingFn A function to be applied to each element.
 * @returns { MappedT[] } A flattened array of mapped results.
 * @example
 * const swap = ([key, val]) => [val, key];
 * const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
 * flatMap(swap, map); // returns [1, 'a', 2, 'b', 3, 'c']
 */
function flatMap (collection, mappingFn) {
    if (Array.isArray(collection))
        return flatMapArray(collection, mappingFn);

    const flattened = [];
    let i = 0;

    for (const item of collection) {
        const value = mappingFn(item, i++);

        if (typeof value[Symbol.iterator] === 'function') {
            flattened.push(...value);
            continue;
        }

        flattened.push(value);
    }
    return flattened;
}


/**
 * reduceArray - A function that reduces an array to a single value.
 * @param {Array} arr - The array to reduce.
 * @param {Function} reducer - The reducer function.
 * @param {any} accumulator - The initial value for the accumulator.
 * @returns {any} The final accumulator value.
 * @example
 * const sum = (a, b) => a + b;
 * reduceArray([1, 2, 3, 4], sum); // returns 10
 */
function reduceArray(arr, reducer, accumulator) {
    const length = arr.length;
    let i = 0;

    if (accumulator === undefined)
        accumulator = arr[i++];

    while (i < length)
        accumulator = reducer(accumulator, arr[i++]);

    return accumulator;
}


/**
 * reduce - A function that reduces an iterable collection to a single value.
 * @param {Iterable} collection - The collection to reduce.
 * @param {Function} reducer - The reducer function.
 * @param {any} accumulator - The initial value for the accumulator.
 * @returns {any} The final accumulator value.
 * @example
 * const sumValues = (a, [key, val]) => a + val;
 * const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
 * reduce(map, sumValues, 0); // returns 6
 */
function reduce(collection, reducer, accumulator) {
    // if an Array, use the faster reduceArray
    if (Array.isArray(collection))
        return reduceArray(collection, reducer, accumulator);

    let iter = collection[Symbol.iterator]();

    if (accumulator === undefined)
        accumulator = iter.next().value;

    for (const item of iter)
        accumulator = reducer(accumulator, item);

    return accumulator;
}

/**
 * findArray - A function that searches an array for the first item that satisfies a predicate.
 * @param {Array} arr - The array to search.
 * @param {Function} predicate - The predicate function.
 * @returns {any|undefined} The first item that satisfies the predicate, or undefined.
 * @example
 * const isEven = (n) => n % 2 === 0;
 * findArray([1, 2, 3, 4], isEven); // 2
 */
function findArray(arr, predicate) {
    const length = arr.length;
    let i = 0;
    while (i < length) {
        const item = arr[i++];
        if (predicate(item))
            return item;
    }
    return undefined;
}

/**
 * find - A function that searches a collection for the first item that satisfies a predicate.
 * @param {Iterable} collection - The collection to search.
 * @param {Function} predicate - The predicate function.
 * @returns {any|undefined} The first item that satisfies the predicate, or undefined.
 * @example
 * const isEven = (n) => n % 2 === 0;
 * const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
 * find(map, ([key, val]) => isEven(val)); // ['b', 2]
 */
function find(collection, predicate) {
    // if an Array, use the faster findArray
    if (Array.isArray(collection))
        return findArray(collection, predicate);

    for (const item of collection) {
        if (predicate(item)) return item;
    }
    return undefined;
}

/**
 * mapArray - A function that maps an array to a new array.
 * @param {Array} arr - The array to map.
 * @param {Function} mappingFn - The mapping function.
 * @returns {Array} A new array of mapped results.
 * @example
 * const double = (n) => n * 2;
 * mapArray([1, 2, 3, 4], double); // returns [2, 4, 6, 8]
 */
function mapArray(arr, mappingFn) {
    const length = arr.length;
    const mapped = Array(length);
    let i = 0;

    while (i < length)
        mapped[i] = mappingFn(arr[i], i++);
    return mapped;
}

/**
 * map - A function that maps an iterable collection to a new array.
 * @param {Iterable} collection - The collection to map.
 * @param {Function} mappingFn - The mapping function.
 * @returns {Array} A new array of mapped results.
 */
function map(collection, mappingFn) {
    // if an Array, use the faster mapArray
    if (Array.isArray(collection))
        return mapArray(collection, mappingFn);

    const mapped = [];
    let i = 0;

    for (const item of collection)
        mapped[i] = mappingFn(item, i++);

    return mapped;
}

export { flatMap, reduce, find, map };