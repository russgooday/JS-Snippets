import { flatMap } from '../src/arrays.js';
import { timeTests } from '../utils/timeit.js';
import _ from 'lodash';

// Setup
const randomArray = Array.from({length: 1000000}, () => Math.floor(Math.random() * 100));
const randomMap = new Map(randomArray.map((val, i) => [i, val]));
const isEven = (x) => !(x % 2);


//Tests
const flatMapArrays = (
    timeTests('flatMap performance tests with Array collection')
        .add(
            'Vanilla JS flatMap',
            () => {
                randomArray.flatMap(value => isEven(value) ? [value] : []);
            }
        )
        .add(
            '_.loDash flatMap',
            () => {
                _.flatMap(randomArray, value => isEven(value) ? [value] : []);
            }
        )
        .add(
            'Custom flatMap',
            () => {
                flatMap(randomArray, value => isEven(value) ? [value] : []);
            }
        )
);

/* eslint-disable no-unused-vars */
const flatMapMaps = (
    timeTests('flatMap performance tests with Map collection')
        .add(
            'Vanilla JS flatMap',
            () => {
                [...randomMap].flatMap(([index, value]) => isEven(value) ? [value] : []);
            }
        )
        .add(
            '_.loDash flatMap',
            () => {
                _.flatMap(_.toArray(randomMap), ([index, value]) => isEven(value) ? [value] : []);
            }
        )
        .add(
            'Custom flatMap',
            () => {
                flatMap(randomMap, ([index, value]) => isEven(value) ? [value] : []);
            }
        )
);

flatMapArrays.run(100);
flatMapMaps.run(100);