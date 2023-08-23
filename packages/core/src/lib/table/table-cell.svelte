<!--
@component
  
A table body.
```svelte
<Table>
  <TableBody>
    <TableCell></TableCell>
  </TableBody>
</Table>
```
-->
<svelte:options immutable />

<script lang="ts">
import cx from 'classnames';

/** Additional CSS classes to pass to the button. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };
</script>

<td
  part="table-cell"
  class={cx('overflow-hidden p-2', extraClasses)}
  {...$$restProps}
>
  <slot />
</td>

<style>
:host {
  display: contents !important;
}
</style>
