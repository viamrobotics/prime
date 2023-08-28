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
    'sonarjs/no-duplicate-string': 'off',
    'no-undef-init': 'off',
    'unicorn/no-useless-undefined': 'off',
  },
  overrides: [
    {
      files: '*.svelte',
      rules: {
        /*
         * TODO(mc, 2023-08-28): this rule is crashing with svelte actions.
         * Investigate and fix once lint dependencies are updated.
         */
        'sonarjs/no-unused-collection': 'off',
      },
    },
  ],
};
