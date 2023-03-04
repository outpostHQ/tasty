import { defineConfig } from 'tsup';

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

import packageJSON from './package.json';

const walk = function ({
  dir,
  exclude,
  extensions,
}: {
  dir: string;
  exclude: RegExp[];
  extensions: string[];
}) {
  const files: string[] = [];
  const folders: fs.Dirent[] = [];

  // get the contents of dir
  const items = fs.readdirSync(dir, {
    withFileTypes: true,
  });

  // for each item in the contents
  outer: for (const item of items) {
    const INNER_PATH = path.join(dir, item.name);

    for (const excludeItem of exclude) {
      if (excludeItem.test(INNER_PATH)) continue outer;
    }

    if (item.isDirectory()) {
      folders.push(item);
    }

    if (item.isFile()) {
      let extPresent = false;

      for (const ext of extensions) {
        if (INNER_PATH.endsWith(ext)) {
          extPresent = true;
        }
      }

      if (extPresent) files.push(INNER_PATH);
    }
  }

  for (const innerDir of folders) {
    const DIR_PATH = path.join(dir, innerDir.name);
    files.push(
      ...walk({
        dir: DIR_PATH,
        exclude,
        extensions,
      }),
    );
  }

  return files;
};

const entry = walk({
  dir: 'src',
  exclude: [/test\.tsx$/, /__snapshots__/],
  extensions: ['tsx', 'ts', 'jsx', 'js'],
}).map((filePath) => filePath.replace(/\\/g, '/'));

export default defineConfig({
  entry,
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
