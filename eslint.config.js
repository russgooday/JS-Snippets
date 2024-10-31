const globals = require('globals');
const pluginJs = require('@eslint/js');

module.exports = [
    {
        files: ['**/*.js', 'test/**'],
        languageOptions: {
            sourceType: 'commonjs',
            globals: {
                ...globals.browser,
                fetch: true,
                console: true,
                describe: 'readonly',
                test: 'readonly',
                expect: 'readonly'
            }
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
            'no-console': 0,
            'no-restricted-syntax': 0,
            semi: ['error', 'always']
        }
    }
];
