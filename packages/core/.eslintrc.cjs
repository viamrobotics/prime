'use strict';

const path = require('node:path');

module.exports = {
  root: true,
  extends: ['@viamrobotics/eslint-config/svelte'],
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  settings: {
    tailwindcss: {
      config: path.join(__dirname, 'tailwind.config.ts'),
    },
  },
  env: {
    browser: true,
    node: true,
  },
  overrides: [
    {
      files: 'src/routes/**/*',
      rules: {
        'no-console': 'off',
        'sonarjs/no-duplicate-string': 'off',
      },
    },
  ],
};
