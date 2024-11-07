import { _RangeIterator } from './internals/_range-iterator.js';

class Range {
    /**
   * Creates a new Range object.
   * @param {...int} args - The arguments for defining the range.
   *                        Can be one, two, or three arguments.
   *                        If one argument is provided, it is considered as the 'stop' value.
   *                        If two arguments are provided, they are considered as the 'start' and 'stop' values.
   *                        If three arguments are provided, they are considered as the 'start', 'stop', and 'step' values.
   * @throws {RangeError} If no arguments are provided.
   * @throws {TypeError} If any of the arguments are not integers.
   * @throws {RangeError} If the step value is zero.
   */
    constructor(...args) {

        if (args.length === 0) {
            throw RangeError('Range expected at least 1 argument, got 0');
        }

        if (!args.every(Number.isInteger)) {
            throw TypeError('range indices must all be integers');
        }

        // default starting values
        let [start, stop, step] = [0, 0, 1];

        if (args.length === 3) {
            [start, stop, step] = args;

            if (step === 0) {
                throw RangeError('step must not be zero');
            }
        }

        else if (args.length === 2) {
            [start, stop] = args;
        }

        else {
            stop = args[0];
        }

        this.start = start;
        this.stop = stop;
        this.step = step;
    }

    /**
   * Returns the value at the specified index in the range.
   * @param {int} index - The index of the value to retrieve.
   * @returns {int} The value at the specified index.
   * @throws {RangeError} If the index is out of range.
   */
    index(index) {
        if (!this._withinBounds(index)) {
            throw RangeError(`index ${index} out of range`);
        }
        return this._getitem(index);
    }

    /**
   * Returns a new Range object that represents a slice of the current range.
   * @param {int} start - The starting index of the slice.
   * @param {int} stop - The ending index of the slice.
   * @param {int} step - The step size between values in the slice.
   * @returns {Range} A new Range object representing the slice of the current range.
   * @throws {RangeError} If the step value is zero.
   */
    slice(start, stop, step=1) {
        if (step === 0) {
            throw RangeError('slice step must not be zero');
        }

        if (step === undefined) step = 1;

        return new Range(...this._calcSlice(start, stop, step));
    }

    /**
   * Checks if the specified index is within the bounds of the range.
   * @param {int} index - The index to check.
   * @returns {boolean} True if the index is within the bounds of the range, false otherwise.
   */
    _withinBounds(index) {
        const length = this.length;
        return index >= -length && index < length;
    }

    /**
   * Returns the value at the specified index in the range.
   * @param {int} index - The index of the value to retrieve.
   * @returns {int} The value at the specified index.
   */
    _getitem(index) {
        const length = this.length;
        if (index < 0) {
            index+= length;
        }
        return this.start + index * this.step;
    }

    /**
   * Calculates the start, stop, and step values for a slice of the range.
   * @param {int} start - The starting index of the slice.
   * @param {int} stop - The ending index of the slice.
   * @param {int} step - The step size between values in the slice.
   * @returns {Array} An array containing the start, stop, and step values for the slice.
   */
    _calcSlice(start, stop, step) {
        const reversed = step < 0;
        const length = this.length;
        const {max, min} = Math;

        if (start === undefined || start === null) {
            // either end of the range, depending on direction
            start = this._getitem(reversed ? -1 : 0);
        } else {
            // convert negative start index to it's positive equivalent
            if (start < 0) {
                start += length;
            }
            // clamp start index value
            start = this._getitem(max(0, min(start, length)));
        }

        if (stop === undefined || stop === null) {
            // one step either side of the range, depending on direction
            stop = this._getitem(reversed ? -(length+1) : length);
        } else {
            if (stop < 0) {
                stop += length;
            }
            // clamp stop index value
            stop = this._getitem(max(-(length+1), min(stop, reversed ? length-1 : length)));
        }

        step = step * this.step;
        return [start, stop, step];
    }

    /**
   * Returns the iterator object for the range.
   * @returns {object} The iterator object.
   */
    [Symbol.iterator]() {
        return new _RangeIterator(this.start, this.stop, this.step, this.length);
    }

    /**
   * Returns the length of the range.
   * @returns {int} The length of the range.
   */
    get length() {
        const {start, stop, step} = this;
        const difference = (start < stop)
            ? stop - start
            : start - stop;
        return Math.ceil(difference / Math.abs(step));
    }
}

export { Range };
