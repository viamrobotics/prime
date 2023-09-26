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
import cx from 'classnames';

/** Additional CSS classes to pass to the tbody. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };
</script>

<tbody
  class={cx(extraClasses)}
  {...$$restProps}
>
  <slot />
</tbody>

<style>
:host {
  display: contents !important;
}
</style>
