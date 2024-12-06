// Getters and setters for object properties

/**
 * Prop - A higher order function which gets the value of an object's key.
 * @param {string|number} key The key to retrieve the value for.
 * @param {any} defaultVal The default value to return if the key is not found.
 * @returns {(obj: object) => any} A function that takes an object and returns the value of the specified key.
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * const getC = prop('c');
 * getC(obj); // returns 3
 */
function prop(key, defaultVal=undefined) {
    return function (obj) {
        return obj?.[key] ?? defaultVal;
    };
}


/**
 * Props - A higher order function which gets the value of an object's key.
 * If multiple keys are supplied, an array of values is returned.
 * @function
 * @param {...(string|number)} keys The key(s) to retrieve values for.
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
function props(...keys) {
    if (!keys.length) {
        throw new TypeError('Expected at least one argument');
    }
    return function (obj) {
        if (obj == null) return;
        return keys.map(key => prop(key, obj[key]));
    };
}


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
function pick(...keys) {
    return function (obj) {
        const newObj = {};

        for (const key of keys) {
            if (({}).hasOwnProperty.call(obj, key)) {
                newObj[key] = obj[key];
            }
        }
        return newObj;
    };
}


/**
 * Pluck - A function that plucks specified key values from an array of objects
 * @function
 * @param {object[]} collection The collection of objects to pluck values from.
 * @param {string} key The key to pluck values from.
 * @returns {any[]} An array of values plucked from the collection.
 * @example
 * const people = [{name: 'Fred', age: 42}, {name: 'Barney', age: 40}]
 * pluck(people, 'name') // ['Fred', 'Barney']
 */
function pluck(collection, key) {
    const length = collection.length;
    const plucked = Array(length);

    for (let i = 0; i < length; i++) {
        plucked[i] = collection[i][key];
    }

    return plucked;
}

export { prop, props, pick, pluck };