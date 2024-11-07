class _RangeIterator {
    /**
   * Creates a new RangeIterator object.
   * @param {int} start - The starting value of the range.
   * @param {int} stop - The ending value of the range.
   * @param {int} step - The step size between values in the range.
   * @param {int} length - The length of the range.
   */
    constructor(start, stop, step, length) {
        this.start = start;
        this.stop = stop;
        this.step = step;
        this.length = length;
        this.index = 0;
    }


    [Symbol.iterator]() {
        return this;
    }

    next() {
        const value = this.start + this.index * this.step;
        const done = this.index >= this.length;
        this.index += 1;

        return { value, done };
    }
}

export { _RangeIterator };