export class Range {
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
    constructor(...args: int[]);
    start: number;
    stop: number;
    step: number;
    /**
   * Returns the value at the specified index in the range.
   * @param {int} index - The index of the value to retrieve.
   * @returns {int} The value at the specified index.
   * @throws {RangeError} If the index is out of range.
   */
    index(index: int): int;
    /**
   * Returns a new Range object that represents a slice of the current range.
   * @param {int} start - The starting index of the slice.
   * @param {int} stop - The ending index of the slice.
   * @param {int} step - The step size between values in the slice.
   * @returns {Range} A new Range object representing the slice of the current range.
   * @throws {RangeError} If the step value is zero.
   */
    slice(start: int, stop: int, step?: int): Range;
    /**
   * Checks if the specified index is within the bounds of the range.
   * @param {int} index - The index to check.
   * @returns {boolean} True if the index is within the bounds of the range, false otherwise.
   */
    _withinBounds(index: int): boolean;
    /**
   * Returns the value at the specified index in the range.
   * @param {int} index - The index of the value to retrieve.
   * @returns {int} The value at the specified index.
   */
    _getitem(index: int): int;
    /**
   * Calculates the start, stop, and step values for a slice of the range.
   * @param {int} start - The starting index of the slice.
   * @param {int} stop - The ending index of the slice.
   * @param {int} step - The step size between values in the slice.
   * @returns {Array} An array containing the start, stop, and step values for the slice.
   */
    _calcSlice(start: int, stop: int, step: int): any[];
    /**
   * Returns the length of the range.
   * @returns {int} The length of the range.
   */
    get length(): int;
    /**
   * Returns the iterator object for the range.
   * @returns {object} The iterator object.
   */
    [Symbol.iterator](): object;
}
