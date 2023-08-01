# `@viamrobotics/prime-blocks`

## Getting started

`@viamrobotics/prime-blocks` is a collection of Svelte components that host more complex behaviors than `prime-core`. These components may be able to do many things, but are able to be self-contained to a single component with the intention of being dropped into any environment easily. If `prime-core` is on the atoms / molecules side of atomic design then `prime-blocks` is on the organisms side.

## Installation

Add PRIME blocks using your package manager of choice:

```
pnpm add --save-dev @viamrobotics/prime-blocks
```

Additionally, `@viamrobotics/prime-core` must be installed, and all of its installation steps must be followed.

Import the stylesheet. If you are using [SvelteKit][https://kit.svelte.dev/], you can do this in `src/routes/+layout.svelte`.

```js
import '@viamrobotics/prime-blocks/prime.css';
```

You can now use the components in your app:

```html
<script lang="ts">
  import { SlamMap } from '@viamrobotics/prime-blocks';
</script>

<SlamMap {cloud} />
```

[tailwind]: https://tailwindcss.com/
[sveltekit]: https://kit.svelte.dev/

## Playground

The playground can be used during development but is not used outside of the package.

```bash
pnpm install
pnpm -C packages/blocks dev
```

## Linting

To lint and typecheck:

```bash
pnpm -C packages/blocks check        # check svelte and lint
pnpm -C packages/blocks check-svelte # check svelte only
pnpm -C packages/blocks check-lint   # check lint only with prettier and eslint
pnpm -C packages/blocks format       # format with prettier
```

## Testing

To test with [vitest][https://vitest.dev/]:

```bash
pnpm -C packages/blocks test        # run once
pnpm -C packages/blocks test:watch  # watch tests
```

[vitest]: https://vitest.dev/
