'use strict';

module.exports = {
  root: true,
  extends: ['@viamrobotics/eslint-config/svelte'],
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  env: {
    browser: true,
    node: true,
  },
  rules: {
    // @todo(mp APP-2482): move to js-config
    'sonarjs/no-empty-collection': 'off',
    'sonarjs/no-duplicate-string': 'off',
    'no-undef-init': 'off',
    'unicorn/no-useless-undefined': 'off',
  },
};
