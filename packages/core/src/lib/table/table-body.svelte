<!--
@component
  
A table body.
```svelte
<Table>
  <TableBody></TableBody>
</Table>
```
-->
<svelte:options immutable />

<script lang="ts">
/**
 * Custom table body style
 * ```
 * <TableBody style="text-align:center">
 * ```
 */
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
