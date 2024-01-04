'use strict';

/** @type {import('node:path')} */
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
  rules: {
    // TODO(mc, 2023-12-15): remove overrides, fix issues
    '@typescript-eslint/no-non-null-assertion': 'warn',
    // TODO(mc, 2024-01-03): move to base config?
    'multiline-comment-style': 'off',
  },
  overrides: [
    {
      files: 'src/routes/**/*',
      rules: {
        'no-console': 'off',
        'sonarjs/no-duplicate-string': 'off',
      },
    },
    {
      files: ['.eslintrc.cjs', '.prettierrc.cjs'],
      rules: {
        '@typescript-eslint/no-unsafe-assignment': 'off',
      },
    },
    // TODO(mc, 2024-01-03): remove when no-non-null-assertion errors fixed
    {
      files: ['**/__tests__/**'],
      rules: {
        '@typescript-eslint/no-non-null-assertion': 'off',
      },
    },
  ],
};
