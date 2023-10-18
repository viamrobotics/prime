# `@viamrobotics/prime-core`

## Getting started

`@viamrobotics/prime-core` is a collection of core Svelte components.

## Installation

Add PRIME core using your package manager of choice:

```
pnpm add --save-dev @viamrobotics/prime-core
```

Install [Tailwind][]. In the `tailwind.config.js`, add the components to the content and include the theme:

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

Import the stylesheet. If you are using [SvelteKit][], you can do this in `src/routes/+layout.svelte`.

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

To test with [vitest][]:

```bash
pnpm -C packages/core test        # run once
pnpm -C packages/core test:watch  # watch tests
```

[vitest]: https://vitest.dev/

## Anatomy of a Component

For easier readability, we try to use a standard ordering for component composition. These are not strict rules, but more a guideline to follow. Implementation specifics may force you to go outside this guideline.

```html
<!-- svelte options: https://svelte.dev/docs/special-elements#svelte-options -->
<svelte:options immutable />

<script
  lang="ts"
  context="module"
>
  // exported types
  export type MyType = 'thing' | 'other-thing';
</script>

<script lang="ts">
  // external imports
  import { onMount, createEventDispatcher } from 'svelte';

  // internal imports
  import { someLibraryFunction } from '$lib';
  import { someSiblingFunction } from './sibling';

  // prop declarations
  /** A doc string for prop explaining what it does. */
  export let prop: MyType | undefined = undefined;

  // event dispatchers and other hooks
  const dispatcher = createEventDispatcher<{
    /** A doc string for the event handler. */
    click: null; // void event
    /** A doc string for the event handler. */
    primitive: string | number | boolean; // simple primitive values
    /** A doc string for the event handler. */
    object: { id: string; next: number; }; // complex values
    /** A doc string for the event handler. */
    native: Event // native events (for pure atoms)
  }>()

  // internal fields
  let someString = '';

  // reactive variables
  $: isThing = prop === 'thing';

  // complex reactive variables
  let counter = 0;
  $: if (isThing) {
      counter = someString.length;
      if (counter > 10) {
        counter = 10;
      }
  }

  // single-line functions
  const doSomething = () => someLibraryFunction();

  // multi-line functions
  const doSomethingElse = () => {
    const shouldDoSomething = someString !== '';
    someSiblingFunction(shouldDoSomething);
  }

  // reactive statements
  $: {
    someString = prop ? 'whoa' : 'no';
  }

  // lifecycle hooks
  onMount(() => ...);
</script>

<!-- Your layout -->
<div class="border-black">
  <!-- 
    all slots should be named if there are multiple; otherwise a single slot 
    can be the default `<slot />`  
  -->
  <slot name="title" />
  <slot name="content" />
</div>

<style>
  /* custom styles */
</style>
```

## Tests and Test Components

We keep tests in a `__tests__` directory that is a sibling of the code being tested. These directories should only contain tests and test components.

Some components require test components to render slotted children, due to limitations with rendering slots using `@testing-library`.

  See:
  - https://sveltesociety.dev/recipes/testing-and-debugging/unit-testing-svelte-component
  - https://github.com/testing-library/svelte-testing-library/issues/48