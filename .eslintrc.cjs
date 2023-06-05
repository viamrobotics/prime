'use strict';

module.exports = {
  root: true,
  env: {
    browser: true,
  },
  parserOptions: {
    tsConfigRootDir: __dirname,
    extraFileExtensions: ['.svelte'],
    project: ['./tsconfig.json', './playground/tsconfig.json'],
  },
  extends: [
    /*
     * TODO(mc, 2023-04-18): pretty sure jsx-a11y and tailwindcss plugins
     * are not compatible with svelt3 plugin; investigate and maybe remove
     */
    'plugin:jsx-a11y/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:storybook/recommended',
    '@viamrobotics/eslint-config',
  ],
  plugins: ['svelte3', 'prefer-arrow'],
  settings: {
    'svelte3/compiler-options': {
      customElement: false,
    },
    'svelte3/typescript': true,
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
      processor: 'svelte3/svelte3',
      settings: {
        'svelte3/compiler-options': {
          customElement: true,
        },
      },
      rules: {
        // this rule doesn't play nicely with passing values to svelte props
        'sonarjs/no-ignored-return': 'off',
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
        'import/extensions': ['error', 'ignorePackages'],
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
  },
};
