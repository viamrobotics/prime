# `@viamrobotics/prime-core`

## Getting started

`@viamrobotics/prime-core` is a collection of core Svelte components.

## Installation

Add PRIME core using your package manager of choice:

```
pnpm add --save-dev @viamrobotics/prime-core
```

Install [Tailwind][https://tailwindcss.com/]. In the `tailwind.config.js`, add the components to the content and include the theme:

```js
import { theme } from '@viamrobotics/prime-core/theme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/@viamrobotics/prime-core/**/*.{ts,svelte}',
  ],
  theme,
  plugins: [],
};
```

Import the stylesheet. If you are using [SvelteKit][https://kit.svelte.dev/], you can do this in `src/routes/+layout.svelte`.

```js
import '@viamrobotics/prime-core/prime.css';
```

You can now use the components in your app:

```html
<script lang="ts">
  import { Badge } from '@viamrobotics/prime-core';
</script>

<Badge
  variant="green"
  label="Active"
/>
```

[tailwind]: https://tailwindcss.com/
[sveltekit]: https://kit.svelte.dev/

## Playground

The playground can be used during development but is not used outside of the package.

```bash
pnpm install
pnpm -C packages/core dev
```

## Linting

To lint and typecheck:

```bash
pnpm -C packages/core check        # check svelte and lint
pnpm -C packages/core check-svelte # check svelte only
pnpm -C packages/core check-lint   # check lint only with prettier and eslint
pnpm -C packages/core format       # format with prettier
```

## Testing

To test with [vitest][https://vitest.dev/]:

```bash
pnpm -C packages/core test        # run once
pnpm -C packages/core test:watch  # watch tests
```

[vitest]: https://vitest.dev/
