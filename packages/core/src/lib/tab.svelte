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
import { CONTEXT_KEY } from './tabs-bar.svelte';
import { getContext } from 'svelte';
import type { Writable } from 'svelte/store';

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

const variant = getContext<Writable<'primary' | 'secondary'>>(CONTEXT_KEY);

let className = '';
export { className as class };
</script>

<a
  {href}
  aria-current={selected ? 'page' : false}
  class={cx(
    'flex h-8 px-4 text-sm leading-8 text-default hover:bg-ghost-light hover:text-default focus:bg-ghost-light focus:text-default active:bg-ghost-medium',
    {
      'font-semibold': selected,
      uppercase: $variant === 'primary',
      'border-b border-gray-3 first-letter:capitalize':
        $variant === 'secondary',
      'border-b-black': selected && $variant === 'secondary',
    },
    className
  )}
>
  {title}
</a>
