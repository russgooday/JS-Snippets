/**
 * wraps - A function that wraps a function with its own properties e.g. name, length.
 * @param {Function} fn - The function to wrap.
 * @returns {Function} A wrapped function with its own properties.
 */
function wraps(fn) {
    return function(wrapper) {
        return Object.defineProperties(
            wrapper, {
                name: Object.getOwnPropertyDescriptor(fn, 'name'),
                toString: {
                    value: () => fn.toString().replace(/[\r\n ]+/g, ' ')
                }
            }
        );
    };
}

export { wraps };