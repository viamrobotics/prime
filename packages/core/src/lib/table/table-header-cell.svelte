<!--
@component
  
A table header cell.
```svelte
<Table>
  <TableHeader>
    <TableHeaderCell></TableHeaderCell>
  </TableHeader>
</Table>
```
-->
<svelte:options immutable />

<script lang="ts">
import cx from 'classnames';

/** Additional CSS classes to pass to the th. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };
</script>

<th
  class={cx('overflow-hidden p-2 font-normal text-default', extraClasses)}
  {...$$restProps}
>
  <slot />
</th>

<style>
:host {
  display: contents !important;
}
</style>
