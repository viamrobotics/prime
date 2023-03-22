<svelte:options immutable tag="v-table" />

<script lang="ts">
import cx from 'classnames';
import { addStyles } from '../../lib/index';

export let variant = '';
export let cols = '';
export let style = '';

addStyles();

const colSizes = cols.split(',').map((col) => col.trim());
</script>

<style>
:host {
  display: contents !important;
}
</style>

<table
  {style}
  class={cx('bg-white text-xs w-full', { 'table-fixed': variant === 'fixed' })}
>
  <colgroup>
    {#each colSizes as col}
      <col style="width: {col};" />
    {/each}
  </colgroup>
  <slot />
</table>
