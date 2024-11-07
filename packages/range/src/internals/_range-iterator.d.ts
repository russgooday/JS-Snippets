export class _RangeIterator {
    /**
   * Creates a new RangeIterator object.
   * @param {int} start - The starting value of the range.
   * @param {int} stop - The ending value of the range.
   * @param {int} step - The step size between values in the range.
   * @param {int} length - The length of the range.
   */
    constructor(start: int, stop: int, step: int, length: int);
    start: int;
    stop: int;
    step: int;
    length: int;
    index: number;
    next(): {
        value: any;
        done: boolean;
    };
    [Symbol.iterator](): this;
}
