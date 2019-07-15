import path from 'path';
import babel from 'rollup-plugin-babel';
import alias from 'rollup-plugin-alias';
import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import pkg from '../package.json';

const useLocal = mod => path.resolve(__dirname, '../node_modules', mod);

export const babelOpts = {
  babelrc: false,
  exclude: 'node_modules/**',
  runtimeHelpers: true,
  presets: [
    [useLocal('@babel/preset-env'), { modules: false }],
    useLocal('@babel/preset-react'),
  ],
  plugins: [
    useLocal('@babel/plugin-proposal-class-properties'),
    useLocal('@babel/plugin-transform-runtime'),
  ],
};

export const external = [
  ...Object.keys(pkg.dependencies),
];

export const plugins = [
  alias({
    resolve: ['.jsx', '.js'],
    Root: path.resolve(__dirname, '..'),
    Utils: path.resolve(__dirname, '../src/utils'),
    Constants: path.resolve(__dirname, '../src/constants'),
    Scripts: path.resolve(__dirname, '../src/scripts'),
  }),
  babel(babelOpts),
  json(),
  resolve({
    preferBuiltins: true,
    extensions: ['.js', '.jsx'],
    modulesOnly: true,
  }),
];

export default [
  {
    input: [
      path.resolve(process.cwd(), 'src/scripts/index.js'),
    ],
    output: [
      { file: path.resolve(process.cwd(), pkg.main), format: 'cjs' },
      { file: path.resolve(process.cwd(), pkg.module), format: 'es' },
    ],
    external,
    plugins,
  },
  {
    input: [
      path.resolve(process.cwd(), 'src/cli.js'),
    ],
    output: [
      {
        file: path.resolve(process.cwd(), 'dist/cli.js'),
        format: 'cjs',
        banner: '#!/usr/bin/env node',
      },
    ],
    external,
    plugins,
  },
];
