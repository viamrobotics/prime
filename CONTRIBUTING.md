# Contributing to P.R.I.M.E

Please follow these instructions for contributing to `PRIME`.

## Getting started

To run the `Storybook` page locally, pull down the project and run:

```basha
npm install
npm run storybook
```

## Playground

To use the Vue playground

```bash
npm start
```

Then navigate to [http://localhost:5173/playground/index.html](http://localhost:5173/playground/index.html)

More detailed docs exist on [the storybook](https://www.viam.com/prime).

## Creating a component

1. Create a new component directory and index.svelte file in `/elements`
2. Create a new `[component].stories.mdx` file in `/stories`
3. Import the component in `main.ts`
4. Import the `addStyles()` helper in `lib/` to the component to add the shared component stylesheet

### Further Reading

Linked below are some articles that provide knowledge for how to best build reusable, generic web components.

- [Custom Elements Best Practices](https://web.dev/custom-elements-best-practices/)
