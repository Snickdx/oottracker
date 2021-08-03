// rollup.config.js
// https://www.learnwithjason.dev/blog/learn-rollup-js
// https://www.npmjs.com/package/rollup-plugin-copy

// Rollup plugins
import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-copy';
const { generateSW } = require('rollup-plugin-workbox');
const { injectManifest } = require('rollup-plugin-workbox');


export default {
    entry: 'src/scripts/main.js',
    dest: 'dist/js/main.min.js',
    format: 'iife',
    sourceMap: 'inline',
    plugins: [
        babel({exclude: 'node_modules/**'}),
        copy({
            targets: [
                { src: 'src/index.html', dest: 'dist/public' }
            ]
        }),
        injectManifest({
            swSrc: '/src/sw.js',
            swDest: '/dist/sw.js',
            globDirectory: '/dist/',
        }),
    ],
};