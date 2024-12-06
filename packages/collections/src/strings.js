
import { types, getType, isIterable } from '../src/types.js';
import beautify from 'js-beautify';

const { isString, isNumber, isObject, isArray, isFunction } = types;
const hasOwn = {}.hasOwnProperty;

/**
 * Escapes newline, carriage return, and tab characters
 * with their respective escape sequences.
 * @param {string} str - The string to be escaped.
 * @returns {string} The escaped string.
 */
function escapeString (str) {
    return str.replace(/(\n)|(\r)|(\t)/g, (_, n, r, t) =>
        (n) ? '\\n' : (r) ? '\\r' : (t) ? '\\t' : ''
    );
};


const getConstructorName = (obj) => {
    const name = obj.constructor.name;
    const length = obj.length || obj.size;
    return (length) ? `${name}(${length}) `: `${name} `;
};

/**
 * Serialize - Serializes nested objects, arrays, and iterables.
 * Intended for self inspection of objects via their toString() method.
 * e.g. { ..., toString() { return Serialize.toString(this); } }
 * @example
 * const obj = { a: 1, b: [2, 3] };
 * obj.b.push((x, y) => x + y);
 * Serialize.toString(obj); // returns
 * `Object {
 *      a: 1,
 *      b: Array(3) [
 *          0: 2,
 *          1: 3,
 *          2: (x, y) => x + y
 *      ]
 * }`
 */
class Serialize {
    _visited = new WeakSet();
    _indent = 4;

    /**
     * Set indentation
     * @param {number} indent - Sets indentation, clamps values between 0-12
     */
    constructor (indent) {
        if (isNumber(indent))
            this._indent = Math.min(0, Math.max(indent, 12));
    }

    /**
     * Stringifies a nested object, array, or iterable.
     * @param {any} obj - The object to be stringified.
     * @param {string} spaces - The spaces to be used for indentation.
     * @returns {string} The stringified object.
     */
    _stringify(obj, spaces='') {

        if (!isObject(obj) && !isIterable(obj, true)) {
            // if string, remove newlines, carriage returns, and tabs
            if (isString(obj))
                return `'${escapeString(obj)}'`;
            // if function, indent to match set indentation
            if (isFunction(obj)) {
                return beautify.js(obj.toString(), { indent_size: this._indent })
                    .replace(/(\n\s*)/gm, `$1${spaces}`);
            }
            return obj;
        }

        if (this._visited.has(obj))
            return '[Circular]';
        this._visited.add(obj);

        const method = this['_' + getType(obj)] || this._Entries;
        const props = method.call(this, obj, spaces + ' '.repeat(this._indent));
        const [open, close] = isArray(obj) ? '[]' : '{}';

        return getConstructorName(obj)
            + open + ('\n' + props.join(',\n') + '\n' + spaces) + close;
    }

    /**
     * Internal Array stringification method.
     * @param {Array} arr - The array to be stringified.
     * @param {string} spaces - The spaces to be used for indentation.
     * @returns {string[]} The indexed stringified properties of the Array.
     */
    _Array(arr, spaces) {
        const props = [];
        const length = arr.length;
        let i = 0;
        while (i < length)
            props[i] = (`${spaces}${i}: ` + this._stringify(arr[i++], spaces));
        return props;
    }

    /**
     * Internal Object stringification method.
     * @param {object} obj - The Object to be stringified.
     * @param {string} spaces - The spaces to be used for indentation.
     * @returns {string[]} The stringified properties of the Object.
     */
    _Object(obj, spaces) {
        const props = [];
        for (const key in obj)
            if (hasOwn.call(obj, key))
                props.push(`${spaces}${key}: ` + this._stringify(obj[key], spaces));
        return props;
    }

    /**
     * Internal Set stringification method.
     * @param {Set} set - The Set to be stringified.
     * @param {string} spaces - The spaces to be used for indentation.
     * @returns {string[]} The stringified values of the Set.
     */
    _Set(set, spaces) {
        const props = [];
        for (const val of set)
            props.push(spaces + this._stringify(val, spaces));
        return props;
    }

    /**
     * Internal default stringification method for iterables with key, value pairs.
     * @external Iterable https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
     * @param {Iterable.<*>} obj - The Iterable to be stringified.
     * @param {string} spaces - The spaces to be used for indentation.
     * @returns {string[]} The stringified key, value pairs of the Iterable.
     */
    _Entries(obj, spaces) {
        const props = [];
        for (const [key, val] of obj)
            props.push(`${spaces}${key}: ` + this._stringify(val, spaces));
        return props;
    }

    toString(obj) {
        return this._stringify(obj);
    }

    static toString(obj, indent) {
        return new Serialize(indent)._stringify(obj);
    }
};

export { Serialize };
