import { terser } from 'rollup-plugin-terser';
import visualizer from 'rollup-plugin-visualizer';
import replace from 'rollup-plugin-replace';
import localResolve from 'rollup-plugin-local-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

import pkg from './package.json';

const DEV = !!process.env.ROLLUP_WATCH;
const ENV = DEV ? 'development' : 'production';
const VERSION = `"${pkg.version}"`;
const getPlugins = (type) => [
  visualizer({
    filename: `stats${type ? `-${type}` : ''}.html`
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify(ENV),
    'process.env.APP_VERSION': VERSION,
  }),
  commonjs(),
  typescript({
    tsconfig: `tsconfig${type ? `-${type}` : ''}.json`,
  }),
  localResolve({
    extensions: ['.jsx', '.js', '.tsx', '.ts'],
  }),
  ENV === 'development' ? undefined : terser(),
];

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        name: 'TastyCSS',
        file: 'dist/index.mjs',
        format: 'es',
        sourcemap: true,
      },
    ],
    inlineDynamicImports: true,
    plugins: getPlugins(),
  },
  {
    input: 'src/index.ts',
    output: [
      {
        name: 'TastyCSS',
        file: 'dist/index.cjs',
        format: 'cjs',
        sourcemap: true,
      },
    ],
    inlineDynamicImports: true,
    plugins: getPlugins(),
  },
	{
	  external: [
      'styled-components',
      'node_modules/react',
    ],
    input: 'src/react/index.tsx',
    output: [
      {
        name: 'TastyCSS React',
        file: 'react/index.mjs',
        format: 'es',
        sourcemap: true,
      },
    ],
    inlineDynamicImports: true,
    plugins: getPlugins('react'),
  },
  {
	  external: [
      'styled-components',
      'node_modules/react',
    ],
    input: 'src/react/index.tsx',
    output: [
      {
        name: 'TastyCSS React',
        file: 'react/index.cjs',
        format: 'cjs',
        sourcemap: true,
      },
    ],
    inlineDynamicImports: true,
    plugins: getPlugins('react'),
  },
];
