# Storybook

This package uses [Storybook][] to demonstrate P.R.I.M.E. component usage. The page is served at [prime.viam.com][].

[storybook]: https://storybook.js.org/
[prime.viam.com]: https://prime.viam.com

## Running

First, build the other packages for use in storybook:

```
pnpm -r build
```

**NOTE:** Storybook does not have the hot reloading feature. You must rebuild the package using the above command every time there is a change.

Then run the storybook:

```
pnpm -C packages/storybook storybook
```

## Linting

To lint and typecheck:

```bash
pnpm -C packages/storybook check
pnpm -C packages/storybook format
```
