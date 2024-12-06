import resolve from '@rollup/plugin-node-resolve';

export default {
    external: ['js-beautify'],
    input: 'src/index.js',
    output: [
        {
            file: 'dist/collections.js',
            format: 'es'
        },
        {
            file: 'dist/collections.cjs',
            format: 'cjs'
        }
    ],
    plugins: [
        resolve()
    ]
};