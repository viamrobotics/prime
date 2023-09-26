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
  rules: {
    // @todo(mp APP-2482): move to js-config
    'sonarjs/no-duplicate-string': 'off',
    'no-undef-init': 'off',
    'unicorn/no-useless-undefined': 'off',
  },
};
