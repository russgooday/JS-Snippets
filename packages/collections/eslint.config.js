import globals from "globals";
import pluginJs from "@eslint/js";
import jsdoc from 'eslint-plugin-jsdoc';

export default [
    jsdoc.configs['flat/recommended'],
    {
        languageOptions: {
            globals: globals.browser
        },
        rules: {
            'padded-blocks': 0,
            indent: ['error', 4],
            'no-multiple-empty-lines': 0,
            'no-trailing-spaces': 0,
            'no-new': 0,
            'no-return-assign': 0,
            'no-param-reassign': 0,
            'comma-dangle': ['error', 'never'],
            'no-console': 'off',
            'no-restricted-syntax': 0,
            semi: ['error', 'always']
        },
        plugins: {
            jsdoc
        }
    },
    pluginJs.configs.recommended
];