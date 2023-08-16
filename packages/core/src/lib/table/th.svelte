<!--
@component
  
A table header cell.
```svelte
<Table>
  <THead>
    <TH></TH>
  </THead>
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
