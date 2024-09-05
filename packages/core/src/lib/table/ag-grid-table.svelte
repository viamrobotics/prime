<script
  lang="ts"
  generics="DataType extends unknown"
>
import {
  createGrid,
  type GridApi,
  type GridOptions,
  type GridParams,
  type Module,
} from 'ag-grid-community';
import { onMount } from 'svelte';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import classNames from 'classnames';

type Options = GridOptions<DataType>;

export let options: Options = {};
export let modules: Module[] = [];

let grid: GridApi<DataType>;
let eGui: HTMLDivElement;

onMount(() => {
  const gridParams: GridParams = {
    modules,
  };

  grid = createGrid(eGui, options, gridParams);

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
