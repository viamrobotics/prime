<svelte:options immutable />

<script lang="ts">
export let style = '';
</script>

<td
  {style}
  part="table-cell"
  class="p-2 overflow-hidden"
>
  <slot />
</td>

<style>
:host {
  display: contents !important;
}
</style>
