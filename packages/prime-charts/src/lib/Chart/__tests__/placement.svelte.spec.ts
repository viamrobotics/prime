import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

import '../../../../test/tailwind.css';
import PlacementLegendInPlot from './PlacementLegendInPlot.svelte';
import PlacementNoPlot from './PlacementNoPlot.svelte';
import PlacementPart from './PlacementPart.svelte';
import PlacementSwap from './PlacementSwap.svelte';
import PlacementTwoPlots from './PlacementTwoPlots.svelte';
import TableInPlot from './TableInPlot.svelte';

const insideParts = ['Line', 'XAxis', 'YAxis', 'Grid', 'Tooltip'];
const standaloneParts = ['Line', 'XAxis', 'YAxis', 'Tooltip'];

const thrownMessage = (run: () => unknown) => {
	try {
		run();
	} catch (error) {
		return (error instanceof Error ? error.message : String(error)).split('\n')[0];
	}
	return 'did not throw';
};

const plotSvg = (container: Element) => container.querySelector('[data-part="plot"] svg');

describe('Chart placement', () => {
	it('throws for a Chart.Line outside Chart.Plot', () => {
		expect(thrownMessage(() => render(PlacementNoPlot))).toBe(
			'Chart.Line must be placed inside Chart.Plot.'
		);
	});

	it('throws for two Chart.Plots in one Chart', () => {
		expect(thrownMessage(() => render(PlacementTwoPlots))).toBe('A Chart takes one Chart.Plot.');
	});

	it.each(insideParts)('throws for a Chart.%s inside Chart but outside Chart.Plot', (part) => {
		expect(thrownMessage(() => render(PlacementPart, { props: { part } }))).toBe(
			`Chart.${part} must be placed inside Chart.Plot.`
		);
	});

	it.each(standaloneParts)('throws for a Chart.%s with no Chart', (part) => {
		expect(thrownMessage(() => render(PlacementPart, { props: { part, isInChart: false } }))).toBe(
			`Chart.${part} must be placed inside Chart.Plot.`
		);
	});

	it('throws for a Chart.Legend inside Chart.Plot', () => {
		expect(thrownMessage(() => render(PlacementLegendInPlot))).toBe(
			'Chart.Legend must be placed outside Chart.Plot.'
		);
	});

	it('throws for a Chart.Table inside Chart.Plot', () => {
		expect(thrownMessage(() => render(TableInPlot))).toBe(
			'Chart.Table must be placed outside Chart.Plot.'
		);
	});

	it('draws the plot after a keyed swap', async () => {
		const { container, rerender } = render(PlacementSwap, { props: { mode: 'key', key: 0 } });
		await expect.poll(() => plotSvg(container)).not.toBeNull();
		const before = container.querySelector('[data-part="plot"]');
		await rerender({ mode: 'key', key: 1 });
		await expect
			.poll(() => {
				const current = container.querySelector('[data-part="plot"]');
				return current !== null && current !== before && plotSvg(container) !== null;
			})
			.toBe(true);
	});

	it('draws the plot after an if/else swap', async () => {
		const { container, rerender } = render(PlacementSwap, { props: { mode: 'if', isFirst: true } });
		await expect.poll(() => plotSvg(container)).not.toBeNull();
		const before = container.querySelector('[data-part="plot"]');
		await rerender({ mode: 'if', isFirst: false });
		await expect
			.poll(() => {
				const current = container.querySelector('[data-part="plot"]');
				return current !== null && current !== before && plotSvg(container) !== null;
			})
			.toBe(true);
	});
});
