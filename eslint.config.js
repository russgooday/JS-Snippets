import globals from "globals";
import pluginJs from "@eslint/js";

export default [
    {
        languageOptions: {
            globals: globals.browser
        }
    },
    pluginJs.configs.recommended,
    {
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
        }
    }
];