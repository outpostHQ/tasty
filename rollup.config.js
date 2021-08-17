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
const plugins = [
  visualizer(),
  replace({
    'process.env.NODE_ENV': JSON.stringify(ENV),
    'process.env.APP_VERSION': VERSION,
  }),
  commonjs(),
  typescript({
    tsconfig: 'tsconfig.json',
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
        dir: 'dist',
        format: 'es',
        sourcemap: true,
      },
    ],
    inlineDynamicImports: true,
    plugins,
  },
	{
    input: 'src/react/index.ts',
    output: [
      {
        name: 'TastyCSS',
        dir: 'react',
        format: 'es',
        sourcemap: true,
      },
    ],
    inlineDynamicImports: true,
    plugins,
  },
];
