import { defineConfig } from 'tsup';

import packageJSON from './package.json';

export default defineConfig({
  entry: [
    './src/*.ts',
    './src/tasty.tsx',
    './src/providers/**/*',
    './src/styles/**/*',
    './src/utils/**/*',
  ],

  clean: true,
  format: ['cjs', 'esm'],
  legacyOutput: true,
  treeshake: true,
  minify: true,
  dts: true,
  external: [
    ...Object.keys(packageJSON['dependencies']),
    ...Object.keys(packageJSON['devDependencies']),
    ...Object.keys(packageJSON['peerDependencies']),
  ],
});
