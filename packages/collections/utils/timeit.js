// Description: A utility for measuring the performance of functions.
import { Serialize } from '../src/strings.js';
import { find } from '../src/arrays.js';
import { wraps } from '../src/functions.js';
import { formatOrdinals, percentageIncrease } from '../src/numbers.js';

const formatNumber = new Intl.NumberFormat('en-GB', { maximumFractionDigits: 3 }).format;

/**
 * timeIt - A function that measures the average time taken to execute a function.
 * @param {Function} fn - The function to measure.
 * @returns {Function} A wrapped function that measures the average time taken to execute the function.
 */
function timeIt(fn) {
    const wrapper = wraps(fn);

    return wrapper (
        function(iterations, ...args) {
            const start = performance.now();
            for (let i = 0; i < iterations; i++) fn(...args);
            const stop = performance.now();
            return (stop - start) / iterations / 1000;
        }
    );
}

/**
 * logTimes - Logs the results of the time tests.
 * @param {Array} times - The logs to display.
 * @returns {undefined}
 */
function logTimes(times) {
    const slowest = Math.max(...times.map(({time}) => time));

    console.log('Results compared:');
    console.log(times.map(({ description, time }, index) => {
        const position = formatOrdinals(index + 1);
        return (time === slowest)
            ? `${position}. ${description}: slowest`
            : `${position}. ${description}: ${formatNumber(percentageIncrease(slowest, time))}% faster`;
    }).join('\r')
    );
}

class TimeTest {
    constructor(id, description, fn) {
        this.id = id;
        this.description = description;
        this.fn = timeIt(fn);
    }

    run(iterations) {
        const time = this.fn(iterations);
        console.log(`${this.id}. ${this.description}: average time ${formatNumber(time)}s`);
        return { ...this, time };
    }
}

class TimeTests {
    #id = 1;

    constructor(title) {
        this.title = title;
        this.tests = new Set();
    }

    add(description, fn) {
        this.tests.add(new TimeTest(this.#id++, description, fn));
        return this;
    }

    remove(id) {
        const test = find(this.tests, (test) => test.id === id);
        if (test)
            this.tests.delete(test);
        return this;
    }

    run(iterations = 10000) {
        console.log(`Starting ${this.title}...`);
        const times = [];

        for (const test of this.tests)
            times.push(test.run(iterations));

        logTimes(times.toSorted((a, b) => a.time - b.time));
    }

    clear() {
        this.#id = 1;
        this.tests.clear();
    }

    [Symbol.iterator]() {
        return this.tests.values();
    }

    toString() {
        return Serialize.toString(this);
    }
}

export const timeTests = (title) => new TimeTests(title);