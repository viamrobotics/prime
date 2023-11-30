<!--
@component

A simple list menu with items, usually appears on click.
```svelte
<ContextMenu>
  <ContextMenuItem icon="plus" variant="danger" label="click me!" />
  <ContextMenuSeparator />
</ContextMenu>
```
-->
<svelte:options immutable />

<script lang="ts">
import cx from 'classnames';

/** ID attribute of the menu element. */
export let id: string;

/** Accessible label of the menu. */
export let label: string | undefined = undefined;

/** ID of the element ID that labels the menu. */
export let labelledBy: string | undefined = undefined;

/** Additional CSS classes to pass to the menu. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };
</script>

<div
  {id}
  aria-label={label}
  aria-labelledby={labelledBy}
  role="menu"
  class={cx(
    'border border-medium bg-white py-1 shadow-sm filter-none',
    extraClasses
  )}
>
  <slot />
</div>
