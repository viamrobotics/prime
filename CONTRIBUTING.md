# Contributing to P.R.I.M.E

Please follow these instructions for contributing to `PRIME`.

## Getting started

To run the `Storybook` page locally, pull down the project and run:

```bash
pnpm install
pnpm run storybook
```

More detailed docs exist on [the storybook](https://prime.viam.com).

## Playground

To use the component playground, run:

```bash
pnpm start
```

The playground will open in your browser automatically. End-to-end tests run against the playground.

## Creating a component

1. Create a new component directory and index.svelte file in `/elements`
2. Create a new `[component].stories.mdx` file in `/stories`
3. Import the component in `main.ts`
4. Import the `addStyles()` helper in `lib/` to the component to add the shared component stylesheet

### Further Reading

Linked below are some articles that provide knowledge for how to best build reusable, generic web components.

- [Custom Elements Best Practices](https://web.dev/custom-elements-best-practices/)

## Development tasks

To verify that static assets build correctly:

```shell
pnpm run build
```

You can typecheck and lint using:

```shell
# check linting, types, a11y, and other component quality
pnpm run check

# autoformat code and other files
pnpm run format
```

### Tests

To run tests locally:

```shell
# set up playground
npx playwright install --with-deps

# run tests, with optional debugging
pnpm run test
pnpm run test-dev
```

When adding a test, look for the following files:

- `tests/${component}.spec.ts`
- `playground/${component}-test.html`

If any of the files do not exist, create them by copying an already existing test.

New component functionality should always be accompanied by new tests for that functionality. Add tests by adding new instances of the component to the `.html` file and querying the page via playright in the `.spec.ts` file.
