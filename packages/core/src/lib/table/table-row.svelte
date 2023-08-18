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

export let variant: TableRowVariant = '';

/**
 * Custom table row style
 * ```
 * <TableRow style="text-align:center">
 * ```
 */
export let style = '';
</script>

<tr
  {style}
  class={cx('border-b', {
    'border-red-100 bg-red-50 text-red-500': variant === 'error',
    'border-green-100 bg-green-50 text-green-700': variant === 'success',
    'bg-gray-50 text-gray-500': variant === 'disabled',
  })}
>
  <slot />
</tr>
