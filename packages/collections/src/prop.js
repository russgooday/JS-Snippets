// TODO: Allow prop to take multiple keys and return an array of values
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
};

export { prop };