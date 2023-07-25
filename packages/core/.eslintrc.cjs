'use strict';

const path = require('node:path');

module.exports = {
  root: true,
  extends: ['@viamrobotics/eslint-config/svelte'],
  parserOptions: {
    project: [path.join(__dirname, './tsconfig.json')],
  },
  env: {
    browser: true,
    node: true,
  },
};
