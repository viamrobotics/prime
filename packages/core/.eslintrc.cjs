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
    'sonarjs/no-duplicate-string': 'off',
    // @todo(mp): move to js-config
    'no-undef-init': 'off',
    'unicorn/no-useless-undefined': 'off',
  },
};
