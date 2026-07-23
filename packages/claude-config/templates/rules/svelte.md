---
paths:
  - "**/*.svelte"
  - "**/*.svelte.ts"
  - "**/*.svelte.js"
---

# Svelte 5 Best Practices

We use Svelte 5 with runes. See the [Svelte 5 Documentation](https://svelte.dev/docs/svelte) and [Runes Guide](https://svelte.dev/docs/svelte/what-are-runes).

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

We use Svelte 5 runes throughout — no Svelte 4 syntax. See the [Svelte 5 docs](https://svelte.dev/docs/svelte).

**Component conventions:** typed `Props` interface (extend the relevant HTML attributes type when wrapping a native element); `$props()` with defaults and rest spread passed to the element; `$derived` for computed values; `{@render children?.()}` for composition. Never use `<slot>` — always snippets.

Use `$state.raw` for values without deep reactivity (large arrays replaced wholesale, Three.js class instances). Use `untrack(() => value)` to read reactive state without registering a dependency.

**Never use `$effect` to derive state** — use `$derived`. `$effect` is for side effects only (DOM mutations, subscriptions).

## Context Providers

Use `.svelte.ts` files with `getContext`/`setContext` for reactive shared state. **ALWAYS** use `Symbol` keys.

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

**Key conventions:**

- `.svelte.ts` extension for files using runes outside `.svelte` components
- `Symbol()` for context keys — prevents accidental collisions
- Return objects with **getters**, not plain properties, to preserve reactivity
- Naming: `provide*` to inject into context, `use*` or `create*` to consume

## Accessibility

- Use semantic elements and correct ARIA roles; label all interactive elements.
- Hide decorative icons with `aria-hidden="true"`.
- Use `aria-disabled` instead of `disabled` when the element must remain focusable.

## Styling

Use array/object syntax for conditional classes:

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
