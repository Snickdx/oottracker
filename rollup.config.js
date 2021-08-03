// rollup.config.js
// https://www.learnwithjason.dev/blog/learn-rollup-js
// https://www.npmjs.com/package/rollup-plugin-copy

// Rollup plugins
// import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-copy';
const { injectManifest } = require('rollup-plugin-workbox');


export default {
    input: 'src/main.js',
    output: [
        {
            file: 'dist/main.js',
            format: 'iife',
        }
    ],
    plugins: [
        // babel({exclude: 'node_modules/**'}),
        copy({
            targets: [
                { src: 'src/index.html', dest: 'dist' }
            ]
        }),
        injectManifest({
            swSrc: 'src/sw.js',
            swDest: 'dist/sw.js',
            globDirectory: 'dist/',
        }),
    ],
};