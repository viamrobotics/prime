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
    project: ['./tsconfig.json'],
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
      }
    }
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
    
  ],
  rules: {
    // Eslint rules
    '@typescript-eslint/indent': ['error', 2],
    'array-bracket-spacing': 'error',
    'array-callback-return': 'error',
    'arrow-spacing': 'error',
    'block-spacing': 'error',
    'brace-style': 'error',
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'never',
        functions: 'never',
      },
    ],
    'comma-spacing': 'error',
    'computed-property-spacing': 'error',
    'dot-notation': 'error',
    'eol-last': 'error',
    eqeqeq: [
      'error',
      'always',
      {
        null: 'always',
      },
    ],
    'func-call-spacing': 'error',
    'key-spacing': 'error',
    'keyword-spacing': 'error',
    'no-caller': 'error',
    'no-multi-spaces': 'error',
    // https://github.com/sveltejs/eslint-plugin-svelte3/issues/41
    'no-multiple-empty-lines': 'off',
    'no-multi-spaces': 'error',
    'no-param-reassign': 'error',
    'no-return-await': 'error',
    'no-unreachable-loop': 'error',
    'no-unsafe-optional-chaining': 'error',
    'nonblock-statement-body-position': 'error',
    'object-curly-spacing': ['error', 'always'],
    'one-var': [
      'error',
      {
        let: 'never',
        const: 'never',
      },
    ],
    quotes: ['error', 'single', { avoidEscape: true }],
    'require-atomic-updates': 'error',
    'rest-spread-spacing': 'error',
    semi: ['error', 'always'],
    'semi-spacing': 'error',
    'semi-style': 'error',
    'space-before-blocks': 'error',
    'space-in-parens': 'error',
    'space-infix-ops': 'error',
    'space-unary-ops': 'error',
    'spaced-comment': 'error',
    'template-curly-spacing': 'error',
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

    // Unicorn rules
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
    'unicorn/prefer-top-level-await': 'off',

    // Tailwind
    'tailwindcss/no-custom-classname': 'off',

    // Typescript
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-non-null-assertion': 'off',

    // Sonar
    'sonarjs/no-duplicate-string': 'off',

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
    'import/extensions': ["error", "never", { "svelte": "always" }],
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
        project: './tsconfig.json',
      },
    },
    'svelte3/typescript': () => require('typescript'),
  },
  ignorePatterns: ['**/cypress/**', '**/node_modules/**', '*.json'],
}
