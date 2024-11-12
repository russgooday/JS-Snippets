// Getters and setters for object properties

/**
 * Prop - A higher order function which gets the value of an object's key.
 * If multiple keys are supplied, an array of values is returned.
 * @function
 * @param {...(string|number|symbol)} keys The key(s) to retrieve values for.
 * @returns {(obj: object | any[]) => any | any[]}
 * A function that takes an object or array and returns the value of the specified key(s).
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 *
 * const getC = prop('c');
 * getC(obj); // returns 3
 *
 * const getAB = prop('a', 'b');
 * getAB(obj); // returns [1, 2]
 */
function prop (...keys) {
    if (!keys.length) {
        throw new TypeError('Expected at least one argument');
    }
    /**
     * @function
     * @param {object} obj The object or array to get the value(s) from.
     * @returns {any | any[]} The value(s) of the specified key(s).
     */
    function fromObj (obj) {
        if (keys.length === 1) {
            return obj?.[keys[0]];
        }
        const values = [];

        for (const key of keys) {
            values.push(obj?.[key]);
        }
        return values;
    }
    return fromObj;
};

/**
 * Pick - A higher order function which returns a new object with only the specified keys.
 * @function
 * @param {...(string|number|symbol)} keys The key(s) to keep in the new object.
 * @returns {(obj: object) => object}
 * A function that takes an object and returns a new object with only the specified key(s).
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 *
 * const pickAB = pick('a', 'b');
 * pickAB(obj); // returns { a: 1, b: 2 }
 */
function pick (...keys) {
    /**
     * @function
     * @param {object} obj The object to pick keys from.
     * @returns {object} A new object with only the specified key(s).
     */
    function fromObj (obj) {
        const newObj = {};

        for (const key of keys) {
            if (key in obj) {
                newObj[key] = obj[key];
            }
        }
        return newObj;
    }
    return fromObj;
}

export { prop, pick };