// Tests: reduce performance tests with Array collection
import { reduce } from '../src/arrays.js';
import { timeTests } from '../utils/timeit.js';
import _ from 'lodash';

// Setup
const randomArray = Array.from({length: 1000000}, () => Math.floor(Math.random() * 100));
const randomMap = new Map(randomArray.map((val, i) => [i, val]));

const sum = (a, b) => a + b;
const sumValues = (a, b) => a + b[1];


//Tests
const reduceMaps = (
    timeTests('reduce performance tests with a (Map) of one million random values')
        .add(
            'Vanilla JS reduce',
            () => {
                Array.from(randomMap).reduce(sumValues, 0);
            }
        )
        .add(
            '_.loDash reduce',
            () => {
                _.reduce(_.toArray(randomMap), sumValues, 0);
            }
        )
        .add(
            'Custom reduce',
            () => {
                reduce(randomMap, sumValues, 0);
            }
        )
);

const reduceArrays = (
    timeTests('reduce performance tests with an (Array) of one million random values')
        .add(
            'Vanilla JS reduce',
            () => {
                randomArray.reduce(sum);
            }
        )
        .add(
            '_.loDash reduce',
            () => {
                _.reduce(randomArray, sum);
            }
        )
        .add(
            'Custom reduce',
            () => {
                reduce(randomArray, sum);
            }
        )
);

reduceMaps.run(100); // 100 iterations
reduceArrays.run(1000); // 1000 iterations