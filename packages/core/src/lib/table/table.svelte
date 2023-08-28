<!--
@component
  
A table.
```svelte
<Table variant='fixed' cols=["30%", "30%", "40%"]>
  ...
</Table>
```
-->
<svelte:options immutable />

<script
  lang="ts"
  context="module"
>
export type TableVariant = 'auto' | 'fixed';
</script>

<script lang="ts">
import cx from 'classnames';

/** Column width layout variant (optional) */
export let variant: TableVariant = 'auto';

/**
 * Column width sizes
 * ```
 * <Table cols={["10%", "30%", "60%"]}>
 * ```
 */
export let cols: string[] = [];

/** Additional CSS classes to pass to the button. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };
</script>

<table
  class={cx(
    'w-full bg-white text-xs',
    {
      'table-fixed': variant === 'fixed',
      'table-auto': variant === 'auto',
    },
    extraClasses
  )}
  {...$$restProps}
>
  <colgroup>
    {#each cols as col}
      <col style="width: {col};" />
    {/each}
  </colgroup>
  <slot />
</table>

<style>
:host {
  display: contents !important;
}
</style>
