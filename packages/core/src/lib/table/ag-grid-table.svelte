<script
  lang="ts"
  generics="DataType extends unknown"
>
import {
  createGrid,
  type ColDef,
  type ColGroupDef,
  type GridApi,
  type GridOptions,
  type GridParams,
} from 'ag-grid-community';
import { onMount } from 'svelte';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
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

$: grid?.updateGridOptions({ columnDefs });
$: grid?.updateGridOptions({ rowData });
$: grid?.updateGridOptions({ ...options });

onMount(() => {
  grid = createGrid(eGui, { ...options, columnDefs, rowData }, params);
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
  /* disable all borders */
  --ag-borders: none;
  --ag-border-color: theme(borderColor.light);
  --ag-font-family: theme(fontFamily.public-sans);
  --ag-header-height: 30px;
  --ag-header-foreground-color: theme(textColor.default);
  --ag-header-background-color: transparent;
  --ag-header-cell-hover-background-color: theme(backgroundColor.light);
  --ag-header-cell-moving-background-color: theme(backgroundColor.light);
}
</style>
