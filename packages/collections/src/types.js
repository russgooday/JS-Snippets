// Type checking functions
const toString = {}.toString;

const TYPES = {
    'Arguments': '[object Arguments]',
    'Array': '[object Array]',
    'AsyncFunction': '[object AsyncFunction]',
    'Boolean': '[object Boolean]',
    'Date': '[object Date]',
    'DOMException': '[object DOMException]',
    'Error': '[object Error]',
    'Function': '[object Function]',
    'GeneratorFunction': '[object GeneratorFunction]',
    'Map': '[object Map]',
    'Number': '[object Number]',
    'Null': '[object Null]',
    'Object': '[object Object]',
    'Promise': '[object Promise]',
    'Proxy': '[object Proxy]',
    'RegExp': '[object RegExp]',
    'Set': '[object Set]',
    'String': '[object String]',
    'Symbol': '[object Symbol]',
    'Undefined': '[object Undefined]',
    'WeakMap': '[object WeakMap]',
    'WeakSet': '[object WeakSet]'
};


/**
 * Strict type checking methods
 * @example
 * types.isString('abc') // true
 * types.isObject([1,2,3]) // false
 * types.isArray([1,2,3]) // true
 */
const types = Object.fromEntries(
    Object.entries(TYPES).map(
        ([key, value]) => ([`is${key}`, (obj) => toString.call(obj) === value])
    )
);

/**
 * isIterable - tests if a given object is iterable
 * @param {any} obj the object to test
 * @param {boolean} ignoreStrings exclude strings(optional), defaults to false
 * @returns {boolean} true if the object is iterable, false otherwise
 * @example
 * const myMap = new Map([['a', 1], ['b', 2]])
 * isIterable(myMap) // true
 * isIterable('abc', true) // false
 */
function isIterable (obj, ignoreStrings = false) {
    // optional chaining Symbol.iterator as 'null' or 'undefined' do not have this property
    const hasIterator = typeof obj?.[Symbol.iterator] === 'function';
    if (!hasIterator || (ignoreStrings && toString.call(obj) === TYPES.String))
        return false;
    return true;
}

/**
 * Returns the internal [[Class]] of an object.
 * @param {any} obj The object whose type is to be determined.
 * @returns {string} The type of the object as a string.
 * @example
 * getType([1, 2, 3]) // 'Array'
 * getType(new Map([['a', 1], ['b', 2]])) // 'Map'
 */
function getType (obj) {
    return toString.call(obj).slice(8, -1);
}

export { getType, isIterable, TYPES, toString, types };
