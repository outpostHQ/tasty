import { defineConfig } from 'tsup';
import { findUpSync } from 'find-up';

export default defineConfig({
  entry: ['./src/index.ts'],
  dts: true,
  clean: true,
  format: ['cjs', 'esm'],
  inject: process.env.JSX ? [findUpSync('react-shim.js')!] : undefined,
  external: ['react'],
  treeshake: true,
});
