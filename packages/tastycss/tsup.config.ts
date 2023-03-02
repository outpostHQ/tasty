import { defineConfig } from 'tsup';
import packageJSON from './package.json';

export default defineConfig({
  clean: true,
  format: ['cjs', 'esm'],
  treeshake: true,
  minify: true,
  dts: true,
  external: [
    ...Object.keys(packageJSON['dependencies']),
    ...Object.keys(packageJSON['devDependencies']),
    ...Object.keys(packageJSON['peerDependencies']),
  ],
});