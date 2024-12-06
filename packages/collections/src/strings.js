
import { types, getType, isIterable } from '../src/types.js';
import beautify from 'js-beautify';

const { isString, isObject, isArray, isFunction } = types;
const hasOwn = {}.hasOwnProperty;

/**
 * Escapes special characters in a string by replacing newline, carriage return, and tab characters
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

const Serialize = {
    _stringify(obj, spaces='') {
        if (!isObject(obj) && !isIterable(obj, true)) {
            if (isString(obj))
                return `'${escapeString(obj)}'`;
            if (isFunction(obj))
                return beautify.js(obj.toString(), {indent_size: this.indent})
                    .replace(/^/gm, spaces).trimStart();
            return obj;
        }

        if (this._visited.has(obj))
            return '[Circular]';
        this._visited.add(obj);

        const stringifyMethod = this[getType(obj)] || this.Entries;
        const props = stringifyMethod.call(this, obj, spaces + ' '.repeat(this.indent));
        const [open, close] = isArray(obj) ? '[]' : '{}';

        return getConstructorName(obj)
            + open + ('\n' + props.join(',\n') + '\n' + spaces) + close;
    },

    Array(obj, spaces) {
        const props = [];
        const length = obj.length;
        let i = 0;
        while (i < length) {
            props.push(`${spaces}${i}: ` + this._stringify(obj[i++], spaces));
        }
        return props;
    },

    Object(obj, spaces) {
        const props = [];
        for (const key in obj)
            if (hasOwn.call(obj, key))
                props.push(`${spaces}${key}: ` + this._stringify(obj[key], spaces));
        return props;
    },

    Set(obj, spaces) {
        const props = [];
        for (const val of obj)
            props.push(spaces + this._stringify(val, spaces));
        return props;
    },

    Entries(obj, spaces) {
        const props = [];
        for (const [key, val] of obj)
            props.push(`${spaces}${key}: ` + this._stringify(val, spaces));
        return props;
    },

    toString(obj, indent=4) {
        this._visited = new WeakSet();
        this.indent = indent;
        return this._stringify(obj);
    }
};

export { Serialize };