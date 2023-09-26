<svelte:options immutable />

<script lang="ts">
import cx from 'classnames';

export let variant = '';
export let cols = '';
export let style = '';

const colSizes = cols.split(',').map((col) => col.trim());
</script>

<table
  {style}
  class={cx('w-full bg-white text-xs', { 'table-fixed': variant === 'fixed' })}
>
  <colgroup>
    {#each colSizes as col}
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
