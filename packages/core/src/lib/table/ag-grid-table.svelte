<svelte:options immutable />

<script
  lang="ts"
  context="module"
>
import { ModuleRegistry, type RowClassRules } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import type { TableRowVariant } from './table-row-variant';

ModuleRegistry.registerModules([ClientSideRowModelModule]);
</script>

<script
  lang="ts"
  generics="DataType extends ({[key: string]: unknown, variant?: TableRowVariant})"
>
import {
  createGrid,
  type ColDef,
  type ColGroupDef,
  type GridApi,
  type GridOptions,
  type GridParams,
} from '@ag-grid-community/core';
import { onMount } from 'svelte';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-quartz.css';
import cx from 'classnames';

/** Defines the columns to render. */
export let columnDefs: (ColDef<DataType> | ColGroupDef<DataType>)[];

/** Defines the rows to be rendered. */
export let rowData: DataType[];

export let options: Omit<GridOptions<DataType>, 'columnDefs' | 'rowData'> = {};
export let params: GridParams = {};

/**
 * A CSS rule to set the height for the table.
 * @default "500px"
 */
export let height = '500px';

/** Additional CSS classes to pass to the table. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };

let grid: GridApi<DataType>;
let eGui: HTMLDivElement;

$: rowClassRules = {
  '!border-red-100 !bg-red-50 !text-red-500': ({ data }) =>
    data?.variant === 'error',
  '!border-green-100 !bg-green-50 !text-green-700': ({ data }) =>
    data?.variant === 'success',
  '!bg-gray-50 !text-gray-500': ({ data }) => data?.variant === 'disabled',
  ...options.rowClassRules,
} as RowClassRules<DataType>;

$: grid?.updateGridOptions({ columnDefs });
$: grid?.updateGridOptions({ rowData });
$: grid?.updateGridOptions({
  ...options,
  rowClassRules,
});

onMount(() => {
  grid = createGrid(
    eGui,
    { ...options, columnDefs, rowData, rowClassRules },
    params
  );
  return () => grid.destroy();
});

$: classes = cx('ag-theme-quartz rounded-none', extraClasses);
</script>

<div
  bind:this={eGui}
  style="height: {height};"
  class={classes}
  {...$$restProps}
/>

<style>
.ag-theme-quartz {
  --ag-borders: none;
  --ag-border-color: theme(borderColor.light);
  --ag-font-family: theme(fontFamily.public-sans);
  --ag-header-foreground-color: #7a7c80;
  --ag-header-background-color: theme(backgroundColor.light);
  --ag-header-cell-hover-background-color: theme(backgroundColor.ghost-light);
  --ag-header-cell-moving-background-color: theme(backgroundColor.ghost-light);
  --ag-wrapper-border-radius: 0;
}
</style>
