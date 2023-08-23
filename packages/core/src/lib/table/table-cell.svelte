<!--
@component
  
A table body.
```svelte
<Table>
  <TableBody>
    <TableCell></TableCell>
  </TableBody>
</Table>
```
-->
<svelte:options immutable />

<script lang="ts">
/**
 * Custom table cell style
 * ```
 * <TableCell style="text-align:center">
 * ```
 */
export let style = '';
</script>

<td
  {style}
  part="table-cell"
  class="overflow-hidden p-2"
>
  <slot />
</td>

<style>
:host {
  display: contents !important;
}
</style>
