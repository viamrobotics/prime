---
paths:
  - "**/*.svelte"
  - "**/*.svelte.ts"
  - "**/*.svelte.js"
---

# Svelte 5 Best Practices

Svelte 5 with runes throughout. No Svelte 4 syntax. See the [Svelte 5 docs](https://svelte.dev/docs/svelte) and [Runes Guide](https://svelte.dev/docs/svelte/what-are-runes).

## Svelte MCP Server

When the `svelte` MCP server is available, use it instead of recalling API details:

- `svelte-autofixer`: **required** on any Svelte code you write, before handing it over. Re-run until it reports no issues.
- `list-sections`, then `get-documentation`: when a Svelte or SvelteKit API is uncertain. Fetch only the sections whose `use_cases` match the task.

## Component Structure

```svelte
<script lang="ts">
import type { HTMLButtonAttributes } from 'svelte/elements';

interface Props extends HTMLButtonAttributes {
  /** Visual variant */
  variant?: 'primary' | 'secondary' | 'danger';
}

const {
  variant = 'primary',
  disabled = false,
  children,
  ...restProps
}: Props = $props();
const classes = $derived(['btn', `btn-${variant}`, disabled && 'btn-disabled']);
</script>

<button
  {...restProps}
  aria-disabled={disabled || undefined}
  class={classes}
>
  {@render children?.()}
</button>
```

- Typed `Props` interface, extending the relevant HTML attributes type when wrapping a native element.
- `$props()` with defaults and a rest spread onto the element.
- `$derived` for computed values. **Never derive state in an `$effect`.** `$effect` is for side effects only: DOM mutations, subscriptions.
- `{@render children?.()}` for composition. Never `<slot>`, always snippets.
- `$state.raw` for values that need no deep reactivity (large arrays replaced wholesale, Three.js class instances). `untrack(() => value)` to read reactive state without taking a dependency.

## Doc Comments

`code-comments.md` decides _whether_ to comment. These are the Svelte shapes.

- `/** */` on each `Props` member that is not self-evident. Props are the component's public API and editors show these on hover.
- `<!-- @component -->` at the top of a `.svelte` file when the component needs file-level docs.
- A non-obvious rune choice carries its reason inline, because the alternative looks equivalent: `$state.raw` over `$state`, `untrack` around a read, an `$effect` that could be mistaken for derived state.

## Context Providers

Reactive shared state lives in `.svelte.ts` files using `getContext` and `setContext`. **ALWAYS** use `Symbol` keys.

```typescript
// theme-context.svelte.ts
import { getContext, setContext } from "svelte";

const key = Symbol("theme");

interface ThemeContext {
  readonly current: "light" | "dark";
  toggle: () => void;
}

export const provideTheme = () => {
  let theme = $state<"light" | "dark">("light");
  const context: ThemeContext = {
    get current() {
      return theme;
    },
    toggle: () => {
      theme = theme === "light" ? "dark" : "light";
    },
  };
  setContext(key, context);
  return context;
};

export const useTheme = (): ThemeContext => getContext(key);
```

- `.svelte.ts` for any file using runes outside a `.svelte` component.
- `Symbol()` keys prevent collisions.
- Return **getters**, not plain properties, to preserve reactivity.
- Name `provide*` to inject, `use*` or `create*` to consume.

## Accessibility

- Semantic elements and correct ARIA roles. Label every interactive element.
- `aria-hidden="true"` on decorative icons.
- `aria-disabled` instead of `disabled` when the element must stay focusable.

## Styling

Array and object syntax for conditional classes:

```svelte
<button class={[
  'inline-flex items-center font-medium rounded',
  { 'bg-blue-600': variant === 'primary', 'bg-red-600': variant === 'danger' },
  disabled && 'opacity-50 cursor-not-allowed',
]}>
```

## Verify Your Work

```
pnpm check    # svelte-check across the workspace
pnpm lint     # prettier + eslint
```
