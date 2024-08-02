<!--
@component

A nav container with optional variant: 'primary' | 'secondary'

```svelte
<TabsBar variant='secondary'>
  <Tab
    title='The first tab'
    href="#first"
    isSelected='true' 
  />
  <Tab
    title='The second tab'
    href="#second"
    isSelected='false' 
  />
  <Tab
    title='The third tab'
    href="#third"
    isSelected='false' 
  />
</TabsBar>
```
-->
<svelte:options immutable />

<script context="module">
export const CONTEXT_KEY = Symbol('tabs-bar-context');
</script>

<script lang="ts">
import { setContext } from 'svelte';
import cx from 'classnames';
import type { HTMLAttributes } from 'svelte/elements';
import { writable } from 'svelte/store';

interface $$Props extends HTMLAttributes<HTMLElement> {
  variant?: 'primary' | 'secondary';
  class?: string;
}

/** The tab style variant */
export let variant: $$Props['variant'] = 'primary';

const context = writable<$$Props['variant']>(variant);
$: context.set(variant);

setContext(CONTEXT_KEY, context);

let className = '';
export { className as class };
</script>

<nav
  {...$$restProps}
  class={cx(
    {
      'h-10 bg-medium tracking-wide sm:px-2': variant === 'primary',
    },
    className,
    'flex items-center font-roboto-mono'
  )}
>
  <slot />
</nav>
