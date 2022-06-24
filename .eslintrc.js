module.exports = {
  root: true,
  env: {
    browser: true,
    jasmine: true,
    es2021: true,
    node: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsConfigRootDir: __dirname,
    project: './tsconfig.json',
    extraFileExtensions: ['.svelte'],
  },
  plugins: [
    'svelte3',
    '@typescript-eslint',
    'unicorn',
    'import',
    'jsx-a11y',
    'sonarjs',
    'prefer-arrow',
    'jest-dom',
  ],
  overrides: [
    {
      files: ['*.wc.svelte'],
      processor: 'svelte3/svelte3',
      settings: {
        'svelte3/compiler-options': {
          customElement: true,
        },
      }
    }, {
      files: ['*.stories.svelte'],
      processor: 'svelte3/svelte3',
      parser: 'espree',
    }
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:jsx-a11y/recommended',
    'plugin:unicorn/recommended',
    'plugin:sonarjs/recommended',
    'plugin:jest-dom/recommended',
    'eslint:recommended',
  ],
  rules: {
    'one-var': [
      'error',
      {
        let: 'never',
        const: 'never',
      },
    ],
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'never'],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'never',
        exports: 'never',
        functions: 'never',
      },
    ],
    eqeqeq: [
      'error',
      'always',
      {
        null: 'always',
      },
    ],
    'no-unreachable-loop': 'error',
    'no-unsafe-optional-chaining': 'error',
    'require-atomic-updates': 'error',
    'array-callback-return': 'error',
    'no-caller': 'error',
    'no-multi-spaces': 'error',
    'no-param-reassign': 'error',
    'no-return-await': 'error',
    radix: 'error',
    'require-await': 'error',
    strict: 'error',
    yoda: 'error',
    'no-var': 'error',
    'object-shorthand': ['error', 'properties'],
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'prefer-template': 'error',
    'require-await': 'error',

    'prefer-arrow/prefer-arrow-functions': [
      'error',
      {
        disallowPrototype: true,
        singleReturnOnly: false,
        classPropertiesAllowed: false,
      },
    ],

    // Unicorn
    'unicorn/no-unsafe-regex': 'error',
    'unicorn/no-unused-properties': 'error',
    'unicorn/custom-error-definition': 'error',
    'unicorn/import-index': 'error',
    'unicorn/import-style': 'error',
    'unicorn/prefer-string-replace-all': 'error',
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

    // Typescript
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-non-null-assertion': 'off',

    // Sonar
    'sonarjs/no-duplicate-string': 'off',

    // Import
    'import/no-unresolved': 'error',
    'import/named': 'error',
    'import/default': 'error',
    'import/namespace': 'error',
    'import/no-absolute-path': 'error',
    'import/no-webpack-loader-syntax': 'error',
    'import/no-self-import': 'error',
    'import/no-cycle': 'error',
    'import/no-useless-path-segments': 'error',
    'import/export': 'error',
    'import/extensions': ['error', 'never'],
    'import/first': 'error',

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
        // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
    'svelte3/typescript': true
  },
}
