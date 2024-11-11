'use strict';

// Type checking functions
const TYPES = {
    'arguments': '[object Arguments]',
    'array': '[object Array]',
    'asyncfunction': '[object AsyncFunction]',
    'boolean': '[object Boolean]',
    'date': '[object Date]',
    'domexception': '[object DOMException]',
    'error': '[object Error]',
    'function': '[object Function]',
    'generatorfunction': '[object GeneratorFunction]',
    'map': '[object Map]',
    'number': '[object Number]',
    'null': '[object Null]',
    'object': '[object Object]',
    'promise': '[object Promise]',
    'proxy': '[object Proxy]',
    'regexp': '[object RegExp]',
    'set': '[object Set]',
    'string': '[object String]',
    'symbol': '[object Symbol]',
    'undefined': '[object Undefined]',
    'weakmap': '[object WeakMap]',
    'weakset': '[object WeakSet]'
};

const toString = {}.toString;

/**
 * isTypeOf
 * checks if an object is of the specified type.
 * @function
 * @param {any} obj Object to check type of.
 * @param {string} type Type to check against.
 * @returns {boolean} True if object is of the specified type, otherwise false.
 * @example
 * isTypeOf([], 'array'); // true
 * isTypeOf({}, 'array'); // false
 */
function isTypeOf (obj, type) {
    if (toString.call(type) !== TYPES.string) {
        throw new TypeError(`${typeof(type)} is not a string`);
    }
    return toString.call(obj) === TYPES[type];
}

/**
 * isSomeTypeOf
 * checks if an object is one of the specified types.
 * @function
 * @param {any} obj Object to check type of.
 * @param {string[]} types Types to check against.
 * @returns {boolean} True if object is of the specified type, otherwise false.
 * @example
 * isSomeTypeOf([], ['string', 'array']); // true
 * isSomeTypeOf([], ['object', 'string']); // false
 */
function isSomeTypeOf (obj, types) {
    if (toString.call(types) !== TYPES.array) {
        throw new TypeError(`${typeof(types)} is not an array`);
    }

    const objType = toString.call(obj);

    for (const type of types) {
        if (objType === TYPES[type]) {
            return true;
        }
    }
    return false;
}

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
}
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
}

// Getters and setters for object properties

/**
 * Prop - A curried function which gets the value of an object's key.
 * @function
 * @param {string|number|symbol} key The key to get the value from.
 * @returns {(obj:object) => any} A function that takes an object and returns the object's key value.
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * const getC = prop('c');
 * getC(obj); // returns 3
 */
function prop (key) {
    /**
     * @function
     * @param {object} obj The object to get the value from.
     * @returns {any} The object's key value.
     */
    function fromObj (obj) {
        return obj?.[key];
    }
    return fromObj;
}

exports.flatMap = flatMap;
exports.flatMapObj = flatMapObj;
exports.isSomeTypeOf = isSomeTypeOf;
exports.isTypeOf = isTypeOf;
exports.prop = prop;
