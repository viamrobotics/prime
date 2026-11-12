---
paths:
  - "**/*.svelte"
  - "**/*.svelte.ts"
  - "**/*.svelte.js"
---

# Svelte 5 Best Practices

Svelte 5 with runes throughout. No Svelte 4 syntax: never `export let`, never a `$:`
reactive statement, never `on:click` or another `on:`-prefixed directive. See the
[Svelte 5 docs](https://svelte.dev/docs/svelte) and the
[Runes Guide](https://svelte.dev/docs/svelte/what-are-runes).

## Svelte MCP Server

When the `svelte-mcp` module is installed, a Svelte MCP server is available. Use it instead
of recalling API details:

- `svelte-autofixer`: **required** on any Svelte code you write, before handing it over.
  Re-run until it reports no issues.
- An agent whose tool set lacks it, such as an `/orchestrate` worker, says so in its report
  instead of skipping the step, and a repo grants it to workers through
  `orchestrate.workerTools` in `.claude/houserules.config.json`.
- `list-sections`, then `get-documentation`: when a Svelte or SvelteKit API is uncertain.
  Fetch only the sections whose `use_cases` match the task.

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

- Typed `Props` interface, extending the relevant HTML attributes type when wrapping a
  native element.
- `$props()` with defaults and a rest spread onto the element.
- `$derived` for computed values. **Never derive state in an `$effect`.** `$effect` is for
  side effects only: DOM mutations, subscriptions.
- `{@render children?.()}` for composition. Never `<slot>`, always snippets.
- `$state.raw` for values that need no deep reactivity, such as a large array or buffer
  replaced wholesale, or a class instance the framework should not proxy. `untrack(() =>
value)` to read reactive state without taking a dependency.
- `$bindable()` on a prop the parent binds to with `bind:`. Default it, and document why the
  binding exists if the reason is not obvious from the prop name.
- Never touch `window` or `document` at module scope. That code runs on the server too,
  where those globals do not exist.

## Context Providers

Reactive shared state lives in `.svelte.ts` files using `getContext` and `setContext`.
Use `Symbol` keys, so two contexts can never collide. Never declare `$state` at module scope
here: on the server it is one instance shared across every request and user, so create it
inside `provide*` instead.

```typescript
// theme-context.svelte.ts
import { getContext, setContext } from 'svelte';

const key = Symbol('theme');

interface ThemeContext {
  readonly current: 'light' | 'dark';
  toggle: () => void;
}

export const provideTheme = () => {
  let theme = $state<'light' | 'dark'>('light');
  const context: ThemeContext = {
    get current() {
      return theme;
    },
    toggle: () => {
      theme = theme === 'light' ? 'dark' : 'light';
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

## Lifecycle

- **Never call `onDestroy` in a `.svelte` component.** Subscribe inside `$effect` and return
  the unsubscribe as the teardown. Setup and teardown then live in one rune, so neither moves
  without the other.
- **`onDestroy` fires only when the component unmounts.** A subscription whose inputs changed
  keeps running against the old ones. A function returned from `$effect` also runs before each
  re-run, so the subscription follows its inputs.
- **Exception:** `onDestroy` in a `.svelte.ts` composable is allowed when it releases
  something the composable registered against a context that outlives it.
- Convert a legacy `onDestroy` call when you are already editing that component, not as a
  sweep.

```svelte
<script lang="ts">
import { bus } from './bus';
import { onDestroy } from 'svelte';

const { topic }: { topic: string } = $props();

// WRONG: the subscription never follows `topic`.
const unsubscribe = bus.subscribe(topic, handle);
onDestroy(unsubscribe);

// RIGHT: teardown runs before each re-run and on destroy.
$effect(() => bus.subscribe(topic, handle));
</script>
```

## Styling

Array and object syntax for conditional classes, which is Svelte's own idiom rather than a
string template:

```svelte
<button class={[
  'inline-flex items-center font-medium rounded',
  { 'bg-blue-600': variant === 'primary', 'bg-red-600': variant === 'danger' },
  disabled && 'opacity-50 cursor-not-allowed',
]}>
```

## ESLint Configuration

- **Enable `svelte/valid-compile`.** `eslint-plugin-svelte`'s recommended config leaves it
  off. Turning it on fails the lint on any warning the Svelte compiler emits: an unused
  CSS selector, a duplicate `style:` directive, a store used outside a component, and
  more, not only the `a11y_` warnings `accessibility-svelte.md` already covers.
- **Enable `svelte/no-unused-svelte-ignore`.** It is already part of the recommended
  config, but state it explicitly if this repo builds its ESLint config from `svelte/base`
  instead. It flags a `<!-- svelte-ignore some_warning -->` comment whose warning the
  compiler no longer produces, so a stale suppression fails the lint instead of sitting
  unnoticed on markup that has since been fixed.

```js
// eslint.config.js
import svelte from 'eslint-plugin-svelte';

export default [
  ...svelte.configs.recommended,
  {
    files: ['**/*.svelte'],
    rules: {
      'svelte/valid-compile': 'error',
      'svelte/no-unused-svelte-ignore': 'error',
    },
  },
];
```

## Checked mechanically

`.claude/scripts/svelte-lint.mjs`, where installed, flags a bare `<slot>` element and, when
this repo's ESLint config imports `eslint-plugin-svelte`, an `svelte/valid-compile` or
`svelte/no-unused-svelte-ignore` rule that is not enabled. It also flags `onDestroy(` in a
file ending in `.svelte`, outside HTML comments, as `svelte/no-on-destroy-in-component`. A
`.svelte.ts` composable is allowed by path alone, and `onDestroy` inside a string or a `//`
comment within `<script>` is not caught. Run it with
`node .claude/scripts/svelte-lint.mjs <files>`. It has never run against a real corpus, only
paired fixtures, so treat a finding as a starting point and report a false positive rather than
working around it.

## Where other rules apply

- Type-system decisions, such as `interface` versus `type` and never `any`: see
  `typescript.md` if that rule is installed.
- Whether a comment should exist, and what form it takes: see `code-comments.md` if that
  rule is installed.
- Naming, function size, and dead code: see `code-cleanliness.md` if that rule is installed.
- How a sentence in a comment or doc reads: see `prose-voice.md` if that rule is installed.
- ARIA, semantics, and the `a11y_` compiler warnings: see `accessibility-svelte.md` if that
  rule is installed.
