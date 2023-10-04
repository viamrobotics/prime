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

export let id: string;

/** Additional CSS classes to pass to the menu. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };
</script>

<div
  {id}
  role="menu"
  class={cx(
    'border border-medium bg-white py-1 shadow-sm filter-none',
    extraClasses
  )}
>
  <slot />
</div>
