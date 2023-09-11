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

/** Additional CSS classes to pass to the menu. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };
</script>

<div
  role="menu"
  class={cx(
    'border-medium max-w-xs border py-1 shadow-sm filter-none',
    extraClasses
  )}
>
  <slot />
</div>
