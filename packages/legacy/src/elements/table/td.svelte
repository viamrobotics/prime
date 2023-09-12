<svelte:options immutable />

<script lang="ts">
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
