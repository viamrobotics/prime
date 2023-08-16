<!--
@component
  
A table header.
```svelte
<Table>
  <THead>
  </THead>
</Table>
```
-->
<svelte:options immutable />

<script lang="ts">
/**
 * Custom table header style
 * @example
 * style="border-collapse"
 */
export let style = '';
</script>

<thead
  {style}
  class="border-b border-black"
>
  <slot />
</thead>

<style>
:host {
  display: contents !important;
}
</style>
