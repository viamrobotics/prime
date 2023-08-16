<svelte:options immutable />

<script lang="ts">
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
