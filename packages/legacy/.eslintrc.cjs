'use strict';

const path = require('node:path');

module.exports = {
  root: true,
  env: {
    browser: true,
  },
  parserOptions: {
    tsConfigRootDir: __dirname,
    extraFileExtensions: ['.svelte'],
    project: [
      path.join(__dirname, './tsconfig.json'),
      path.join(__dirname, './playground/tsconfig.json'),
    ],
  },
  extends: [
    /*
     * TODO(mc, 2023-04-18): pretty sure jsx-a11y and tailwindcss plugins
     * are not compatible with svelt3 plugin; investigate and maybe remove
     */
    'plugin:jsx-a11y/recommended',
    'plugin:tailwindcss/recommended',
    '@viamrobotics/eslint-config',
  ],
  plugins: ['prefer-arrow'],
  settings: {
    'import/resolver': {
      typescript: {
        extensions: ['.js', '.ts', '.svelte'],
        // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
        alwaysTryTypes: true,
        project: [
          './tsconfig.json',
          './tsconfig.node.json',
          './tests/tsconfig.json',
          './playground/tsconfig.json',
        ],
      },
    },
  },
  overrides: [
    {
      files: ['**/*.svelte'],
      parser: 'svelte-eslint-parser',
      settings: {
        'svelte/compiler-options': {
          customElement: true,
        },
      },
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
    {
      files: ['.*.@(cjs|js)', '*.@(cjs|js)', 'scripts/**/*', 'tests/**/*'],
      env: {
        node: true,
      },
    },
    {
      files: ['.*.cjs', '**/*.cjs'],
      parserOptions: {
        sourceType: 'script',
      },
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['.*.js', '*.js', 'scripts/**/*.js'],
      rules: {
        'no-console': 'off',
        'import/extensions': 'off',
      },
    },
    {
      files: ['tests/**/*'],
      rules: {
        'multiline-comment-style': 'off',
        'no-await-in-loop': 'off',
        'sonarjs/no-duplicate-string': 'off',
        'unicorn/better-regex': 'off',
      },
    },
  ],

  rules: {
    'prefer-arrow/prefer-arrow-functions': [
      'error',
      {
        disallowPrototype: true,
        singleReturnOnly: false,
        classPropertiesAllowed: false,
      },
    ],

    // TODO(mc, 2023-04-18): remove temporary overrides
    camelcase: 'warn',
    curly: 'warn',
    'id-length': [
      'warn',
      {
        exceptions: [
          '_',
          'x',
          'y',
          'z',
          'w',
          'r',
          'i',
          'j',
          'k',
          'l',
          'h',
          'a',
          'b',
        ],
      },
    ],
    'line-comment-position': 'warn',
    'multiline-comment-style': 'warn',
    'no-else-return': 'warn',
    'no-implicit-coercion': 'warn',
    'no-multi-assign': 'warn',
    'no-nested-ternary': 'warn',
    'no-plusplus': 'warn',
    'no-promise-executor-return': 'warn',
    'no-useless-concat': 'warn',
    'no-void': 'warn',
    'require-unicode-regexp': 'warn',
    'sonarjs/no-duplicate-string': 'warn',
    '@typescript-eslint/no-shadow': 'warn',
    'unicorn/switch-case-braces': 'warn',
    '@typescript-eslint/no-unnecessary-condition': 'warn',
    '@typescript-eslint/no-confusing-void-expression': 'warn',
    '@typescript-eslint/prefer-nullish-coalescing': 'warn',
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'warn',
    '@typescript-eslint/dot-notation': 'warn',
    '@typescript-eslint/consistent-type-definitions': 'warn',
    '@typescript-eslint/consistent-indexed-object-style': 'warn',
  },
};
