<!--
@component
  
A table header cell.
```svelte
<Table>
  <TableHeader>
    <TableHeaderCell></TableHeaderCell>
  </TableHeader>
</Table>
```
-->
<svelte:options immutable />

<script lang="ts">
/**
 * Custom table header cell style
 * @example
 * style="border-collapse"
 */
export let style = '';
</script>

<th
  {style}
  class="overflow-hidden p-2 font-normal text-default"
>
  <slot />
</th>

<style>
:host {
  display: contents !important;
}
</style>
