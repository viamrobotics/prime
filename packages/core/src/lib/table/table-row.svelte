<!--
@component
  
A table row.
```svelte
<Table>
  <TableBody>
    <TableRow></TableRow>
  </TableBody>
</Table>
```
-->
<svelte:options immutable />

<script
  lang="ts"
  context="module"
>
export type TableRowVariant = 'success' | 'disabled' | 'error' | '';
</script>

<script lang="ts">
import cx from 'classnames';

/** The communicated type of the table row. */
export let variant: TableRowVariant = '';

/** Additional CSS classes to pass to the button. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };
</script>

<tr
  class={cx(
    'border-b',
    {
      'border-red-100 bg-red-50 text-red-500': variant === 'error',
      'border-green-100 bg-green-50 text-green-700': variant === 'success',
      'bg-gray-50 text-gray-500': variant === 'disabled',
    },
    extraClasses
  )}
  {...$$restProps}
>
  <slot />
</tr>
