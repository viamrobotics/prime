<svelte:options immutable />

<script lang="ts">
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
