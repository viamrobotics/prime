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

<script lang="ts">
import cx from 'classnames';
import type { HTMLAttributes } from 'svelte/elements';

interface $$Props extends HTMLAttributes<HTMLElement> {
  variant?: 'primary' | 'secondary';
  class?: string;
}

/** The tab style variant */
export let variant: $$Props['variant'] = 'primary';

let className = '';
export { className as class };
</script>

<nav
  {...$$restProps}
  class={cx(
    {
      'bg-medium': variant === 'primary',
    },
    className
  )}
>
  <slot />
</nav>
