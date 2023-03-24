'use strict';

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsConfigRootDir: __dirname,
    extraFileExtensions: ['.svelte'],
    project: [
      './tsconfig.json',
      './tsconfig.node.json',
      './tests/tsconfig.json',
      './playground/tsconfig.json',
    ],
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'svelte3',
    '@typescript-eslint',
    'unicorn',
    'import',
    'jsx-a11y',
    'sonarjs',
    'prefer-arrow',
    'tailwindcss',
  ],
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
      settings: {
        'svelte3/compiler-options': {
          customElement: true,
        },
      },
    },
    {
      files: ['tests/**/*'],
      rules: {
        // TODO(mc, 2023-03-23): the following warnings should be fixed
        // removing them from this override will default them back to `error`
        'unicorn/no-await-expression-member': 'warn',
        'unicorn/no-for-loop': 'warn',
        'unicorn/prefer-number-properties': 'warn',
        'unicorn/prefer-string-slice': 'warn',
        'prefer-const': 'warn',
        'prefer-template': 'warn',
        radix: 'warn',
        'require-await': 'warn',
      },
    },
    {
      files: ['.*.cjs', '**/*.cjs'],
      parserOptions: {
        sourceType: 'script',
      },
      env: {
        node: true,
      },
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:unicorn/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:sonarjs/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:storybook/recommended',
    'prettier',
  ],
  rules: {
    // Eslint rules
    'array-callback-return': 'error',
    eqeqeq: ['error', 'always', { null: 'always' }],
    'no-caller': 'error',
    'no-param-reassign': 'error',
    'no-return-await': 'error',
    'no-unreachable-loop': 'error',
    'no-unsafe-optional-chaining': 'error',
    'nonblock-statement-body-position': 'error',
    'one-var': ['error', { let: 'never', const: 'never' }],
    'require-atomic-updates': 'error',
    'spaced-comment': ['error', 'always', { markers: ['/'] }],
    radix: 'error',
    'require-await': 'error',
    strict: 'error',
    yoda: 'error',
    'no-var': 'error',
    'object-shorthand': ['error', 'properties'],
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'prefer-template': 'error',
    'prefer-arrow/prefer-arrow-functions': [
      'error',
      {
        disallowPrototype: true,
        singleReturnOnly: false,
        classPropertiesAllowed: false,
      },
    ],
    // Unicorn rules
    'unicorn/switch-case-braces': 'off',
    'unicorn/no-unsafe-regex': 'error',
    'unicorn/no-unused-properties': 'error',
    'unicorn/custom-error-definition': 'error',
    'unicorn/import-index': 'error',
    'unicorn/import-style': 'error',
    // TODO(mc, 2023-03-23): fix errors in playground and set to error
    'unicorn/prefer-string-replace-all': 'warn',
    'unicorn/string-content': 'error',

    // @TODO: switch to error once safari supports these:
    // https://caniuse.com/?search=array.prototype.at
    'unicorn/prefer-at': 'off',
    // https://caniuse.com/?search=object.hasOwn
    'unicorn/prefer-object-has-own': 'off',

    'unicorn/prevent-abbreviations': 'off',
    'unicorn/filename-case': 'off',
    'unicorn/no-null': 'off',
    'unicorn/consistent-destructuring': 'off',
    'unicorn/prefer-top-level-await': 'off',

    // Tailwind
    'tailwindcss/no-custom-classname': 'off',

    // Typescript
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/dot-notation': 'error',

    // Sonar
    'sonarjs/no-duplicate-string': 'off',
    'sonarjs/cognitive-complexity': ['error', 18],

    // Import
    'import/no-unresolved': 'error',
    'import/named': 'off',
    'import/default': 'error',
    'import/namespace': 'error',
    'import/no-absolute-path': 'error',
    'import/no-webpack-loader-syntax': 'error',
    'import/no-self-import': 'error',
    'import/no-cycle': 'error',
    'import/no-useless-path-segments': 'error',
    'import/export': 'error',
    'import/extensions': [
      'error',
      'never',
      { svelte: 'always', json: 'always' },
    ],
    // Do not currently work with eslint-plugin-svelte
    'import/first': 'off',
    'import/order': 'error',

    // Svelte
    'svelte3/missing-custom-element-compile-options': 'off',
    'missing-custom-element-compile-options': 'off',
  },
  settings: {
    'svelte3/compiler-options': {
      customElement: false,
    },
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
    'svelte3/typescript': () => require('typescript'),
  },
};
