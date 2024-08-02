<!--
@component

A clickable element that allows the user to navigate to another page or area.

```svelte
  <Tab
    title='The first tab'
    href="#first"
    selected
  />
```
-->
<svelte:options immutable />

<script lang="ts">
import cx from 'classnames';
import type { HTMLAttributes } from 'svelte/elements';

interface $$Props extends HTMLAttributes<HTMLElement> {
  href: string;
  title: string;
  selected?: boolean;
  class?: string;
}
/** The tab's href. */
export let href: $$Props['href'];

/** The tab's title. */
export let title: $$Props['title'];

//* The tab's state */
export let selected: $$Props['selected'] = false;

let className = '';
export { className as class };
</script>

<a
  {href}
  aria-current={selected ? 'page' : false}
  class={cx(
    'flex h-8 self-center hover:bg-ghost-light hover:text-default focus:bg-ghost-light focus:text-default active:bg-ghost-medium',
    {
      'font-semibold': selected,
    },
    className
  )}
>
  {title}
</a>
