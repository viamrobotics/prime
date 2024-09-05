<script
  lang="ts"
  generics="DataType extends unknown"
>
import {
  createGrid,
  type GridApi,
  type GridOptions,
  type GridParams,
} from 'ag-grid-community';
import { onMount } from 'svelte';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import classNames from 'classnames';

export let options: GridOptions<DataType> = {};
export let params: GridParams = {};

let grid: GridApi<DataType>;
let eGui: HTMLDivElement;

onMount(() => {
  grid = createGrid(eGui, options, params);

  return () => {
    grid.destroy();
  };
});

$: classes = classNames(
  ($$restProps.class as string | undefined) ?? '',
  'ag-theme-quartz'
);
</script>

<div
  bind:this={eGui}
  {...$$restProps}
  class={classes}
/>
