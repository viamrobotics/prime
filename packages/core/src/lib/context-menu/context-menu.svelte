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

<div
  role="menu"
  class="max-w-xs border border-medium py-1 shadow-sm"
>
  <slot class="filter-none" />
</div>
