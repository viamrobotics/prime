---
paths:
  - '**/*.test.ts'
  - '**/*.test.mts'
  - '**/*.spec.ts'
  - '**/*.spec.mts'
  - '**/vitest.config.ts'
---

# Testing — Svelte

Runner setup for testing Svelte 5 components and `.svelte.ts` reactive modules. See
`testing.md` for the runner-agnostic rules on placement, structure, and naming that this
guide assumes, and `svelte.md` for authoring conventions, which this guide does not repeat.

## Rule — follow without deliberation

- **Pick the renderer for the environment and the environment for what the assertion
  reads.** `@testing-library/svelte` under `jsdom` or `happy-dom` with `svelteTesting()`
  covers DOM structure, roles, text, focus, and events, and calls `flushSync` on render,
  event, rerender, and unmount. After a state change the test makes itself, `await tick()`
  or `flushSync()` before querying. `vitest-browser-svelte` under browser mode
  (`@vitest/browser-playwright`, Vitest 4+) is for assertions that read layout, paint,
  scroll, or pointer geometry, which jsdom returns as zeros. Rune code outside a component
  runs in a `.svelte.test.ts` file inside `$effect.root` with `flushSync()` after each
  state change and `cleanup()` at the end.
- **Query by role first, by test id last.** `getByRole` for just about everything,
  `getByTestId` only where no user-visible handle exists. `getByRole` throws on absence, so
  a `toBeDefined()` on its result asserts nothing.
- **Two-way bindings, context, and snippet props go through a harness component.** Write a
  wrapper `.svelte` in `test/` that provides the context or registers the effect, and
  interact with that.
- **Split the Vitest config into three projects: `client`, `ssr`, and `server`.** One merged
  config forces every test to run under a single environment, so a component test that only
  passes because it never actually mounted in a browser sits next to a server test that
  never needed a DOM at all. Each project targets what it is actually testing:
  - `client`: components rendered and interacted with, under jsdom with `svelteTesting()`
    or under browser mode per the renderer clause.
  - `ssr`: only when the app renders on the server. A SvelteKit app with
    `export const ssr = false` in its root layout has no server-rendered HTML to test and
    omits this project. Where present, it renders the server-rendered HTML string a
    component produces, via Svelte's `render` from the `/server` entry point. Catches a
    component that throws or reads `window` when it runs where there is no `window`.
  - `server`: plain modules with no Svelte compilation, such as a data-loading function or
    a `.ts` utility.

## Checked mechanically

`test-config.mjs` catches a Svelte vitest config missing the `client` or `server`
project. `ssr` is required only when the app renders on the server, and the check runs
only when this guide is installed. Pass the root `+layout.ts` to `test-config.mjs` so it
can see `export const ssr = false` and skip requiring `ssr`. Whether a given test belongs
under browser mode or jsdom is still a human read.

## Example — a `vitest.config.ts` with a `client` project

Verified against Vitest 4.1: the merged `vitest.workspace.ts` file is gone, and
`test.projects` on a single config takes its place. Browser mode's provider is its own
package, `@vitest/browser-playwright` here rather than the old `@vitest/browser`. This
app has no server rendering, so its `+layout.ts` sets `export const ssr = false` and the
config below omits the `ssr` project.

```ts
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { svelteTesting } from '@testing-library/svelte/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    projects: [
      {
        extends: true,
        plugins: [svelte(), svelteTesting()],
        test: {
          name: 'client',
          include: ['src/**/*.svelte.{test,spec}.ts'],
          environment: 'jsdom',
        },
      },
      {
        extends: true,
        test: {
          name: 'server',
          include: ['src/**/*.{test,spec}.ts'],
          exclude: ['src/**/*.svelte.{test,spec}.ts'],
          environment: 'node',
        },
      },
    ],
  },
});
```

The `svelteTesting()` plugin comes from `@testing-library/svelte/vite` and runs
`cleanup()` after each test automatically. `extends: true` pulls in the shared root
config, `plugins` and `resolve` in particular, so each project only states what makes it
different. Name a test file for the project it belongs to (`*.svelte.test.ts` for
`client`) so `include` can route it without a human sorting it by hand.

**Alternative — `client` under browser mode**, for assertions that read layout, paint,
scroll, or pointer geometry:

```ts
{
  extends: true,
  plugins: [svelte()],
  test: {
    name: 'client',
    include: ['src/**/*.svelte.{test,spec}.ts'],
    browser: {
      enabled: true,
      provider: 'playwright',
      instances: [{ browser: 'chromium' }],
    },
  },
},
```
