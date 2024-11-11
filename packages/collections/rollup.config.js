import { babel } from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';

export default {
    input: 'src/index.js', // Entry file
    output: [
        {
            file: 'dist/collections.js', // ES Module output
            format: 'es',
            sourcemap: true
        },
        {
            file: 'dist/collections.cjs', // CommonJS output
            format: 'cjs',
            sourcemap: true
        }
    ],
    plugins: [
        resolve(),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**'
        })
    ]
};