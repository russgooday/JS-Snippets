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

export { TYPES, isTypeOf, isSomeTypeOf };