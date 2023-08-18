<svelte:options immutable />

<script lang="ts">
export let style = '';
</script>

<th
  {style}
  class="p-2 text-default font-normal overflow-hidden"
>
  <slot />
</th>

<style>
:host {
  display: contents !important;
}
</style>
