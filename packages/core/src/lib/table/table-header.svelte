<!--
@component
  
A table header.
```svelte
<Table>
  <TableHeader>
  </TableHeader>
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

<thead
  class={cx('border-b border-black', extraClasses)}
  {...$$restProps}
>
  <slot />
</thead>

<style>
:host {
  display: contents !important;
}
</style>
