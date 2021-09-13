import { terser } from 'rollup-plugin-terser';
import visualizer from 'rollup-plugin-visualizer';
import replace from 'rollup-plugin-replace';
import localResolve from 'rollup-plugin-local-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

import pkg from './package.json';

const visualizerPlugins = [
  visualizer({
    filename: 'stats.html'
  }),
];

const DEV = !!process.env.ROLLUP_WATCH;
const ENV = DEV ? 'development' : 'production';
const VERSION = `"${pkg.version}"`;
const getPlugins = (format) => {
  return [
    ...(format === 'mjs' ? visualizerPlugins : []),
    replace({
      'process.env.NODE_ENV': JSON.stringify(ENV),
      'process.env.APP_VERSION': VERSION,
    }),
    typescript({
      tsconfig: `tsconfig-${format}.json`,
    }),
    commonjs(),
    localResolve({
      extensions: ['.jsx', '.js', '.tsx', '.ts'],
    }),
    ENV === 'development' ? undefined : terser(),
  ];
};
const external = ['react/jsx-runtime', 'react', 'styled-components', 'tastycss'];

export default [
  {
    external,
    input: 'src/index.tsx',
    output: [
      {
        name: 'tastycss-react',
        dir: 'dist/mjs',
        format: 'es',
        sourcemap: true,
      },
    ],
    inlineDynamicImports: true,
    plugins: getPlugins('mjs'),
  },
  {
    external,
    input: 'src/index.tsx',
    output: [
      {
        name: 'tastycss-react',
        dir: 'dist/cjs',
        format: 'cjs',
        sourcemap: true,
      },
    ],
    inlineDynamicImports: true,
    plugins: getPlugins('cjs'),
  },
];
