<!--
@component
The visible series as a `<table>`, with a Time column and one column per series, labeled like the legend. Rows merge the series on x inside the x window, and a series with no value at a row's x leaves an empty cell. Place it inside `Chart`, outside [`Chart.Plot`](./Plot.svelte).
-->
<script lang="ts">
	import type { ClassValue } from 'svelte/elements';
	import { assertOutsidePlot, useChart } from './context.svelte.ts';
	import { defaultTimeFormat, defaultValueFormat, seriesLabel } from './formats.ts';
	import { mergeSeriesRows } from './table.ts';

	interface Props {
		/** Names the table as its `<caption>`. Empty or left out, it falls back to the chart's `aria-label`, else the chart's `aria-labelledby` names the table and no caption renders. */
		caption?: string;
		/** Lands on a wrapper around the `<table>`. Pass `sr-only` to keep the table for screen readers only. */
		class?: ClassValue;
	}

	let { caption, class: className }: Props = $props();

	assertOutsidePlot('Chart.Table');
	const chart = useChart();

	const name = $derived(caption || chart.settings.accessibleName['aria-label']);
	const labelledBy = $derived(name ? undefined : chart.settings.accessibleName['aria-labelledby']);
	const rows = $derived(mergeSeriesRows(chart.visibleSeries, chart.xWindow));
	const formatTime = $derived(chart.axisFormats.x ?? defaultTimeFormat);
	const formatValue = $derived(chart.axisFormats.y ?? defaultValueFormat);
</script>

{#snippet columnHeader(label: string)}
	<th scope="col" class="px-2 py-1 text-left text-xs font-medium text-default">{label}</th>
{/snippet}

<!-- A table treats width and height as minimums, so `sr-only` on the table itself keeps its full box. The wrapper clips it. -->
<div class={className}>
	<table data-part="table" aria-labelledby={labelledBy}>
		{#if name}<caption class="text-xs text-default">{name}</caption>{/if}
		<thead>
			<tr>
				{@render columnHeader('Time')}
				{#each chart.visibleSeries as series (series)}
					{@render columnHeader(seriesLabel(series))}
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each rows as row (row.time)}
				<tr class="border-t border-light">
					<th scope="row" class="px-2 py-1 text-left text-xs font-normal text-subtle-2"
						>{formatTime(new Date(row.time))}</th
					>
					{#each row.values as value, index (index)}
						<td class="px-2 py-1 text-xs text-default"
							>{value === undefined ? '' : formatValue(value)}</td
						>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
