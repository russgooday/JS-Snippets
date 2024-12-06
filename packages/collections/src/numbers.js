// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules
const enOrdinalRules = new Intl.PluralRules('en-GB', { type: 'ordinal' });
const suffixes = new Map([['one', 'st'],['two', 'nd'],['few', 'rd'],['other', 'th']]);

export const formatOrdinals = (n) => {
    const rule = enOrdinalRules.select(n);
    const suffix = suffixes.get(rule);
    return `${n}${suffix}`;
};

export const percentageOf = (a, b) => (a / b) * 100;

export const percentageIncrease = (a, b) => ((a - b) / a) * 100;

export const percentageDecrease = (a, b) => ((b - a) / a) * 100;
