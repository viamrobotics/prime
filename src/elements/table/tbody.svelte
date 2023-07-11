<svelte:options immutable />

<script lang="ts">
export let style = '';
</script>

<tbody {style}>
  <slot />
</tbody>

<style>
:host {
  display: contents !important;
}
</style>
